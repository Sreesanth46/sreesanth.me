import MarkdownIt from 'markdown-it';
import Shiki from '@shikijs/markdown-it';

let _md: MarkdownIt;

export function useMarkDown() {
  if (!_md) {
    (async () => {
      _md = MarkdownIt({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true
      });

      _md.use(
        await Shiki({
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
          }
        })
      );
    })();
  }

  return _md;
}
