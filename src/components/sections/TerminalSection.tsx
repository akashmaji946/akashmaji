import { motion } from 'framer-motion';

export default function TerminalSection() {
  const staticLines = [
    { type: 'comment', content: '# try this out within your terminal' },
    { type: 'comment', content: '# install redis-tools (redis-cli)' },
    { type: 'command', content: 'redis-cli -h go.akashmaji.me -p 7379' },
  ];

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
          <div className="bg-[#1e1e1e] dark:bg-[#0d0d0d] p-4 sm:p-6 font-mono text-sm sm:text-base">
            {staticLines.map((line, index) => (
              <div key={index} className="mb-1">
                {line.type === 'comment' ? (
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 select-none">$</span>
                    <span className="text-gray-500">{line.content}</span>
                  </div>
                ) : (
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 select-none">$</span>
                    <span className="text-white">{line.content}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
