import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, Terminal as TermIcon, Play, RefreshCw, Cpu,
  ShieldCheck, Zap, HardDrive, GitFork, ArrowLeft,
  ChevronRight, Copy, Check, BookOpen, Download, HelpCircle,
  FileCode, Layers, ShieldAlert, Bug, Github
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

// Simulated SQL queries for the interactive terminal console
const terminalStartupText = `        +---------------------------------- +
        | ██████╗  ██████╗ ██████╗  ██████╗ |
        |██╔════╝ ██╔═══██╗██╔══██╗ ██╔══██╗|
        |██║  ███╗██║   ██║██║   ██║██████╔╝|
        |██║   ██║██║   ██║██║  ██║ ██╔══██╗|
        |╚██████╔╝╚██████╔╝██████╔╝ ██████╔╝|
        | ╚═════╝  ╚═════╝ ╚═════╝  ╚═════╝ |
        +---------------------------------- +

        GoDB v0.0.1 — columnar CPU database engine
        Author: Akash Maji(akashmaji(@iisc.ac.in))
        Type \\help for help.
        Press ENTER to add a new line. End SQL with ';' and press ENTER to run it.
        Connected to Database: build/data/repl.db

[INFO] <debug> godb.conf config:
[INFO] --db_path                 : build/data/repl.db
[INFO] --log_level               : debug
[INFO] --buffer_pool_size        : 1000000
[INFO] --wal_sync_mode           : FULL
[INFO] --log_file                : godb_server.log
[INFO] --max_connections         : 3
[INFO] --echo                    : true
godb >>   `;

