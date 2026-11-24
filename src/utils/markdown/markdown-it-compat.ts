import type { ComarkParseTokensState } from '@comark/vue';
import { defineComarkPlugin } from '@comark/vue/parse';

type Token = ComarkParseTokensState['tokens'][number];

const isParagraphToken = (token: Token) =>
  token.type === 'paragraph_open' || token.type === 'paragraph_close';

// markdown-it marks the paragraphs of tight list items `hidden`; comark ignores the flag.
function removeTightListParagraphs(tokens: Token[]) {
  return tokens.filter((token) => !(token.hidden && isParagraphToken(token)));
}

function renderSoftBreaksAsLineBreaks(tokens: Token[]) {
  for (const child of tokens.flatMap((token) => token.children ?? [])) {
    if (child.type === 'softbreak') {
      child.type = 'hardbreak';
      child.tag = 'br';
    }
  }
}

/**
 * Restores the markdown-it rendering the posts were written against. Line
 * breaks are handled here because comark's `breaks` plugin loses the newline
 * after inline HTML.
 */
export const markdownItCompat = defineComarkPlugin(() => ({
  name: 'markdown-it-compat',
  markdownItPost(state) {
    state.tokens = removeTightListParagraphs(state.tokens);
    renderSoftBreaksAsLineBreaks(state.tokens);
  },
}));
