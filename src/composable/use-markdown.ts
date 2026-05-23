import { fromHighlighter } from '@shikijs/markdown-it/core';
import MarkdownIt from 'markdown-it';
import { createHighlighterCore, type HighlighterGeneric } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
});

const highlighter = (await createHighlighterCore({
  themes: [
    import('@shikijs/themes/vitesse-light'),
    import('@shikijs/themes/vitesse-dark'),
  ],
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

export function useMarkDown() {
  return md;
}
