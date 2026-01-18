import Shiki from '@shikijs/markdown-it';
import MarkdownIt from 'markdown-it';

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

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
