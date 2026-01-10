import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
  isError?: boolean;
}

export default function TerminalSection() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Connected to Redis server at go.akashmaji.me:7379' },
    { type: 'output', content: 'Type "help" for available commands' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = async (command: string) => {
    const trimmedCommand = command.trim();
    
    if (!trimmedCommand) return;

    // Add to history
    setCommandHistory(prev => [...prev, trimmedCommand]);
    setHistoryIndex(-1);

    // Add input line
    setLines(prev => [...prev, { type: 'input', content: trimmedCommand }]);
    setCurrentInput('');
    setIsLoading(true);

    // Handle local commands
    if (trimmedCommand.toLowerCase() === 'help') {
      setLines(prev => [...prev, { 
        type: 'output', 
        content: `Available commands:
  PING              - Test connection
  INFO [section]    - Get server info
  GET key           - Get value
  SET key value     - Set value
  DEL key [key...]  - Delete keys
  KEYS pattern      - Find keys
  EXISTS key        - Check if key exists
  TTL key           - Get time to live
  EXPIRE key secs   - Set expiration
  INCR/DECR key     - Increment/Decrement
  LPUSH/RPUSH       - List push
  LRANGE key s e    - List range
  SADD/SMEMBERS     - Set operations
  HGET/HSET/HGETALL - Hash operations
  ZADD/ZRANGE       - Sorted set ops
  DBSIZE            - Get DB size
  clear             - Clear terminal
  help              - Show this help`
      }]);
      setIsLoading(false);
      return;
    }

    if (trimmedCommand.toLowerCase() === 'clear') {
      setLines([
        { type: 'output', content: 'Connected to Redis server at go.akashmaji.me:7379' },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('redis-terminal', {
        body: { command: trimmedCommand }
      });

      if (error) throw error;

      setLines(prev => [...prev, { 
        type: 'output', 
        content: data.output,
        isError: data.error
      }]);
    } catch (err) {
      setLines(prev => [...prev, { 
        type: 'output', 
        content: `(error) Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden shadow-2xl border border-border/50"
        >
          {/* Terminal Header */}
          <div className="bg-[#e0e0e0] dark:bg-[#3a3a3a] px-4 py-3 flex items-center">
            {/* Traffic lights */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
            </div>
            {/* Title */}
            <div className="flex-1 text-center">
              <span className="text-sm font-medium text-[#4a4a4a] dark:text-[#d0d0d0]">
                go-redis-server
              </span>
            </div>
            {/* Spacer for symmetry */}
            <div className="w-14" />
          </div>

          {/* Terminal Body */}
          <div 
            ref={terminalRef}
            onClick={focusInput}
            className="bg-[#1e1e1e] dark:bg-[#0d0d0d] p-4 sm:p-6 font-mono text-sm sm:text-base h-80 overflow-y-auto cursor-text"
          >
            {/* Previous lines */}
            {lines.map((line, index) => (
              <div key={index} className="mb-1">
                {line.type === 'input' ? (
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 select-none">go.akashmaji.me:7379&gt;</span>
                    <span className="text-white">{line.content}</span>
                  </div>
                ) : (
                  <pre className={`whitespace-pre-wrap ${line.isError ? 'text-red-400' : 'text-gray-300'}`}>
                    {line.content}
                  </pre>
                )}
              </div>
            ))}

            {/* Current input line */}
            <div className="flex items-center">
              <span className="text-green-400 mr-2 select-none">go.akashmaji.me:7379&gt;</span>
              <span className="text-white">{currentInput}</span>
              {!isLoading && (
                <motion.span
                  className="w-2 h-5 bg-white ml-0.5"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                />
              )}
              {isLoading && (
                <span className="text-yellow-400 ml-2">executing...</span>
              )}
            </div>

            {/* Hidden input for capturing keystrokes */}
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute opacity-0 pointer-events-none"
              autoFocus
              disabled={isLoading}
            />
          </div>
        </motion.div>
        
        <p className="text-center text-xs text-muted-foreground mt-3">
          Click on terminal to type • Use ↑↓ for command history • Type "help" for commands
        </p>
      </div>
    </section>
  );
}
