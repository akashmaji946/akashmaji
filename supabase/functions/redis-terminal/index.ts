import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { connect } from "https://deno.land/x/redis@v0.32.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper to format output like redis-cli
function formatRedisResponse(reply: unknown): string {
  if (reply === null || reply === undefined) {
    return "(nil)";
  }
  
  if (typeof reply === "number") {
    return `(integer) ${reply}`;
  }

  if (Array.isArray(reply)) {
    if (reply.length === 0) {
      return "(empty array)";
    }
    return reply
      .map((item, i) => {
        const prefix = `${i + 1}) `;
        const formatted = typeof item === "string" ? `"${item}"` : formatRedisResponse(item);
        return `${prefix}${formatted}`;
      })
      .join("\n");
  }

  if (typeof reply === "string") {
    // Handle standard "OK" or simple strings
    if (reply === "OK" || reply === "PONG") return reply;
    return `"${reply}"`;
  }

  return String(reply);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { command } = await req.json();
    
    if (!command || typeof command !== 'string') {
      throw new Error("Invalid command");
    }

    // Parse command and args
    // This regex splits by spaces but keeps quoted strings together
    const parts = command.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    const cleanParts = parts.map(p => p.replace(/^["']|["']$/g, ''));
    
    const cmd = cleanParts[0];
    const args = cleanParts.slice(1);

    // Connect to your Go-Redis server via TLS
    const redis = await connect({
      hostname: "go.akashmaji.me",
      port: 7380, // Using the TLS port you configured
      tls: {
        // Deno will verify the Let's Encrypt cert automatically
      }
    });

    try {
      // 1. Authenticate using the password from your redis.conf
      await redis.auth("dsl");

      // 2. Execute the command generically
      // This supports all commands implemented in your Go server
      const result = await redis.sendCommand(cmd, args);

      // 3. Format the output to look like a terminal
      const output = formatRedisResponse(result);

      await redis.close();

      return new Response(
        JSON.stringify({ output }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (execError: any) {
      await redis.close();
      return new Response(
        JSON.stringify({ 
          output: `(error) ${execError.message}`,
          error: true 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({ 
        output: `(error) ${error.message}`,
        error: true 
      }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
