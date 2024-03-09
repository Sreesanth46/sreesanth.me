import markdownit from 'markdown-it';
import Shiki from '@shikijs/markdown-it';

let _md: markdownit;

export async function useMarkDown() {
  if (!_md) {
    _md = markdownit({
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
  }

  return _md;
}
