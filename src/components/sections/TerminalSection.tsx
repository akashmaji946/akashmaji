import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Copy, ExternalLink, Check } from 'lucide-react';
import { toast } from 'sonner';

interface TypewriterLine {
  type: 'comment' | 'command' | 'prompt' | 'response' | 'link';
  content: string;
  prompt?: string;
}

export default function TerminalSection() {
  const [copied, setCopied] = useState(false);
  
  const staticLines = [
    { type: 'comment' as const, content: '# Try this out within your terminal' },
    { type: 'comment' as const, content: '# First install redis-tools (redis-cli)' },
  ];

  const typewriterLines: TypewriterLine[] = [
    { type: 'comment', content: '# connect to server' },
    { type: 'command', content: 'redis-cli -h go.akashmaji.me -p 7380 --tls' },
    { type: 'comment', content: '# authenticate as root' },
    { type: 'prompt', prompt: 'go.akashmaji.me:7380>', content: 'AUTH root dsl' },
    { type: 'response', content: 'OK' },
    { type: 'comment', content: '# see available commands in go-redis' },
    { type: 'prompt', prompt: 'go.akashmaji.me:7380>', content: 'COMMANDS' },
    { type: 'response', content: '1) "AUTH"' },
    { type: 'response', content: '      ........' },
    { type: 'comment', content: '# see available command usage' },
    { type: 'prompt', prompt: 'go.akashmaji.me:7380>', content: 'COMMANDS SET' },
    { type: 'response', content: '1) "Usage       : SET <key> <value>"' },
    { type: 'response', content: '2) "Description : Set the string value of a key"' },
    { type: 'response', content: '3) "Category    : string"' },
    { type: 'comment', content: '# run commands like redis' },
    { type: 'prompt', prompt: 'go.akashmaji.me:7380>', content: 'SET k v' },
    { type: 'response', content: 'OK' },
    { type: 'prompt', prompt: 'go.akashmaji.me:7380>', content: 'GET k' },
    { type: 'response', content: '"v"' },
    { type: 'comment', content: '# visit this link for more info' },
    { type: 'link', content: '# https://github.com/akashmaji946/go-redis/' },
  ];

  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (visibleLines >= typewriterLines.length) {
      // Reset to start cycling animation
      const timeout = setTimeout(() => {
        setVisibleLines(0);
        setCurrentText('');
        setIsTyping(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    const currentLine = typewriterLines[visibleLines];
    const fullText = currentLine.content;

    if (currentText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
        setCurrentText('');
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentText, visibleLines, typewriterLines]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('redis-cli -h go.akashmaji.me -p 7380 --tls');
    setCopied(true);
    toast.success('Command copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLink = () => {
    window.open('https://github.com/akashmaji946/go-redis/', '_blank');
  };

  const renderLine = (line: TypewriterLine, text: string, showCursor: boolean) => {
    if (line.type === 'comment' || line.type === 'link') {
      return (
        <div className="flex items-start">
          <span className="text-green-400 mr-2 select-none">$</span>
          <span className={line.type === 'link' ? 'text-cyan-400' : 'text-gray-500'}>
            {text}
            {showCursor && <span className="inline-block w-2 h-4 bg-yellow-500 ml-0.5 animate-pulse" />}
          </span>
        </div>
      );
    } else if (line.type === 'command') {
      return (
        <div className="flex items-start">
          <span className="text-green-400 mr-2 select-none">$</span>
          <span className="text-yellow-400">
            {text}
            {showCursor && <span className="inline-block w-2 h-4 bg-yellow-500 ml-0.5 animate-pulse" />}
          </span>
        </div>
      );
    } else if (line.type === 'prompt') {
      return (
        <div className="flex items-start">
          <span className="text-cyan-400 mr-2 select-none">{line.prompt}</span>
          <span className="text-white">
            {text}
            {showCursor && <span className="inline-block w-2 h-4 bg-yellow-500 ml-0.5 animate-pulse" />}
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-start pl-4">
          <span className="text-green-300">
            {text}
            {showCursor && <span className="inline-block w-2 h-4 bg-yellow-500 ml-0.5 animate-pulse" />}
          </span>
        </div>
      );
    }
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
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-sm font-medium text-[#4a4a4a] dark:text-[#d0d0d0]">
                go-redis-server
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                title="Copy connection command"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-[#4a4a4a] dark:text-[#d0d0d0]" />
                )}
              </button>
              <button
                onClick={handleOpenLink}
                className="p-1.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                title="View on GitHub"
              >
                <ExternalLink className="w-4 h-4 text-[#4a4a4a] dark:text-[#d0d0d0]" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="bg-[#1e1e1e] dark:bg-[#0d0d0d] p-4 sm:p-6 font-mono text-sm sm:text-base min-h-[350px]">
            {/* Static lines */}
            {staticLines.map((line, index) => (
              <div key={index} className="mb-1">
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 select-none">$</span>
                  <span className="text-gray-500">{line.content}</span>
                </div>
              </div>
            ))}
            
            {/* Typewriter lines */}
            {typewriterLines.slice(0, visibleLines).map((line, index) => (
              <div key={`typed-${index}`} className="mb-1">
                {renderLine(line, line.content, false)}
              </div>
            ))}
            
            {/* Currently typing line */}
            {visibleLines < typewriterLines.length && (
              <div className="mb-1">
                {renderLine(typewriterLines[visibleLines], currentText, isTyping)}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
