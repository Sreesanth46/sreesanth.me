/** Split rendered markdown HTML into top-level block elements. */
export function htmlToMarkdownBlocks(html: string): string[] {
  if (!html.trim()) {
    return [];
  }

  const doc = new DOMParser().parseFromString(html, 'text/html');
  return Array.from(doc.body.children).map((node) => node.outerHTML);
}
