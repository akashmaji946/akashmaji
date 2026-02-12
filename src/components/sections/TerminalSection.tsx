import Terminal from '@/components/Terminal';

export default function TerminalSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      {/* Go-Mix Terminal */}
      <Terminal
        title="go-mix-language"
        copyCommand="telnet go.akashmaji.me 9090"
        githubLink="https://github.com/akashmaji946/go-mix"
        staticLines={[
          { type: 'comment', content: '# Try this out within your terminal' },
          { type: 'comment', content: '# First install telnet' },
          { type: 'comment', content: '# Connect to the language server' },
        ]}
        typewriterLines={[
          { type: 'command', content: 'telnet go.akashmaji.me 9090' },
          { type: 'response', content: '----------------------------------------------------------------' },
          { type: 'response', content: 'Version: v1.0.0 | Author: akashmaji(@iisc.ac.in) | License: MIT' },
          { type: 'response', content: '----------------------------------------------------------------' },
          { type: 'response', content: 'Welcome to Go-Mix!' },
          { type: 'response', content: 'Type your code and press enter' },
          { type: 'response', content: "Type '/exit' to quit" },
          { type: 'response', content: 'Use up/down arrows to navigate command history' },
          { type: 'response', content: '----------------------------------------------------------------' },
          { type: 'prompt', prompt: 'Go-Mix >>>', content: 'var a = 1;' },
          { type: 'response', content: '1' },
          { type: 'prompt', prompt: 'Go-Mix >>>', content: 'println(a)' },
          { type: 'response', content: '1' },
          { type: 'response', content: 'nil' },
          { type: 'prompt', prompt: 'Go-Mix >>>', content: '/scope' },
          { type: 'response', content: '.......' },
          { type: 'link', content: '# https://github.com/akashmaji946/go-mix' },
        ]}
      />

      {/* Go-Redis Terminal */}
      <Terminal
        title="go-redis-server"
        copyCommand="redis-cli -h go.akashmaji.me -p 7380 --tls"
        githubLink="https://github.com/akashmaji946/go-redis/"
        staticLines={[
          { type: 'comment', content: '# Try this out within your terminal' },
          { type: 'comment', content: '# First install redis-tools (redis-cli)' },
        ]}
        typewriterLines={[
          { type: 'comment', content: '# Connect to go-redis server' },
          { type: 'command', content: 'redis-cli -h go.akashmaji.me -p 7380 --tls' },
          { type: 'comment', content: '# Authenticate as root' },
          { type: 'prompt', prompt: 'go.akashmaji.me:7380>', content: 'AUTH root dsl' },
          { type: 'response', content: 'OK' },
          { type: 'comment', content: '# See available commands in go-redis' },
          { type: 'prompt', prompt: 'go.akashmaji.me:7380>', content: 'COMMANDS' },
          { type: 'response', content: '1) "AUTH"' },
          { type: 'response', content: '      ........' },
          { type: 'comment', content: '# See available command usage' },
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
        ]}
      />
    </div>
  );
}
