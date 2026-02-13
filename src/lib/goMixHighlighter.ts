// Go-Mix syntax highlighting based on tmLanguage grammar

interface Token {
  text: string;
  type: string;
}

const TOKEN_RULES: [RegExp, string][] = [
  // Comments
  [/^\/\/.*$/, 'comment'],
  [/^\/\*[\s\S]*?\*\//, 'comment'],
  // Strings
  [/^"(?:[^"\\]|\\.)*"/, 'string'],
  [/^'(?:[^'\\]|\\.)*'/, 'string'],
  [/^`(?:[^`\\]|\\.)*`/, 'string'],
  // Numbers
  [/^\b0[xX][0-9a-fA-F]+\b/, 'number'],
  [/^\b\d+\.\d+([eE][+-]?\d+)?\b/, 'number'],
  [/^\b\d+\b/, 'number'],
  // Keywords (control)
  [/^\b(if|else|while|for|foreach|in|break|continue|return)\b/, 'keyword'],
  // Keywords (declaration)
  [/^\b(func|var|let|const|new|struct|array|map|set)\b/, 'keyword-decl'],
  // Constants
  [/^\b(true|false|null|nil)\b/, 'constant'],
  // Function calls
  [/^\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/, 'function'],
  // Operators (multi-char first)
  [/^(&&|\|\||==|!=|<=|>=|<<=|>>=|\+=|-=|\*=|\/=|%=|&=|\|=|\^=|<<|>>)/, 'operator'],
  [/^[+\-*/%=<>!&|^~]/, 'operator'],
  // Punctuation
  [/^[{}()\[\];,.]/, 'punctuation'],
  // Identifiers
  [/^\b[a-zA-Z_][a-zA-Z0-9_]*\b/, 'variable'],
  // Whitespace
  [/^\s+/, 'whitespace'],
];

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    let matched = false;
    for (const [regex, type] of TOKEN_RULES) {
      const match = remaining.match(regex);
      if (match) {
        tokens.push({ text: match[0], type });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ text: remaining[0], type: 'plain' });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

export const TOKEN_COLORS: Record<string, string> = {
  comment: '#6A9955',
  string: '#CE9178',
  number: '#B5CEA8',
  keyword: '#C586C0',
  'keyword-decl': '#569CD6',
  constant: '#569CD6',
  function: '#DCDCAA',
  operator: '#D4D4D4',
  punctuation: '#808080',
  variable: '#9CDCFE',
  whitespace: '',
  plain: '#D4D4D4',
};
