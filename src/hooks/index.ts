import markdownit from 'markdown-it';
import Shiki from '@shikijs/markdown-it';

const markdown = markdownit({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

const init = async (): Promise<typeof markdown> => {
  return markdown.use(
    await Shiki({
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      }
    })
  );
};

export const md = await init();
