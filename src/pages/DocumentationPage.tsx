import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, ArrowLeft, GitFork, Search, ChevronRight, 
  Menu, X, BookOpen, Layers, Cpu, ShieldCheck, 
  HardDrive, Code, Settings, Terminal, Play, HelpCircle,
  Copy, Check, Info, AlertTriangle, Lightbulb, Compass,
  Sliders, ShieldAlert
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';

interface DocSection {
  id: string;
  title: string;
  category: string;
  icon: any;
  content: React.ReactNode;
  subsections: { title: string; href: string }[];
}

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState('intro');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sections: DocSection[] = [
    {
      id: 'intro',
      title: '1. Introduction & Targets',
      category: 'Getting Started',
      icon: BookOpen,
      subsections: [
        { title: 'Overview', href: '#overview' },
        { title: 'Design Philosophy', href: '#philosophy' },
        { title: 'Codebase Goals', href: '#goals' }
      ],
      content: (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <img src="/godb-logo-2.PNG" className="h-24 w-24 object-contain p-1.5 rounded-2xl bg-card border border-border shadow-md" alt="GoDB Logo" />
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight">GoDB Engine Reference</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Version 1.0.0 • Pure Go Columnar Transactional Database Core
              </p>
            </div>
          </div>

          <h2 id="overview" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">1.1 Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GoDB is a relational database engine written in pure Go. It is deliberately ambitious in scope, implementing its own handwritten SQL parser,Logical and Physical planners, vectorized execution core, custom disk-backed columnar files, statistics rewriters, and SS2PL transactional lock tables from first principles.
          </p>

          <div className="p-4 rounded-xl bg-blue-500/10 border-l-4 border-blue-500 text-sm text-blue-700 dark:text-blue-300 space-y-1.5">
            <div className="flex items-center gap-2 font-bold">
              <Info className="h-4 w-4" /> 💡 Structural Engineering Highlight
            </div>
            <p className="text-xs">
              GoDB operates as a modern database kernel. By avoiding opaque Cgo bindings or external rocksdb engines, it demonstrates how low-level systems logic—such as buffer pool page frame pinning, WAL recovery logs, and B+ Trees—can be built efficiently using native Go constructs.
            </p>
          </div>

          <h2 id="philosophy" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">1.2 Design Philosophy</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Unlike hybrid databases or simple in-memory key-value stores, GoDB represents a serious, disk-aware database kernel. Page allocations, file truncations, disk page flushes, and recovery strategies are core components of its lifecycle. It handles memory constraints gracefully via an LRU buffer pool rather than relying on unlimited memory buffers.
          </p>

          <h2 id="goals" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">1.3 Target Audience & Scope</h2>
          <p className="text-sm text-muted-foreground leading-relaxed font-normal">
            The database codebase serves as a highly robust reference:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground font-semibold">
            <li className="flex items-center gap-2 p-3 bg-card border border-border/50 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Educational Reference Systems
            </li>
            <li className="flex items-center gap-2 p-3 bg-card border border-border/50 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Vectorized Execution Studies
            </li>
            <li className="flex items-center gap-2 p-3 bg-card border border-border/50 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> ARIES Transactional Integrity
            </li>
            <li className="flex items-center gap-2 p-3 bg-card border border-border/50 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Optimizer DP Dynamic Ordering
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'architecture',
      title: '2. High-Level Architecture',
      category: 'Design & Architecture',
      icon: Layers,
      subsections: [
        { title: 'Subsystem Map', href: '#map' },
        { title: 'Query Flow', href: '#flow' },
        { title: 'Runtime Process', href: '#process' }
      ],
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold tracking-tight">2. High-Level Architecture</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GoDB is divided into four highly decoupled layers, each communicating through clean, compile-time interfaces:
          </p>

          <h2 id="map" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">2.1 Subsystem Map</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <div className="font-bold text-primary flex items-center gap-2">
                <Code className="h-4 w-4" /> SQL Frontend
              </div>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Lexer, AST, Parser, and Binder. Resolves catalog scopes, checks strict column types, and validates constraints.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <div className="font-bold text-indigo-400 flex items-center gap-2">
                <Sliders className="h-4 w-4" /> Plan Optimizer
              </div>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Transforms binder outputs into logical algebraic trees. Performs constant folding, filter pushdown, and Cost-Based dynamic programming for optimal join paths.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-2">
                <Cpu className="h-4 w-4" /> Vectorized Execution
              </div>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Demand-driven Volcano physical operators. Passes cache-friendly vectors of 2048 rows. Employs fast native memory bulk copying for non-nullable values.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <div className="font-bold text-amber-400 flex items-center gap-2">
                <HardDrive className="h-4 w-4" /> Storage & Transactions
              </div>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Manages column page chains, SS2PL locking tables, active deadlock background checks, buffer pool slots, and ARIES WAL logging.
              </p>
            </div>
          </div>

          <h2 id="flow" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">2.2 The Query compilation Flow</h2>
          <div className="p-6 rounded-2xl bg-card border border-border/60 overflow-x-auto flex justify-between items-center gap-2 font-mono text-[11px] min-w-[500px]">
            <div className="flex flex-col items-center p-3 rounded-lg bg-muted border border-border/40 text-center w-24">
              <span className="font-bold text-primary">SQL string</span>
              <span className="text-[9px] text-muted-foreground mt-1">Tokenizer & AST</span>
            </div>
            <ChevronRight className="text-muted-foreground/40 h-5 w-5 animate-pulse" />
            <div className="flex flex-col items-center p-3 rounded-lg bg-muted border border-border/40 text-center w-24">
              <span className="font-bold text-sky-400">BINDER</span>
              <span className="text-[9px] text-muted-foreground mt-1">Schema Scopes</span>
            </div>
            <ChevronRight className="text-muted-foreground/40 h-5 w-5 animate-pulse" />
            <div className="flex flex-col items-center p-3 rounded-lg bg-muted border border-border/40 text-center w-24">
              <span className="font-bold text-indigo-400">OPTIMIZER</span>
              <span className="text-[9px] text-muted-foreground mt-1">DP Reordering</span>
            </div>
            <ChevronRight className="text-muted-foreground/40 h-5 w-5 animate-pulse" />
            <div className="flex flex-col items-center p-3 rounded-lg bg-muted border border-border/40 text-center w-24">
              <span className="font-bold text-emerald-400">VECTOR</span>
              <span className="text-[9px] text-muted-foreground mt-1">Volcano Chunks</span>
            </div>
          </div>

          <h2 id="process" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">2.3 Remote runtime process model</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GoDB supports stateful remote execution over TCP and HTTP protocols. Sessions maintain state, transaction boundaries, and private, temporary catalog tables on a per-connection basis.
          </p>
        </div>
      )
    },
    {
      id: 'design-decisions',
      title: '3. Core Design Decisions',
      category: 'Design & Architecture',
      icon: Cpu,
      subsections: [
        { title: 'Columnar Storage', href: '#columnar' },
        { title: 'Vectorized Volcano', href: '#vectorized' },
        { title: 'Tombstones & DML', href: '#tombstone' },
        { title: 'SS2PL & Deadlocks', href: '#concurrency' }
      ],
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold tracking-tight">3. Core Design Decisions</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Detailed engineering rationale backing GoDB's fundamental system choices:
          </p>

          <h2 id="columnar" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">3.1 Columnar Storage</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Unlike traditional row-oriented databases (e.g., PostgreSQL, SQLite) where a single page contains multiple rows with all column fields packed together, GoDB organizes data <strong>column-by-column</strong>.
          </p>
          <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed list-disc pl-5">
            <li>Each column is written as an independent on-disk page chain.</li>
            <li>Table scans load <strong>only</strong> the columns queried by the execution engine, reducing physical disk I/O significantly.</li>
            <li>Enables highly efficient compression rates on disk due to uniform data types within a column.</li>
          </ul>

          <h2 id="vectorized" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">3.2 Vectorized Volcano Execution</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GoDB pairs the traditional Volcano iterator model (Init, Next, Close) with <strong>vectorization</strong> to minimize CPU overhead.
          </p>
          <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-xs text-amber-700 dark:text-amber-300 space-y-1">
            <span className="font-bold block">⚡ CPU Performance Tuning</span>
            Instead of calling Next() to return a single boxed row value (which creates millions of dynamic allocations), GoDB passes a <code className="font-bold">DataChunk</code> containing 2048 rows packed into flat memory slices. This design keeps memory contiguous, improves CPU cache locality, and enables compiler loop vectorization.
          </div>

          <h2 id="tombstone" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">3.3 Tombstone-Based Deletes & Appends</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Data mutations are optimized to avoid heavy random disk writes:
          </p>
          <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed list-disc pl-5">
            <li><strong className="text-foreground">Logical Deletes:</strong> Rows are deleted logically by writing a bit flag to a hidden `__DELETED__` tombstone column.</li>
            <li><strong className="text-foreground">Append Updates:</strong> Updates are executed as a logical Delete of the old row followed by an Append of the new values.</li>
          </ul>

          <h2 id="concurrency" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">3.4 SS2PL Concurrency & Deadlocks</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Transactions enforce full ACID properties through strict Two-Phase Locking (SS2PL).
          </p>
          <div className="p-4 rounded-xl bg-rose-500/10 border-l-4 border-rose-500 text-xs text-rose-700 dark:text-rose-300 space-y-1">
            <span className="font-bold block">🛡️ Deadlock Detection & Victim Abort</span>
            S/X locks are acquired at both table and page boundaries. S locks are shared, X locks are exclusive, and intent locks (IS/IX) manage hierarchical scopes. An active background thread runs a cycle checker that detects circular wait dependencies, aborts the victim transaction, and rolls back its uncommitted writes.
          </div>
        </div>
      )
    },
    {
      id: 'running-godb',
      title: '4. Running GoDB & Modes',
      category: 'Deployment',
      icon: Play,
      subsections: [
        { title: 'Compilation', href: '#build' },
        { title: 'REPL Mode', href: '#repl' },
        { title: 'Client & Server', href: '#networking' }
      ],
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold tracking-tight">4. Running GoDB & Modes</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GoDB compiles into a compact, statically linked, zero-dependency binary file.
          </p>

          <h2 id="build" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">4.1 Compilation</h2>
          <div className="bg-[#0d1117] rounded-xl border border-border/50 p-4 font-mono text-xs sm:text-sm text-slate-300 relative group">
            <button 
              onClick={() => handleCopy("./make.sh\n# Or build directly:\ngo build -o build/godb ./cmd/main.go", "comp-full")}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-card/60 hover:bg-card border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copiedId === 'comp-full' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </button>
            <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
              <span className="text-muted-foreground"># Compile binary using helper script</span>{"\n"}
              ./make.sh{"\n\n"}
              <span className="text-muted-foreground"># Or build directly using the Go toolchain</span>{"\n"}
              go build -o build/godb ./cmd/main.go
            </pre>
          </div>

          <h2 id="repl" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">4.2 Embedded REPL Mode</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Launches the interactive database command line shell (REPL) backed by a local database file under `build/data/repl.db`.
          </p>
          <div className="bg-[#0d1117] rounded-xl border border-border/50 p-4 font-mono text-xs sm:text-sm text-slate-300 relative group">
            <button 
              onClick={() => handleCopy("./repl.sh", "repl-start-full")}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-card/60 hover:bg-card border border-border/40 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copiedId === 'repl-start-full' ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </button>
            <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
              ./repl.sh
            </pre>
          </div>

          <h2 id="networking" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">4.3 Server & Client Configurations</h2>
          <p className="text-sm text-muted-foreground">
            Launch GoDB as a database server or connect as a remote client:
          </p>

          <div className="space-y-4 font-mono text-xs mt-4">
            <div className="p-4 rounded-xl border border-border/50 bg-card space-y-2">
              <span className="text-emerald-400 font-bold block">1. Start TCP Server Mode</span>
              <pre className="text-slate-300 overflow-x-auto">./build/godb --server --protocol tcp --addr 127.0.0.1:2026 --db ./godb_data.godb --password secret</pre>
            </div>
            
            <div className="p-4 rounded-xl border border-border/50 bg-card space-y-2">
              <span className="text-sky-400 font-bold block">2. Connect Remote Client</span>
              <pre className="text-slate-300 overflow-x-auto">./build/godb --client --protocol tcp --addr 127.0.0.1:2026 --password secret</pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'repl-commands',
      title: '5. REPL Command Reference',
      category: 'Reference',
      icon: Terminal,
      subsections: [
        { title: 'Interactive Shell', href: '#shell' },
        { title: 'Meta Commands', href: '#meta' }
      ],
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold tracking-tight">5. REPL Command Reference</h1>
          
          <h2 id="shell" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">5.1 Interactive Shell Prompt</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The shell prompt (`godb &gt;&gt;`) supports multi-line queries, syntax parsing, and transactional control commands:
          </p>

          <h2 id="meta" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">5.2 Meta-Commands Reference Table</h2>
          <div className="border border-border/40 rounded-2xl overflow-hidden shadow-sm bg-card mt-4">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border/40 font-bold">
                  <th className="p-3">Command</th>
                  <th className="p-3">Functionality</th>
                  <th className="p-3">CLI Usage Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 text-muted-foreground leading-relaxed font-mono">
                <tr>
                  <td className="p-3 font-semibold text-primary">\dt</td>
                  <td className="p-3">Lists all active catalog tables, views, and temporary tables.</td>
                  <td className="p-3 text-slate-400">\dt</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primary">\d [table]</td>
                  <td className="p-3">Prints columns, data types, constraints, and indexes.</td>
                  <td className="p-3 text-slate-400">\d employee</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primary">\con [table]</td>
                  <td className="p-3">Lists active catalog constraints (Foreign Key and unique references).</td>
                  <td className="p-3 text-slate-400">\con orders</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primary">\indexes</td>
                  <td className="p-3">Lists active index definitions and allocations.</td>
                  <td className="p-3 text-slate-400">\indexes</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primary">\memory</td>
                  <td className="p-3">Reports detailed buffer pool utilization, dirty pages, and hit rate.</td>
                  <td className="p-3 text-slate-400">\memory</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primary">\tpcgen [sf]</td>
                  <td className="p-3">Generates TPC-H datasets at the specified Scale Factor (SF).</td>
                  <td className="p-3 text-slate-400">\tpcgen 1.0 ./data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'sql-coverage',
      title: '6. SQL Surface Area',
      category: 'Reference',
      icon: Code,
      subsections: [
        { title: 'Statement Support', href: '#ddl' },
        { title: 'Join Strategies', href: '#joins' },
        { title: 'Functions', href: '#functions' }
      ],
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold tracking-tight">6. SQL Surface Area</h1>
          
          <h2 id="ddl" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">6.1 SQL Statements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs text-muted-foreground">
            <span className="p-2 rounded bg-card border border-border">SELECT</span>
            <span className="p-2 rounded bg-card border border-border">INSERT</span>
            <span className="p-2 rounded bg-card border border-border">UPDATE</span>
            <span className="p-2 rounded bg-card border border-border">DELETE</span>
            <span className="p-2 rounded bg-card border border-border">CREATE TABLE</span>
            <span className="p-2 rounded bg-card border border-border">CREATE VIEW</span>
            <span className="p-2 rounded bg-card border border-border">CREATE INDEX</span>
            <span className="p-2 rounded bg-card border border-border">ALTER TABLE</span>
            <span className="p-2 rounded bg-card border border-border">TRUNCATE</span>
            <span className="p-2 rounded bg-card border border-border">LOAD</span>
            <span className="p-2 rounded bg-card border border-border">EXPLAIN</span>
            <span className="p-2 rounded bg-card border border-border">ANALYZE</span>
          </div>

          <h2 id="joins" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">6.2 Joins Support</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GoDB's physical planner supports multiple join execution strategies:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg border border-border bg-card">
              <span className="font-bold text-primary">Hash Join</span>
              <p className="text-[10px] text-muted-foreground mt-1">Builds an in-memory hash table on the smaller relation, then probes it with vectorized chunks from the larger table.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-card">
              <span className="font-bold text-emerald-400">Nested Loop Join</span>
              <p className="text-[10px] text-muted-foreground mt-1">A fallback vectorized operator that joins rows iteratively. Used for non-equi joins or lateral queries.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-card">
              <span className="font-bold text-sky-400">Sort-Merge Join</span>
              <p className="text-[10px] text-muted-foreground mt-1">Sorts both tables on the join keys before executing a single-pass merge join. Memory-efficient for pre-sorted datasets.</p>
            </div>
          </div>

          <h2 id="functions" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">6.3 Aggregate & Window Functions</h2>
          <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed list-disc pl-5">
            <li><strong className="text-foreground">Aggregates:</strong> COUNT, SUM, AVG, MIN, MAX, STDDEV, VARIANCE, MEDIAN, STRING_AGG.</li>
            <li><strong className="text-foreground">Window Functions:</strong> ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, CUME_DIST, PERCENT_RANK, NTILE, FIRST_VALUE, LAST_VALUE.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'aries-recovery',
      title: '7. ARIES Recovery Protocol',
      category: 'Reference',
      icon: ShieldCheck,
      subsections: [
        { title: 'Write-Ahead Log', href: '#wal' },
        { title: 'Analysis Phase', href: '#analysis' },
        { title: 'REDO Phase', href: '#redo' },
        { title: 'UNDO Phase', href: '#undo' }
      ],
      content: (
        <div className="space-y-6">
          <h1 className="text-3xl font-extrabold tracking-tight">7. ARIES Transactional Recovery</h1>
          
          <h2 id="wal" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">7.1 Write-Ahead Logging (WAL)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GoDB enforces durabilty contracts (ACID properties) by writing changes to the write-ahead log (WAL) before dirty database page frames are flushed to disk.
          </p>

          <h2 id="analysis" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">7.2 Analysis Phase</h2>
          <p className="text-sm text-muted-foreground leading-relaxed font-normal">
            Scans the WAL forward from the latest recorded checkpoint to:
          </p>
          <ul className="space-y-1.5 text-xs text-muted-foreground list-disc pl-5">
            <li>Reconstruct the active Transaction Table and locate uncommitted transactions.</li>
            <li>Rebuild the Dirty Page Table (DPT) to identify pages requiring disk flushes.</li>
          </ul>

          <h2 id="redo" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">7.3 REDO Phase (Repeating History)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Replays all logged physical changes forward to restore the database to its exact state prior to the crash. During this phase, GoDB reconstructs page modifications and writes Compensation Log Records (CLRs) to ensure recovery itself is crash-safe.
          </p>

          <h2 id="undo" className="text-2xl font-bold mt-8 border-b border-border/40 pb-2">7.4 UNDO Phase (Rolling Back Active Transactions)</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Scans backward to reverse the modifications of all transactions that were active (uncommitted) at the time of the crash. Reverses writes logically using inverse DML operations to ensure transactional consistency.
          </p>
        </div>
      )
    }
  ];

  const filteredSections = sections.filter(sec => 
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sec.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSection = sections.find(sec => sec.id === activeSectionId) || sections[0];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      
      {/* Glow Blur Orbs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      {/* Header */}
      <header className="sticky top-0 left-0 right-0 z-50 glass-strong border-b border-border/40 py-4">
        <nav className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/godb.html" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">GoDB Page</span>
            </a>
            <div className="h-4 w-px bg-border/60" />
            <a href="/godb/documentation.html" className="flex items-center gap-2.5 font-bold text-gradient text-xl">
              <img src="/godb-logo-2.PNG" className="h-8 w-8 object-contain" alt="GoDB Logo" />
              GoDB Docs
            </a>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild size="sm" variant="outline" className="hidden sm:flex rounded-full gap-2 font-medium">
              <a href="https://github.com/akashmaji946/godb" target="_blank" rel="noopener noreferrer">
                <GitFork className="h-4 w-4" />
                Star Repo
              </a>
            </Button>
            
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            >
              {isMobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Page Body Container */}
      <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block w-72 shrink-0 self-start sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto space-y-6 custom-scrollbar pr-2">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border/60 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Navigation Chapters */}
          <div className="space-y-4">
            <div>
              <h4 className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider mb-2">Chapters</h4>
              <div className="space-y-1">
                {filteredSections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSectionId(sec.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        activeSectionId === sec.id
                          ? 'bg-primary/10 text-primary shadow-sm'
                          : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="truncate">{sec.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar overlay */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.1 }}
              className="fixed inset-y-0 left-0 z-40 w-72 bg-card border-r border-border p-6 shadow-2xl space-y-6 lg:hidden"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-gradient">GoDB Chapters</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search reference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-muted border border-border/60 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-180px)] pr-1 custom-scrollbar">
                {filteredSections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setActiveSectionId(sec.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        activeSectionId === sec.id
                          ? 'bg-primary/10 text-primary shadow-sm'
                          : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{sec.title}</span>
                    </button>
                  );
                })}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Content Viewer */}
        <main className="flex-1 w-full max-w-3xl self-start bg-card/25 border border-border/40 p-6 sm:p-10 rounded-3xl shadow-sm min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeSection.content}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Right Sidebar (On-Page Subsections - Desktop) */}
        <aside className="hidden xl:block w-56 shrink-0 self-start sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto space-y-4 pr-1">
          <h4 className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">On this page</h4>
          <div className="space-y-2 text-xs">
            {activeSection.subsections.map((sub, i) => (
              <a
                key={i}
                href={sub.href}
                className="block text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {sub.title}
              </a>
            ))}
          </div>
        </aside>

      </div>

    </div>
  );
}
