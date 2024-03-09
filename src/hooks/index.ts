import markdownit from 'markdown-it';
import Shiki from '@shikijs/markdown-it';

const markdown = markdownit({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

export const md = markdown.use(
  await Shiki({
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    }
  })
);
