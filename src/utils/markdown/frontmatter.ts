import { defineComarkPlugin } from '@comark/vue/parse';

const DELIMITER = '---';

// Finds the block the same way comark's own `parseFrontmatter` does.
function stripFrontmatter(markdown: string) {
  if (!markdown.startsWith(DELIMITER)) {
    return markdown;
  }

  const closingLineBreak = markdown.indexOf(`\n${DELIMITER}`);
  const carriageReturn = markdown[closingLineBreak - 1] === '\r' ? 1 : 0;
  const isEmptyBlock = closingLineBreak - carriageReturn <= DELIMITER.length + 1;

  if (closingLineBreak === -1 || isEmptyBlock) {
    return markdown;
  }

  return markdown.slice(closingLineBreak + DELIMITER.length + 1 + carriageReturn);
}

/**
 * Replaces comark's default frontmatter plugin, which parses the YAML and throws
 * on malformed input. Rendering never needs the data: post metadata comes from
 * src/blogs.ts.
 */
export const skipFrontmatter = defineComarkPlugin(() => ({
  // Sharing the default plugin's name is what replaces it.
  name: 'frontmatter',
  pre(state) {
    state.markdown = stripFrontmatter(state.markdown);
  },
}));
