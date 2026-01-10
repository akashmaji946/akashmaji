import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { connect } from "https://deno.land/x/redis@v0.32.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { command } = await req.json();
    
    if (!command || typeof command !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid command' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the command - split by spaces but respect quotes
    const parts = command.trim().split(/\s+/);
    const cmd = parts[0]?.toUpperCase();
    const args = parts.slice(1);

    // Allowed commands for security
    const allowedCommands = [
      'PING', 'INFO', 'GET', 'SET', 'DEL', 'EXISTS', 'KEYS', 'TTL', 'EXPIRE',
      'INCR', 'DECR', 'LPUSH', 'RPUSH', 'LPOP', 'RPOP', 'LRANGE', 'LLEN',
      'SADD', 'SREM', 'SMEMBERS', 'SISMEMBER', 'SCARD',
      'HGET', 'HSET', 'HDEL', 'HGETALL', 'HKEYS', 'HVALS',
      'ZADD', 'ZRANGE', 'ZRANK', 'ZSCORE', 'ZCARD',
      'DBSIZE', 'ECHO', 'TIME', 'TYPE', 'STRLEN', 'APPEND',
      'MGET', 'MSET', 'GETEX', 'SCAN', 'SSCAN', 'HSCAN', 'ZSCAN'
    ];

    if (!allowedCommands.includes(cmd)) {
      return new Response(
        JSON.stringify({ 
          output: `(error) ERR unknown command '${cmd}', with args beginning with: ${args.join(' ')}`,
          error: true 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Connect to Redis server
    const redis = await connect({
      hostname: "go.akashmaji.me",
      port: 7379,
    });

    let result: unknown;

    try {
      // Execute the command
      switch (cmd) {
        case 'PING':
          result = await redis.ping(args[0]);
          break;
        case 'INFO':
          result = await redis.info(args[0]);
          break;
        case 'GET':
          result = await redis.get(args[0]);
          break;
        case 'SET':
          result = await redis.set(args[0], args[1]);
          break;
        case 'DEL':
          result = await redis.del(...args);
          break;
        case 'EXISTS':
          result = await redis.exists(...args);
          break;
        case 'KEYS':
          result = await redis.keys(args[0] || '*');
          break;
        case 'TTL':
          result = await redis.ttl(args[0]);
          break;
        case 'EXPIRE':
          result = await redis.expire(args[0], parseInt(args[1]));
          break;
        case 'INCR':
          result = await redis.incr(args[0]);
          break;
        case 'DECR':
          result = await redis.decr(args[0]);
          break;
        case 'LPUSH':
          result = await redis.lpush(args[0], ...args.slice(1));
          break;
        case 'RPUSH':
          result = await redis.rpush(args[0], ...args.slice(1));
          break;
        case 'LPOP':
          result = await redis.lpop(args[0]);
          break;
        case 'RPOP':
          result = await redis.rpop(args[0]);
          break;
        case 'LRANGE':
          result = await redis.lrange(args[0], parseInt(args[1]), parseInt(args[2]));
          break;
        case 'LLEN':
          result = await redis.llen(args[0]);
          break;
        case 'SADD':
          result = await redis.sadd(args[0], ...args.slice(1));
          break;
        case 'SREM':
          result = await redis.srem(args[0], ...args.slice(1));
          break;
        case 'SMEMBERS':
          result = await redis.smembers(args[0]);
          break;
        case 'SISMEMBER':
          result = await redis.sismember(args[0], args[1]);
          break;
        case 'SCARD':
          result = await redis.scard(args[0]);
          break;
        case 'HGET':
          result = await redis.hget(args[0], args[1]);
          break;
        case 'HSET':
          result = await redis.hset(args[0], args[1], args[2]);
          break;
        case 'HDEL':
          result = await redis.hdel(args[0], ...args.slice(1));
          break;
        case 'HGETALL':
          result = await redis.hgetall(args[0]);
          break;
        case 'HKEYS':
          result = await redis.hkeys(args[0]);
          break;
        case 'HVALS':
          result = await redis.hvals(args[0]);
          break;
        case 'ZADD':
          result = await redis.zadd(args[0], parseFloat(args[1]), args[2]);
          break;
        case 'ZRANGE':
          result = await redis.zrange(args[0], parseInt(args[1]), parseInt(args[2]));
          break;
        case 'ZRANK':
          result = await redis.zrank(args[0], args[1]);
          break;
        case 'ZSCORE':
          result = await redis.zscore(args[0], args[1]);
          break;
        case 'ZCARD':
          result = await redis.zcard(args[0]);
          break;
        case 'DBSIZE':
          result = await redis.dbsize();
          break;
        case 'ECHO':
          result = await redis.echo(args[0]);
          break;
        case 'TYPE':
          result = await redis.type(args[0]);
          break;
        case 'STRLEN':
          result = await redis.strlen(args[0]);
          break;
        case 'APPEND':
          result = await redis.append(args[0], args[1]);
          break;
        case 'MGET':
          result = await redis.mget(...args);
          break;
        case 'MSET':
          // MSET expects key-value pairs as an array
          result = await redis.sendCommand("MSET", args);
          break;
        default:
          result = `(error) Command not implemented`;
      }

      await redis.close();

      // Format the output
      let output: string;
      if (result === null || result === undefined) {
        output = "(nil)";
      } else if (Array.isArray(result)) {
        if (result.length === 0) {
          output = "(empty array)";
        } else {
          output = result.map((item, i) => `${i + 1}) "${item}"`).join("\n");
        }
      } else if (typeof result === 'object') {
        output = JSON.stringify(result, null, 2);
      } else {
        output = String(result);
      }

      return new Response(
        JSON.stringify({ output }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (cmdError) {
      await redis.close();
      throw cmdError;
    }
  } catch (error: unknown) {
    console.error('Redis error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        output: `(error) ${errorMessage}`,
        error: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
