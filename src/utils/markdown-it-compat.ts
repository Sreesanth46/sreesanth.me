import type { ComarkParseTokensState } from '@comark/vue';
import { defineComarkPlugin } from '@comark/vue/parse';
import { highlightCodeBlocks, type ShikiCoreOptions } from '@comark/vue/plugins/shiki/core';

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

let shikiOptions: Promise<ShikiCoreOptions> | undefined;

// Not listed but still highlighted: bash/sh/zsh are shellscript aliases, and
// comark ships its own grammar for markdown/md.
function loadShikiOptions() {
  shikiOptions ??= Promise.all([
    import('@shikijs/themes/vitesse-light'),
    import('@shikijs/themes/vitesse-dark'),
    Promise.all([
      import('@shikijs/langs/javascript'),
      import('@shikijs/langs/typescript'),
      import('@shikijs/langs/jsx'),
      import('@shikijs/langs/tsx'),
      import('@shikijs/langs/vue'),
      import('@shikijs/langs/html'),
      import('@shikijs/langs/css'),
      import('@shikijs/langs/scss'),
      import('@shikijs/langs/json'),
      import('@shikijs/langs/shellscript'),
      import('@shikijs/langs/python'),
      import('@shikijs/langs/http'),
    ]),
  ]).then(([light, dark, langs]) => ({
    themes: { light: light.default, dark: dark.default },
    languages: langs.map((lang) => lang.default),
    // Gives blocks in an unknown language the theme's colours.
    preStyles: true,
  }));

  return shikiOptions;
}

export const codeHighlight = defineComarkPlugin(() => ({
  name: 'code-highlight',
  async post(state) {
    try {
      state.tree = await highlightCodeBlocks(state.tree, await loadShikiOptions());
    } catch {
      // A grammar failed to download: render unhighlighted, and retry next time.
      shikiOptions = undefined;
    }
  },
}));
