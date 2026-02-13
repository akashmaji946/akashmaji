import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const chalkyYellow = '#e5c07b',
  coral = '#e06c75',
  cyan = '#56b6c2',
  sage = '#98c379',
  stone = '#5c6370',
  malibu = '#61afef',
  violet = '#c678dd',
  ivory = '#abb2bf';

export const oneDarkTheme = EditorView.theme(
  {
    '&': {
      color: ivory,
      backgroundColor: '#1e1e1e',
    },
    '.cm-content': {
      caretColor: '#528bff',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
      fontSize: '14px',
      lineHeight: '1.6',
    },
    '.cm-cursor, .cm-dropCursor': { borderLeftColor: '#528bff' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: '#3E4451' },
    '.cm-panels': { backgroundColor: '#1e1e1e', color: ivory },
    '.cm-searchMatch': { backgroundColor: '#72a1ff59', outline: '1px solid #457dff' },
    '.cm-searchMatch.cm-searchMatch-selected': { backgroundColor: '#6199ff2f' },
    '.cm-activeLine': { backgroundColor: '#2c313c50' },
    '.cm-selectionMatch': { backgroundColor: '#aafe661a' },
    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: '#bad0f847',
    },
    '.cm-gutters': {
      backgroundColor: '#1e1e1e',
      color: '#5c6370',
      border: 'none',
      borderRight: '1px solid #333',
    },
    '.cm-activeLineGutter': { backgroundColor: '#2c313c50' },
    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ddd',
    },
    '.cm-tooltip': { border: 'none', backgroundColor: '#353a42' },
    '.cm-tooltip .cm-tooltip-arrow:before': { borderTopColor: 'transparent', borderBottomColor: 'transparent' },
    '.cm-tooltip .cm-tooltip-arrow:after': { borderTopColor: '#353a42', borderBottomColor: '#353a42' },
    '.cm-tooltip-autocomplete': { '& > ul > li[aria-selected]': { backgroundColor: '#2c313c', color: ivory } },
  },
  { dark: true }
);

export const oneDarkHighlightStyle = syntaxHighlighting(
  HighlightStyle.define([
    { tag: tags.keyword, color: violet },
    { tag: [tags.name, tags.deleted, tags.character, tags.macroName], color: coral },
    { tag: [tags.function(tags.variableName)], color: malibu },
    { tag: [tags.labelName], color: malibu },
    { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: chalkyYellow },
    { tag: [tags.definition(tags.name), tags.separator], color: ivory },
    { tag: [tags.brace], color: ivory },
    { tag: [tags.annotation], color: stone },
    { tag: [tags.number, tags.changed, tags.annotation, tags.modifier, tags.self, tags.namespace], color: chalkyYellow },
    { tag: [tags.typeName, tags.className], color: chalkyYellow },
    { tag: [tags.operator, tags.operatorKeyword], color: cyan },
    { tag: [tags.tagName], color: coral },
    { tag: [tags.squareBracket], color: coral },
    { tag: [tags.angleBracket], color: coral },
    { tag: [tags.attributeName], color: chalkyYellow },
    { tag: [tags.regexp], color: coral },
    { tag: [tags.quote], color: sage },
    { tag: [tags.string], color: sage },
    { tag: tags.link, color: cyan, textDecoration: 'underline', textUnderlinePosition: 'under' as any },
    { tag: [tags.url, tags.escape, tags.special(tags.string)], color: chalkyYellow },
    { tag: [tags.meta], color: stone },
    { tag: [tags.comment], color: stone, fontStyle: 'italic' },
    { tag: tags.strong, fontWeight: 'bold', color: chalkyYellow },
    { tag: tags.emphasis, fontStyle: 'italic', color: chalkyYellow },
    { tag: tags.strikethrough, textDecoration: 'line-through' },
    { tag: tags.heading, fontWeight: 'bold', color: coral },
    { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: chalkyYellow },
    { tag: [tags.processingInstruction, tags.inserted], color: malibu },
    { tag: [tags.contentSeparator], color: cyan },
    { tag: tags.invalid, color: '#ffffff', backgroundColor: coral },
    { tag: tags.variableName, color: '#e06c75' },
  ])
);