export default function GoDBPage() {
  const [activeTab, setActiveTab] = useState<'clone' | 'repl' | 'queries' | 'docker'>('clone');
  const [isCopied, setIsCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2000);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">

      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse duration-[6000ms]" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

      {/* Background Watermark Logo Overlay */}
      <div className="absolute top-28 right-[5%] w-[600px] h-[600px] opacity-[0.08] dark:opacity-[0.14] pointer-events-none -z-10 select-none">
        <img src="/godb-logo-2.PNG" className="w-full h-full object-contain" alt="GoDB Watermark" />
      </div>

      {/* Header */}
      <header className="sticky top-0 left-0 right-0 z-50 glass-strong border-b border-border/40 py-4">
        <nav className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Portfolio</span>
            </a>
            <div className="h-4 w-px bg-border/60" />
            <a href="/godb.html" className="flex items-center gap-2.5 font-bold text-gradient text-xl">
              <Database className="h-5 w-5 text-primary animate-pulse" />
              GoDB
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#architecture" className="text-muted-foreground hover:text-foreground transition-colors">Architecture</a>
            <a href="#get-started" className="text-muted-foreground hover:text-foreground transition-colors">Get Started</a>
            <a href="/godb/documentation.html" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 font-semibold">
              <BookOpen className="h-4 w-4" /> Docs
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <Button asChild variant="outline" size="sm" className="rounded-full gap-1.5 border-border/60 hover:bg-muted/50 text-xs font-semibold px-3.5 h-8">
              <a href="https://github.com/akashmaji946/godb" target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5 text-primary" />
                View Source
              </a>
            </Button>

            <Button asChild variant="outline" size="sm" className="rounded-full gap-1.5 border-border/60 hover:bg-muted/50 text-xs font-semibold px-3.5 h-8">
              <a href="https://github.com/akashmaji946/godb/issues" target="_blank" rel="noopener noreferrer">
                <Bug className="h-3.5 w-3.5 text-rose-500" />
                Bug Report
              </a>
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-2 pb-16 relative">

        {/* Hero Section */}
        <section className="min-h-[calc(100vh-90px)] flex flex-col justify-between pt-0 pb-4 relative gap-4">
          
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-1">
                <Zap className="h-3.5 w-3.5 animate-bounce" /> Column-Oriented Relational Database Engine
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                GoDB <br />
                <span className="text-gradient">Transactional Vectorized DB</span>
              </h1>

              <p className="text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                GoDB is a column-oriented relational database engine written in Go. The project is intentionally ambitious: it implements its own SQL frontend, logical and physical planning, vectorized execution layer, storage engine, B+ Tree indexing, statistics, ARIES recovery, and a TCP/HTTP client/server.
              </p>

              {/* Badges Grid (2 rows of 3 columns) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-md mx-auto lg:mx-0 pt-2 text-[11px] sm:text-xs font-semibold text-muted-foreground/90">
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-card border border-border/50 shadow-sm">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> ARIES Recovery
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-card border border-border/50 shadow-sm">
                  <Cpu className="h-3.5 w-3.5 text-sky-500" /> Vectorized Engine
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-card border border-border/50 shadow-sm">
                  <HardDrive className="h-3.5 w-3.5 text-amber-500" /> B+ Tree Indexing
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-card border border-border/50 shadow-sm">
                  <Zap className="h-3.5 w-3.5 text-indigo-500" /> DP Join Ordering
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-card border border-border/50 shadow-sm">
                  <Layers className="h-3.5 w-3.5 text-pink-500" /> Buffer Pool
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-card border border-border/50 shadow-sm">
                  <ShieldAlert className="h-3.5 w-3.5 text-violet-500" /> Concurrency Lock
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full shadow-lg gap-2 text-md font-semibold px-8 py-5">
                  <a href="#get-started">Get Started</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full gap-2 text-md font-semibold px-8 py-5 border-border/60 hover:bg-muted/50">
                  <a href="https://github.com/akashmaji946/godb" target="_blank" rel="noopener noreferrer">
                    <GitFork className="h-4.5 w-4.5" />
                    View Source
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full lg:max-w-2xl xl:max-w-4xl relative group"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl group-hover:bg-primary/15 transition-colors -z-10" />
              <div className="w-full bg-[#0d1117] rounded-2xl border border-border/50 shadow-2xl overflow-hidden font-mono text-[10px] sm:text-xs">

                {/* Terminal Title Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-border/30">
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-muted-foreground/60 text-[10px] select-none">godb-shell --repl</div>
                  <div className="w-12" />
                </div>

                {/* Terminal Body */}
                <div className="p-6 h-[530px] overflow-hidden select-text font-mono text-[8.5px] sm:text-[9px] md:text-[10px] lg:text-[11px] leading-relaxed text-left flex flex-col justify-start">
                  <div className="text-slate-100/90 whitespace-pre">
                    <div>        +---------------------------------- +</div>
                    <div>        | ██████╗  ██████╗ ██████╗  ██████╗ |</div>
                    <div>        |██╔════╝ ██╔═══██╗██╔══██╗ ██╔══██╗|</div>
                    <div>        |██║  ███╗██║   ██║██║   ██║██████╔╝|</div>
                    <div>        |██║   ██║██║   ██║██║  ██║ ██╔══██╗|</div>
                    <div>        |╚██████╔╝╚██████╔╝██████╔╝ ██████╔╝|</div>
                    <div>        | ╚═════╝  ╚═════╝  ╚═════╝  ╚═════╝ |</div>
                    <div>        +---------------------------------- +</div>
                  </div>
                  
                  <div className="mt-3 text-emerald-400 font-semibold">
                    GoDB v0.0.1 – columnar CPU database engine
                  </div>
                  <div className="text-sky-400 font-semibold">
                    Author: Akash Maji(akashmaji(@iisc.ac.in))
                  </div>
                  <div className="text-violet-400 font-semibold">
                    Type \help for help.
                  </div>
                  <div className="text-cyan-400 font-semibold whitespace-pre-wrap">
                    Press ENTER to add a new line. End SQL with ';' and press ENTER to run it.
                  </div>
                  <div className="text-amber-400 font-semibold">
                    Connected to Database: build/data/repl.db
                  </div>
                  
                  <div className="mt-3 space-y-0.5 font-semibold">
                    <div>
                      <span className="text-emerald-400">[INFO]</span> <span className="text-yellow-500">&lt;debug&gt; godb.conf config:</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">[INFO]</span> <span className="text-emerald-400">--db_path</span><span className="text-slate-300">                 : </span><span className="text-yellow-500">build/data/repl.db</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">[INFO]</span> <span className="text-emerald-400">--log_level</span><span className="text-slate-300">               : </span><span className="text-yellow-500">debug</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">[INFO]</span> <span className="text-emerald-400">--buffer_pool_size</span><span className="text-slate-300">        : </span><span className="text-yellow-500">1000000</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">[INFO]</span> <span className="text-emerald-400">--wal_sync_mode</span><span className="text-slate-300">           : </span><span className="text-yellow-500">FULL</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">[INFO]</span> <span className="text-emerald-400">--log_file</span><span className="text-slate-300">                : </span><span className="text-yellow-500">godb_server.log</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">[INFO]</span> <span className="text-emerald-400">--max_connections</span><span className="text-slate-300">         : </span><span className="text-yellow-500">3</span>
                    </div>
                    <div>
                      <span className="text-emerald-400">[INFO]</span> <span className="text-emerald-400">--echo</span><span className="text-slate-300">                    : </span><span className="text-yellow-500">true</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center font-bold">
                    <span className="text-sky-400">godb &gt;&gt;</span>
                    <span className="ml-1.5 inline-block w-2.5 h-4 bg-slate-100 animate-pulse" />
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Centered Scroll Down indicator at the bottom center */}
          <div className="flex flex-col items-center gap-2 mt-auto">
            <motion.a
              href="#features"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-primary transition-colors text-xs font-semibold cursor-pointer select-none mt-2"
            >
              <span>Scroll Down</span>
              <ChevronRight className="h-4 w-4 rotate-90 text-primary" />
            </motion.a>
          </div>

        </section>

        {/* Core Capabilities */}
        <section id="features" className="py-20 border-t border-border/40 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Key Features</h2>
            <p className="text-muted-foreground text-md">
              A comprehensive relational engine engineered from first principles with modern database architecture techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/40 shadow-sm space-y-4 hover:border-primary/30 hover:bg-card/60 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Vectorized Execution</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Processes rows in cache-friendly column blocks (vectors). Features direct block-level memory copying paths that completely bypass Boxing/Unboxing overhead, accelerating table scans by 3-5×.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/40 shadow-sm space-y-4 hover:border-emerald-500/30 hover:bg-card/60 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">ARIES Crash Recovery</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full Write-Ahead Logging (WAL) and physiological logging. Features Analysis, REDO (repeating history), and UNDO phases to guarantee strict ACID transactions and prevent corruption after system crashes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/40 shadow-sm space-y-4 hover:border-sky-500/30 hover:bg-card/60 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-sky-500/10 text-sky-500 group-hover:scale-110 transition-transform">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Buffer Pool & Pager</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                LRU-managed page frame pool with clean frame recycling (guaranteed dirty flag & memory wipeouts). Extends physical database files on-disk via system-level truncation to prevent out-of-range recovery failures.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/40 shadow-sm space-y-4 hover:border-amber-500/30 hover:bg-card/60 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
                <HardDrive className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">B+ Tree Indexes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Disk-backed B+ tree implementation for primary keys and unique columns. Enables O(log N) constraint verification instead of slow O(N) sequential scans on batch inserts/updates.
              </p>
            </div>

            {/* Feature 4b - Hash Indexes */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/40 shadow-sm space-y-4 hover:border-orange-500/30 hover:bg-card/60 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Hash Indexes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Disk-backed linear hash table indexes optimized specifically for point queries and fast equi-joins. Enables constant-time O(1) lookups for secondary key-value retrieval paths.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/40 shadow-sm space-y-4 hover:border-pink-500/30 hover:bg-card/60 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-pink-500/10 text-pink-500 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Handwritten Lexer & Parser</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A fully handwritten lexical scanner and recursive descent parser that parses SQL text into structured Abstract Syntax Trees (ASTs). Completely avoids parser generators for optimal compiling speed.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/40 shadow-sm space-y-4 hover:border-indigo-500/30 hover:bg-card/60 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Rule-Based Optimizer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Applies rule-based AST query transformations. Optimizes operator execution trees with early predicate pushdowns, limit pushdowns, projection prunings, and subquery decorrelations.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/40 shadow-sm space-y-4 hover:border-sky-500/30 hover:bg-card/60 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-sky-500/10 text-sky-500 group-hover:scale-110 transition-transform">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Dynamic Join Ordering</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Advanced join planner utilizing Dynamic Programming (DP) algorithms to scan join search space and determine the mathematically absolute optimal physical join execution sequence.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="p-6 rounded-2xl bg-card/40 border border-border/40 shadow-sm space-y-4 hover:border-violet-500/30 hover:bg-card/60 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-violet-500/10 text-violet-500 group-hover:scale-110 transition-transform">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Lock Manager Concurrency</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sophisticated multi-granularity lock manager supporting Shared (S), Exclusive (X), and Intent (IS/IX) locks to allow safe and highly concurrent database transactions.
              </p>
            </div>

          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-20 border-t border-border/40 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">System Architecture</h2>
            <p className="text-muted-foreground text-md">
              A bird's-eye view of how a query transitions from SQL text into physical on-disk page modifications.
            </p>
          </div>

          <div className="bg-card border border-border/40 p-6 sm:p-10 rounded-2xl shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-muted-foreground/30 select-none">ARCHITECTURE_FLOW</div>

            {/* Flowchart Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

              {/* Box 1 */}
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/40 border border-border/40 relative">
                <div className="p-2.5 rounded-lg bg-[#24292e] text-slate-100 mb-2 font-mono text-xs">SQL Query</div>
                <h4 className="text-sm font-bold">Parser & Binder</h4>
                <p className="text-xs text-muted-foreground mt-1">Lexes, parses, and binds references to schema columns.</p>
                <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-border h-5 w-5 z-10" />
              </div>

              {/* Box 2 */}
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/40 border border-border/40 relative">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2 font-mono text-xs">Logical Plan</div>
                <h4 className="text-sm font-bold">Query Optimizer</h4>
                <p className="text-xs text-muted-foreground mt-1">Applies DP Join Reordering, Filter & Limit Pushdown.</p>
                <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-border h-5 w-5 z-10" />
              </div>

              {/* Box 3 */}
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/40 border border-border/40 relative">
                <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2 font-mono text-xs">Physical Plan</div>
                <h4 className="text-sm font-bold">Vectorized Execution</h4>
                <p className="text-xs text-muted-foreground mt-1">Evaluates queries as vectorized chunks for cache locality.</p>
                <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-border h-5 w-5 z-10" />
              </div>

              {/* Box 4 */}
              <div className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/40 border border-border/40">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2 font-mono text-xs">On-Disk / Memory</div>
                <h4 className="text-sm font-bold">Buffer Pool & WAL</h4>
                <p className="text-xs text-muted-foreground mt-1">Manages LRU page frame slots and logs writes to WAL disk.</p>
              </div>

            </div>

            {/* In-Depth Explanation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-10 border-t border-border/40">
              <div className="space-y-2">
                <h4 className="text-md font-bold flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" /> The Compilation Phase
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  GoDB compiles SQL queries into AST nodes, which are then passed to the <strong>Binder</strong> to map qualified and unqualified identifiers. The <strong>Logical Planner</strong> produces a relational algebra tree, and the <strong>Optimizer</strong> refines this logical plan using robust heuristics and dynamic programming.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-md font-bold flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-emerald-500" /> The Execution Phase
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The compiled <strong>Physical Plan</strong> executes inside a demand-driven iterator pipeline (Volcano model). Iteration flows in 2048-row <strong>Data Chunks</strong> packed into flat memory slices. Fixed-width non-nullable columns leverage Go's fast native block-copying to deliver highly competitive, near-native query execution times.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Installation & Quick Start */}
        <section id="get-started" className="py-20 border-t border-border/40 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Quick Start Guide</h2>
            <p className="text-muted-foreground text-md">
              Download, compile, and query your database engine locally in less than 3 minutes.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">

            {/* Tabs Selector */}
            <div className="flex border-b border-border/40 mb-6">
              <button
                onClick={() => setActiveTab('clone')}
                className={`px-5 py-2.5 text-sm font-semibold transition-all relative ${activeTab === 'clone' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {activeTab === 'clone' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
                1. Clone & Build
              </button>
              <button
                onClick={() => setActiveTab('repl')}
                className={`px-5 py-2.5 text-sm font-semibold transition-all relative ${activeTab === 'repl' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {activeTab === 'repl' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
                2. Run the REPL
              </button>
              <button
                onClick={() => setActiveTab('queries')}
                className={`px-5 py-2.5 text-sm font-semibold transition-all relative ${activeTab === 'queries' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {activeTab === 'queries' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
                3. Perform SQL Queries
              </button>
              <button
                onClick={() => setActiveTab('docker')}
                className={`px-5 py-2.5 text-sm font-semibold transition-all relative ${activeTab === 'docker' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {activeTab === 'docker' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
                4. Run with Docker
              </button>
            </div>

            {/* Tab Contents */}
            <AnimatePresence mode="wait">
              {activeTab === 'clone' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-card border border-border/40 p-6 rounded-2xl space-y-4"
                >
                  <p className="text-sm text-muted-foreground">
                    Compile the REPL binary locally. GoDB compiles down into a single, light binary with zero external binary dependencies.
                  </p>

                  <div className="bg-[#0d1117] rounded-xl border border-border/50 p-4 font-mono text-sm text-slate-300 relative group">
                    <button
                      onClick={() => handleCopy("git clone https://github.com/akashmaji946/godb.git\ncd godb\ngo build -o godb ./cmd/repl", "clone")}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-card/60 hover:bg-card border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {isCopied === 'clone' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                      <span className="text-slate-500 font-semibold"># Clone the repository</span>{"\n"}
                      <span className="text-emerald-400 font-semibold">git</span> <span className="text-cyan-400">clone</span> https://github.com/akashmaji946/godb.git{"\n\n"}
                      <span className="text-slate-500 font-semibold"># Enter project directory</span>{"\n"}
                      <span className="text-emerald-400 font-semibold">cd</span> godb{"\n\n"}
                      <span className="text-slate-500 font-semibold"># Build the REPL executable</span>{"\n"}
                      <span className="text-emerald-400 font-semibold">go</span> build <span className="text-violet-400">-o</span> godb ./cmd/repl
                    </pre>
                  </div>
                </motion.div>
              )}

              {activeTab === 'repl' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-card border border-border/40 p-6 rounded-2xl space-y-4"
                >
                  <p className="text-sm text-muted-foreground">
                    Launch the compiled interactive database command line shell (REPL). It will automatically initialize the primary database file.
                  </p>

                  <div className="bg-[#0d1117] rounded-xl border border-border/50 p-4 font-mono text-sm text-slate-300 relative group">
                    <button
                      onClick={() => handleCopy("./godb", "run")}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-card/60 hover:bg-card border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {isCopied === 'run' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                      <span className="text-slate-500 font-semibold"># Launch interactive console</span>{"\n"}
                      <span className="text-emerald-400 font-semibold">./godb</span>
                    </pre>
                  </div>
                </motion.div>
              )}

              {activeTab === 'queries' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-card border border-border/40 p-6 rounded-2xl space-y-4"
                >
                  <p className="text-sm text-muted-foreground">
                    Query the database console. Run schemas creations, insertions, joins, and experience transactional ROLLBACK constraints.
                  </p>

                  <div className="bg-[#0d1117] rounded-xl border border-border/50 p-4 font-mono text-sm text-slate-300 relative group">
                    <button
                      onClick={() => handleCopy("CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100), age INT);\nINSERT INTO users VALUES (1, 'Akash Maji', 24);\nSELECT * FROM users WHERE age >= 20;", "sql")}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-card/60 hover:bg-card border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {isCopied === 'sql' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                      <span className="text-cyan-400 font-semibold">CREATE TABLE</span> users (id <span className="text-indigo-400">INT</span> PRIMARY KEY, name <span className="text-indigo-400">VARCHAR(100)</span>, age <span className="text-indigo-400">INT</span>);{"\n\n"}
                      <span className="text-cyan-400 font-semibold">INSERT INTO</span> users <span className="text-cyan-400 font-semibold">VALUES</span> (1, <span className="text-amber-300">'Akash Maji'</span>, 24);{"\n\n"}
                      <span className="text-cyan-400 font-semibold">SELECT</span> * <span className="text-cyan-400 font-semibold">FROM</span> users <span className="text-cyan-400 font-semibold">WHERE</span> age &gt;= 20;
                    </pre>
                  </div>
                </motion.div>
              )}

              {activeTab === 'docker' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-card border border-border/40 p-6 rounded-2xl space-y-4"
                >
                  <p className="text-sm text-muted-foreground">
                    GoDB is fully containerized. Use the dedicated helper script <code className="text-primary font-mono font-semibold bg-primary/10 px-1.5 py-0.5 rounded text-[11px]">./docker.sh</code> to build, run the server, connect a client, or start an interactive local REPL inside Docker instantly.
                  </p>

                  <div className="bg-[#0d1117] rounded-xl border border-border/50 p-4 font-mono text-sm text-slate-300 relative group">
                    <button
                      onClick={() => handleCopy("./docker.sh build\n./docker.sh run\n./docker.sh client\n./docker.sh stop", "docker-cmds")}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-card/60 hover:bg-card border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {isCopied === 'docker-cmds' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                      <span className="text-slate-500 font-semibold"># 1. Build the Docker container image</span>{"\n"}
                      <span className="text-emerald-400 font-semibold">./docker.sh</span> <span className="text-cyan-400">build</span>{"\n\n"}
                      <span className="text-slate-500 font-semibold"># 2. Start GoDB in background server mode on port 2026</span>{"\n"}
                      <span className="text-emerald-400 font-semibold">./docker.sh</span> <span className="text-cyan-400">run</span>{"\n\n"}
                      <span className="text-slate-500 font-semibold"># 3. Connect interactive CLI client to the server container</span>{"\n"}
                      <span className="text-emerald-400 font-semibold">./docker.sh</span> <span className="text-cyan-400">client</span>{"\n\n"}
                      <span className="text-slate-500 font-semibold"># 4. Stop and clean up container and files</span>{"\n"}
                      <span className="text-emerald-400 font-semibold">./docker.sh</span> <span className="text-cyan-400">stop</span>
                    </pre>
                  </div>

                  <div className="pt-2 space-y-3">
                    <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">💡 Alternative: Direct Docker CLI (Without Script)</h5>
                    <div className="bg-[#0d1117] rounded-xl border border-border/50 p-4 font-mono text-sm text-slate-300 relative group">
                      <button
                        onClick={() => handleCopy("docker build -t godb:latest -f docker/Dockerfile .\ndocker run -d --name godb-server -p 2026:2026 -v \"$(pwd)/data:/data\" godb:latest --server --addr \"0.0.0.0:2026\" --db /data/xyz.godb", "docker-direct")}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-card/60 hover:bg-card border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {isCopied === 'docker-direct' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                        <span className="text-slate-500 font-semibold"># Build the Docker image manually</span>{"\n"}
                        <span className="text-emerald-400 font-semibold">docker</span> build <span className="text-violet-400">-t</span> <span className="text-amber-300">godb:latest</span> <span className="text-violet-400">-f</span> docker/Dockerfile .{"\n\n"}
                        <span className="text-slate-500 font-semibold"># Run the server with mounted database directory</span>{"\n"}
                        <span className="text-emerald-400 font-semibold">docker</span> run <span className="text-violet-400">-d</span> <span className="text-violet-400">--name</span> godb-server <span className="text-violet-400">-p</span> <span className="text-amber-300">2026:2026</span> <span className="text-violet-400">-v</span> <span className="text-amber-300">"$(pwd)/data:/data"</span> godb:latest <span className="text-violet-400">--server</span> <span className="text-violet-400">--addr</span> <span className="text-amber-300">"0.0.0.0:2026"</span> <span className="text-violet-400">--db</span> /data/xyz.godb
                      </pre>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="glass-strong border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
        <div className="container mx-auto px-6 space-y-2">
          <p>© {new Date().getFullYear()} GoDB Database Project. All rights reserved.</p>
          <p>Created by <a href="/" className="hover:text-primary transition-colors font-medium">Akash Maji</a>.</p>
        </div>
      </footer>

    </div>
  );
}
