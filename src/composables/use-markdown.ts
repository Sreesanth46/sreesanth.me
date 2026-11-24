import type { NodeTransform, ParserOptions } from '@comark/vue';
import punctuation from '@comark/vue/plugins/punctuation';
import security from '@comark/vue/plugins/security';
import type { MaybeRefOrGetter } from 'vue';
import { computed, toValue } from 'vue';
import { codeHighlight } from '~/utils/markdown/code-highlight';
import { markdownItCompat } from '~/utils/markdown/markdown-it-compat';
import { skipFrontmatter } from '~/utils/markdown/frontmatter';
import { mermaidBlocks } from '~/utils/markdown/mermaid';

const options: Omit<ParserOptions, 'plugins'> = {
  // markdownItCompat applies markdown-it's paragraph rules instead.
  autoUnwrap: false,
  // Only useful for half-written, streamed markdown.
  autoClose: false,
};

const plugins: ParserOptions['plugins'] = [
  skipFrontmatter(),
  markdownItCompat(),
  punctuation(),
  // Must run before codeHighlight, which would otherwise claim mermaid fences as code.
  mermaidBlocks(),
  codeHighlight(),
  // Raw HTML renders as real elements, where a <script> would run.
  security({ blockedTags: ['script'] }),
];

const ABSOLUTE_URL = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

function resolveAssetUrl(src: string, baseUrl: string) {
  return ABSOLUTE_URL.test(src) ? src : `${baseUrl}/${src.replace(/^\.?\//, '')}`;
}

export function useMarkdown(srcBaseUrl: MaybeRefOrGetter<string>) {
  const transformNode = computed<NodeTransform>(() => {
    const baseUrl = toValue(srcBaseUrl);

    return ({ tag, props }) => {
      if (tag === 'pre') {
        // Code blocks scroll horizontally, so keyboard users must be able to focus them.
        return { props: { ...props, tabindex: 0 } };
      }

      if (tag === 'img' && typeof props.src === 'string') {
        return { props: { ...props, src: resolveAssetUrl(props.src, baseUrl) } };
      }
    };
  });

  return { options, plugins, transformNode };
}
