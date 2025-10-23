import Shiki from '@shikijs/markdown-it';
import MarkdownIt from 'markdown-it';

const md = MarkdownIt();

md.use(
  await Shiki({
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    }
  })
);

export function useMarkDown() {
  return md;
}
