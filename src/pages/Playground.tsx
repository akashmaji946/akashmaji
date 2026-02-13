import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowLeft, Loader2, Trash2, Download, Copy, Check, Plus, X, Terminal } from 'lucide-react';
import GoMixEditor from '@/components/GoMixEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const DEFAULT_CODE = `// Welcome to Go-Mix Playground!
// Write your Go-Mix code here and click Run

var a = 10;
var b = 20;
var c = a + b;
println(c)
`;

export default function Playground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inputs, setInputs] = useState<string[]>([]);
  const [showInputPanel, setShowInputPanel] = useState(false);

  const addInput = () => setInputs(prev => [...prev, '']);
  const removeInput = (index: number) => setInputs(prev => prev.filter((_, i) => i !== index));
  const updateInput = (index: number, value: string) =>
    setInputs(prev => prev.map((v, i) => (i === index ? value : v)));

  const runCode = useCallback(async () => {
    if (!code.trim()) {
      toast.error('Please write some code first');
      return;
    }

    setIsRunning(true);
    setOutput('Running...');

    try {
      const { data, error } = await supabase.functions.invoke('go-mix-execute', {
        body: { code, inputs: inputs.filter(i => i.length > 0) },
      });

      if (error) throw error;

      if (data?.error) {
        setOutput(`Error: ${data.error}`);
      } else {
        setOutput(data?.output || '(no output)');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setOutput(`Error: ${msg}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, inputs]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'main.gm';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/#projects">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="h-5 w-px bg-border" />
            <h1 className="font-mono text-sm font-semibold text-foreground">
              Go-Mix <span className="text-muted-foreground font-normal">Playground</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showInputPanel ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowInputPanel(p => !p)}
              className="gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stdin</span>
              {inputs.length > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                  {inputs.length}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Copy</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button
              size="sm"
              onClick={runCode}
              disabled={isRunning}
              className="gap-1.5 bg-green-600 hover:bg-green-700 text-white"
            >
              {isRunning ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              Run
            </Button>
          </div>
        </div>
      </header>

      {/* Stdin Input Panel */}
      {showInputPanel && (
        <div className="border-b border-border bg-muted/50 px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-muted-foreground">
              Standard Input — values fed to <code className="bg-muted px-1 rounded">input()</code> calls in order
            </span>
            <Button size="sm" variant="ghost" onClick={addInput} className="h-6 gap-1 text-xs">
              <Plus className="w-3 h-3" /> Add
            </Button>
          </div>
          {inputs.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">
              No inputs added. Click "Add" to pre-fill values for input() calls.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {inputs.map((val, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-[10px] text-muted-foreground font-mono w-4">{i + 1}.</span>
                  <Input
                    value={val}
                    onChange={e => updateInput(i, e.target.value)}
                    placeholder={`Input #${i + 1}`}
                    className="h-7 w-40 text-xs font-mono"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeInput(i)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Editor + Output */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-border">
          <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">main.gm</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setCode(''); setOutput(''); }}
              className="h-6 px-2"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
          <GoMixEditor
            value={code}
            onChange={setCode}
            onRun={runCode}
            className="min-h-[300px] md:min-h-0 bg-[#1e1e1e]"
          />
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col md:max-w-[50%]">
          <div className="px-4 py-2 border-b border-border bg-muted/30">
            <span className="text-xs font-mono text-muted-foreground">Output</span>
          </div>
          <pre className="flex-1 bg-[#0d0d0d] text-green-400 font-mono text-sm p-4 overflow-auto min-h-[200px] md:min-h-0 whitespace-pre-wrap">
            {output || '// Output will appear here after running your code\n// Press Ctrl+Enter or click Run'}
          </pre>
        </div>
      </div>

      {/* Footer hint */}
      <div className="border-t border-border bg-card/80 px-4 py-1.5 text-center">
        <span className="text-xs text-muted-foreground">
          Powered by <a href="https://github.com/akashmaji946/go-mix" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Go-Mix</a> — Press <kbd className="px-1 py-0.5 rounded bg-muted text-xs font-mono">Ctrl+Enter</kbd> to run
        </span>
      </div>
    </div>
  );
}
