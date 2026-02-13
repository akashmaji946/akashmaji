import { StreamLanguage } from '@codemirror/language';

const goMixLanguage = StreamLanguage.define({
  token(stream) {
    // Comments
    if (stream.match('//')) {
      stream.skipToEnd();
      return 'comment';
    }
    if (stream.match('/*')) {
      while (!stream.match('*/') && !stream.eol()) stream.next();
      return 'comment';
    }

    // Strings
    if (stream.match('"')) {
      while (!stream.eol()) {
        if (stream.next() === '\\') stream.next();
        else if (stream.current().endsWith('"') && stream.current().length > 1) break;
      }
      return 'string';
    }
    if (stream.match("'")) {
      while (!stream.eol()) {
        if (stream.next() === '\\') stream.next();
        else if (stream.current().endsWith("'") && stream.current().length > 1) break;
      }
      return 'string';
    }
    if (stream.match('`')) {
      while (!stream.eol()) {
        if (stream.next() === '`') break;
      }
      return 'string';
    }

    // Numbers
    if (stream.match(/^0[xX][0-9a-fA-F]+/) || stream.match(/^\d+\.\d+([eE][+-]?\d+)?/) || stream.match(/^\d+/)) {
      return 'number';
    }

    // Identifiers & keywords
    if (stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)) {
      const word = stream.current();
      if (/^(if|else|while|for|foreach|in|break|continue|return)$/.test(word)) return 'keyword';
      if (/^(func|var|let|const|new|struct|array|map|set)$/.test(word)) return 'keyword';
      if (/^(true|false|null|nil)$/.test(word)) return 'atom';
      // Check if it's a function call
      if (stream.peek() === '(') return 'variableName.function';
      return 'variableName';
    }

    // Operators
    if (stream.match(/^(&&|\|\||==|!=|<=|>=|<<=|>>=|\+=|-=|\*=|\/=|%=|&=|\|=|\^=|<<|>>)/)) {
      return 'operator';
    }
    if (stream.match(/^[+\-*/%=<>!&|^~]/)) {
      return 'operator';
    }

    // Punctuation
    if (stream.match(/^[{}()\[\];,.]/)) {
      return 'punctuation';
    }

    stream.next();
    return null;
  },
});

export default goMixLanguage;
