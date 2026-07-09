import { blogLineRevealMaxIndex } from '~/utils/blog-layout';

/*
 * True per-visual-line reveal that preserves inline markup.
 *
 * The trick: we never build "line container" elements (which would force an
 * inline element like a link to be split across two containers, and previously
 * led to flattening the block via textContent). Instead we wrap each *word* in
 * a span in place — leaving <a>/<code>/<strong> structure untouched — then read
 * each word's visual line from its layout position and hand every word a
 * per-line stagger via --line-index. Words on the same wrapped line share a
 * delay, so a paragraph reveals line by line.
 */

/** Tags whose children are themselves blocks — we recurse instead of splitting. */
const BLOCK_CONTAINER = new Set([
  'DIV',
  'UL',
  'OL',
  'BLOCKQUOTE',
  'TABLE',
  'THEAD',
  'TBODY',
  'TR',
  'FIGURE',
]);

/** Tags revealed as a single unit rather than split into visual lines. */
const WHOLE_BLOCK = new Set(['PRE', 'TABLE', 'FIGURE', 'HR']);

/**
 * Inline elements revealed as one token instead of word-by-word. Their own box
 * carries a background (the inline-code chip), which would otherwise show empty
 * before its text faded in — so the whole element must reveal together.
 */
const ATOMIC_INLINE = new Set(['CODE', 'KBD']);

interface RevealContext {
  /** Highest --line-index assigned so far (-1 before anything is revealed). */
  line: number;
}

function cap(line: number) {
  return Math.min(line, blogLineRevealMaxIndex);
}

function hasBlockChildren(element: Element) {
  for (const child of element.children) {
    if (BLOCK_CONTAINER.has(child.tagName) || /^(P|LI|H[1-6]|PRE|HR)$/.test(child.tagName)) {
      return true;
    }
  }
  return false;
}

function revealWholeBlock(element: HTMLElement, ctx: RevealContext) {
  ctx.line += 1;
  element.classList.add('md-reveal');
  element.style.setProperty('--line-index', String(cap(ctx.line)));
}

/**
 * Walks a block in document order, turning it into a flat list of reveal tokens:
 * each word becomes a .md-word span (wrapped in place, so inline markup like
 * links/emphasis is preserved), while atomic inline elements reveal whole.
 */
function collectTokens(node: Node, tokens: HTMLElement[]) {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.nodeValue ?? '';
      // Leave pure-whitespace nodes untouched so spacing/wrapping stays natural.
      if (!text.trim() || !child.parentNode) {
        continue;
      }

      const fragment = document.createDocumentFragment();

      for (const part of text.split(/(\s+)/)) {
        if (!part) {
          continue;
        }

        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          continue;
        }

        const span = document.createElement('span');
        span.className = 'md-word';
        span.textContent = part;
        fragment.appendChild(span);
        tokens.push(span);
      }

      child.parentNode.replaceChild(fragment, child);
      continue;
    }

    if (child.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    const element = child as HTMLElement;

    if (ATOMIC_INLINE.has(element.tagName)) {
      element.classList.add('md-word');
      tokens.push(element);
    } else {
      collectTokens(element, tokens);
    }
  }
}

/** Wraps a block into reveal tokens, then groups them by visual line. */
function splitIntoLines(block: HTMLElement, ctx: RevealContext) {
  const words: HTMLElement[] = [];

  // Native list markers can't be opacity-animated, so we suppress them (CSS) and
  // inject our own marker as the li's first token — it reveals with the first
  // line. CSS fills its glyph (bullet/number) via ::before.
  if (block.tagName === 'LI') {
    const marker = document.createElement('span');
    marker.className = 'md-word md-marker';
    marker.setAttribute('aria-hidden', 'true');
    block.insertBefore(marker, block.firstChild);
    words.push(marker);
  }

  collectTokens(block, words);

  if (!words.length) {
    return;
  }

  // A new visual line begins when a word sits more than half a line-height below
  // the current line's top — small baseline shifts (inline code, sup/sub) don't
  // count. offsetTop is a layout value, so the reveal transform doesn't skew it.
  const computed = getComputedStyle(block);
  const parsedLineHeight = parseFloat(computed.lineHeight);
  const lineHeight = Number.isNaN(parsedLineHeight) ? words[0].offsetHeight || 20 : parsedLineHeight;
  const threshold = lineHeight * 0.5;

  let lineTop: number | null = null;

  for (const word of words) {
    const top = word.offsetTop;

    if (lineTop === null || top > lineTop + threshold) {
      ctx.line += 1;
      lineTop = top;
    }

    word.style.setProperty('--line-index', String(cap(ctx.line)));
  }
}

function process(element: HTMLElement, ctx: RevealContext) {
  if (WHOLE_BLOCK.has(element.tagName)) {
    revealWholeBlock(element, ctx);
    return;
  }

  if (hasBlockChildren(element)) {
    for (const child of Array.from(element.children)) {
      process(child as HTMLElement, ctx);
    }
    return;
  }

  if (element.textContent && element.textContent.trim()) {
    splitIntoLines(element, ctx);
  } else {
    // No text (e.g. a paragraph that only holds an image) — reveal in one go.
    revealWholeBlock(element, ctx);
  }
}

/**
 * Splits the article's blocks into per-line word spans tagged for CSS reveal.
 * Returns the number of distinct reveal lines (for downstream timing).
 */
export function applyMarkdownLineReveal(root: HTMLElement): number {
  const ctx: RevealContext = { line: -1 };

  for (const child of Array.from(root.children)) {
    process(child as HTMLElement, ctx);
  }

  return ctx.line + 1;
}
