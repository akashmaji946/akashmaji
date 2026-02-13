import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, inputs } = await req.json();

    if (!code || typeof code !== 'string') {
      return new Response(JSON.stringify({ error: 'No code provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Queue of pre-filled stdin values
    const inputQueue: string[] = Array.isArray(inputs) ? [...inputs] : [];
    let inputIndex = 0;

    // Connect to Go-Mix telnet server
    const conn = await Deno.connect({ hostname: "go.akashmaji.me", port: 9090 });
    
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // Read the welcome banner
    const bannerBuf = new Uint8Array(4096);
    let bannerOutput = '';
    
    const bannerTimeout = setTimeout(() => {}, 3000);
    try {
      let readAttempts = 0;
      while (readAttempts < 5) {
        const readable = await Promise.race([
          conn.read(bannerBuf),
          new Promise<null>((resolve) => setTimeout(() => resolve(null), 1000)),
        ]);
        if (readable === null || readable === 0) break;
        bannerOutput += decoder.decode(bannerBuf.subarray(0, readable as number));
        readAttempts++;
        if (bannerOutput.includes('>>>')) break;
      }
    } finally {
      clearTimeout(bannerTimeout);
    }

    // Split code into lines and execute each
    const lines = code.split('\n').filter(l => l.trim().length > 0);
    let output = '';

    for (const line of lines) {
      // Send the line
      await conn.write(encoder.encode(line + '\n'));
      
      // Read response
      const buf = new Uint8Array(4096);
      let lineOutput = '';
      let readAttempts = 0;
      
      while (readAttempts < 5) {
        const n = await Promise.race([
          conn.read(buf),
          new Promise<null>((resolve) => setTimeout(() => resolve(null), 2000)),
        ]);
        if (n === null || n === 0) break;
        const chunk = decoder.decode(buf.subarray(0, n as number));
        lineOutput += chunk;
        readAttempts++;

        // Check if server is waiting for input (prompt without >>>)
        // If it looks like it's waiting for input and we have values queued, send one
        if (!chunk.includes('>>>') && inputIndex < inputQueue.length) {
          // Send the next input value
          await conn.write(encoder.encode(inputQueue[inputIndex] + '\n'));
          inputIndex++;
          // Continue reading response after sending input
          continue;
        }

        if (chunk.includes('>>>')) break;
      }

      // Clean up the output - remove the prompt markers
      const cleanedLines = lineOutput.split('\n')
        .filter(l => !l.includes('Go-Mix >>>') || l.includes(line))
        .map(l => l.replace(/Go-Mix >>>\s*/, '').trim())
        .filter(l => l.length > 0 && l !== line);
      
      output += cleanedLines.join('\n') + '\n';
    }

    // Send exit command
    try {
      await conn.write(encoder.encode('/exit\n'));
    } catch { /* ignore */ }
    
    try { conn.close(); } catch { /* ignore */ }

    return new Response(JSON.stringify({ output: output.trim() }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Go-Mix execution error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: `Execution failed: ${errorMessage}` }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
