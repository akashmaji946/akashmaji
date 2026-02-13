import { useRef, useCallback, useEffect, useState } from 'react';
import { tokenizeLine, TOKEN_COLORS } from '@/lib/goMixHighlighter';

interface GoMixEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun?: () => void;
  placeholder?: string;
  className?: string;
}

export default function GoMixEditor({ value, onChange, onRun, placeholder, className }: GoMixEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1);

  const syncScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  useEffect(() => {
    setLineCount(value.split('\n').length);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun?.();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newVal = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newVal);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  };

  const renderHighlighted = () => {
    const lines = value.split('\n');
    return lines.map((line, i) => (
      <div key={i} className="leading-relaxed" style={{ minHeight: '1.625em' }}>
        {line === '' ? '\n' : tokenizeLine(line).map((token, j) => (
          <span key={j} style={{ color: TOKEN_COLORS[token.type] || '#D4D4D4' }}>
            {token.text}
          </span>
        ))}
      </div>
    ));
  };

  return (
    <div ref={containerRef} className={`relative flex flex-1 overflow-hidden ${className || ''}`}>
      {/* Line numbers */}
      <div className="flex-shrink-0 bg-[#1e1e1e] text-[#858585] font-mono text-sm select-none border-r border-[#333] overflow-hidden">
        <div className="px-3 pt-4 pb-4">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="leading-relaxed text-right" style={{ minHeight: '1.625em' }}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Highlight layer */}
      <div
        ref={highlightRef}
        className="absolute inset-0 font-mono text-sm p-4 pointer-events-none overflow-hidden whitespace-pre"
        style={{ left: `${Math.max(lineCount.toString().length * 10 + 24, 44)}px` }}
        aria-hidden="true"
      >
        {renderHighlighted()}
      </div>

      {/* Textarea (transparent text, visible caret) */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="flex-1 resize-none bg-transparent font-mono text-sm p-4 focus:outline-none leading-relaxed whitespace-pre overflow-auto"
        style={{ color: 'transparent', caretColor: '#d4d4d4' }}
        placeholder={placeholder}
      />
    </div>
  );
}
