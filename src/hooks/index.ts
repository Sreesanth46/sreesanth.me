import markdownit from 'markdown-it';
import Shiki from '@shikijs/markdown-it';

let _md: markdownit | undefined;
let shikiPlugin: any | undefined;
let shikiPluginPromise: Promise<any> | undefined;

// Start loading the Shiki plugin at module load
shikiPluginPromise = Shiki({
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark'
  }
}).then(plugin => {
  shikiPlugin = plugin;
});

export function useMarkDown() {
  if (!_md) {
    _md = markdownit({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true
    });
    if (shikiPlugin) {
      _md.use(shikiPlugin);
    }
  }
  return _md;
}
