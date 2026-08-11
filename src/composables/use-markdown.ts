import { fromHighlighter } from '@shikijs/markdown-it/core';
import MarkdownIt from 'markdown-it';
import { createHighlighterCore, type HighlighterGeneric } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { MERMAID_BLOCK_CLASS } from '~/utils/mermaid';
import { WHOLE_BLOCK_CLASS } from '~/utils/markdown-line-reveal';

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

const highlighter = (await createHighlighterCore({
  themes: [import('@shikijs/themes/vitesse-light'), import('@shikijs/themes/vitesse-dark')],
  langs: [
    import('@shikijs/langs/javascript'),
    import('@shikijs/langs/typescript'),
    import('@shikijs/langs/jsx'),
    import('@shikijs/langs/tsx'),
    import('@shikijs/langs/vue'),
    import('@shikijs/langs/html'),
    import('@shikijs/langs/css'),
    import('@shikijs/langs/scss'),
    import('@shikijs/langs/json'),
    import('@shikijs/langs/bash'),
    import('@shikijs/langs/shellscript'),
    import('@shikijs/langs/python'),
    import('@shikijs/langs/markdown'),
    import('@shikijs/langs/http'),
  ],
  engine: createJavaScriptRegexEngine(),
})) as unknown as HighlighterGeneric<any, any>;

md.use(
  fromHighlighter(highlighter, {
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  })
);

const loadedLangs = new Set(highlighter.getLoadedLanguages());

/*
 * Fence handling on top of the highlighter, for the two cases it can't take:
 *
 *  - `mermaid` is a diagram, not code. Its source is handed through to the client
 *    verbatim for mermaid to draw after mount (see utils/mermaid).
 *  - Any language absent from `langs` above throws out of Shiki, and so out of
 *    `md.render()` — which runs in a render-time computed. Since posts are fetched
 *    from a separate repo at runtime, one unknown tag would take the page down
 *    with no build to catch it, so unknown languages degrade to plaintext.
 *
 * Everything else delegates to the highlighter's own rule untouched.
 */
const renderFence = md.renderer.rules.fence!;

md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const [lang = '', ...attrs] = token.info.trim().split(/\s+/);

  if (lang === 'mermaid') {
    // Escaped for a double-quoted attribute, so diagram source holding quotes or
    // angle brackets can't break out of it.
    return `<div class="${MERMAID_BLOCK_CLASS} ${WHOLE_BLOCK_CLASS}" data-mermaid="${md.utils.escapeHtml(
      token.content
    )}"></div>\n`;
  }

  if (lang && !loadedLangs.has(lang)) {
    // The highlighter reads the language back off `info`; tokens are rebuilt every
    // render, so rewriting it here can't leak into another render.
    token.info = ['text', ...attrs].join(' ');
  }

  return renderFence(tokens, idx, options, env, self);
};

export function useMarkDown() {
  return md;
}
