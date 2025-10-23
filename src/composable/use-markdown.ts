import markdownit from 'markdown-it';
import Shiki from '@shikijs/markdown-it';

let _md: ReturnType<typeof markdownit> | undefined;
let shikiPluginPromise: Promise<any> | undefined;

// Initialize Shiki plugin once
function getShikiPlugin() {
  if (!shikiPluginPromise) {
    shikiPluginPromise = Shiki({
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      }
    });
  }
  return shikiPluginPromise;
}

function createMarkdownIt(shikiPlugin?: any) {
  const md = markdownit({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  });

  if (shikiPlugin) {
    md.use(shikiPlugin);
  }

  return md;
}

// Synchronous version - returns markdown-it without Shiki
export function useMarkDown() {
  if (!_md) {
    _md = createMarkdownIt();

    // Async upgrade with Shiki when ready
    getShikiPlugin().then(plugin => {
      if (_md) {
        _md.use(plugin);
      }
    });
  }
  return _md;
}

// Async version - waits for Shiki to be ready
export async function useMarkDownAsync() {
  if (!_md) {
    const shikiPlugin = await getShikiPlugin();
    _md = createMarkdownIt(shikiPlugin);
  }
  return _md;
}
