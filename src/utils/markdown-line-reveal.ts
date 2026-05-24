const LINE_BLOCK_SELECTOR = 'p, h1, h2, h3, h4, h5, h6, blockquote, li, pre';

/** Keeps pre/shiki chrome in sync with the line reveal delay. */
function tagRevealHost(element: HTMLElement) {
  if (element.tagName !== 'PRE') {
    return;
  }

  element.classList.add('md-line-reveal-host');
}

function canSplitLines(element: HTMLElement) {
  if (element.tagName === 'PRE') {
    return false;
  }

  if (element.querySelector('pre, img, table, ul, ol')) {
    return false;
  }

  return Boolean(element.textContent?.trim());
}

function wrapAsSingleLine(element: HTMLElement, lineIndex: number) {
  if (element.dataset.lineReveal === 'true') {
    return lineIndex + 1;
  }

  element.dataset.lineReveal = 'true';
  tagRevealHost(element);

  const line = document.createElement('div');
  line.className = 'md-line';
  line.style.setProperty('--line-index', String(lineIndex));

  const inner = document.createElement('div');
  inner.className = 'md-line__inner';

  while (element.firstChild) {
    inner.appendChild(element.firstChild);
  }

  line.appendChild(inner);
  element.appendChild(line);

  return lineIndex + 1;
}

function splitIntoLines(element: HTMLElement, startIndex: number) {
  if (element.dataset.lineReveal === 'true') {
    return startIndex;
  }

  const text = element.textContent ?? '';
  if (!text.trim()) {
    return startIndex;
  }

  element.dataset.lineReveal = 'true';
  tagRevealHost(element);
  element.textContent = '';

  const tokens = text.split(/(\s+)/).filter((token) => token.length > 0);
  const wordSpans: HTMLSpanElement[] = [];

  for (const token of tokens) {
    const span = document.createElement('span');
    span.style.display = 'inline';
    span.textContent = token;
    element.appendChild(span);
    wordSpans.push(span);
  }

  const lineGroups: HTMLSpanElement[][] = [];
  let currentLine: HTMLSpanElement[] = [];
  let lastTop: number | null = null;

  for (const span of wordSpans) {
    const top = span.offsetTop;

    if (lastTop !== null && top > lastTop) {
      lineGroups.push(currentLine);
      currentLine = [];
    }

    currentLine.push(span);
    lastTop = top;
  }

  if (currentLine.length > 0) {
    lineGroups.push(currentLine);
  }

  element.textContent = '';

  let lineIndex = startIndex;

  for (const group of lineGroups) {
    const line = document.createElement('div');
    line.className = 'md-line';
    line.style.setProperty('--line-index', String(lineIndex));

    const inner = document.createElement('div');
    inner.className = 'md-line__inner';

    for (const span of group) {
      inner.appendChild(span);
    }

    line.appendChild(inner);
    element.appendChild(line);
    lineIndex += 1;
  }

  return lineIndex;
}

/** Splits markdown article blocks into measured lines and tags them for CSS reveal. */
export function applyMarkdownLineReveal(root: HTMLElement) {
  const blocks = root.querySelectorAll<HTMLElement>(LINE_BLOCK_SELECTOR);

  let lineIndex = 0;

  for (const block of blocks) {
    if (block.tagName !== 'PRE' && block.closest('pre')) {
      continue;
    }

    if (block.tagName === 'BLOCKQUOTE' && block.querySelector('p, li')) {
      continue;
    }

    if (canSplitLines(block)) {
      lineIndex = splitIntoLines(block, lineIndex);
    } else {
      lineIndex = wrapAsSingleLine(block, lineIndex);
    }
  }

  return lineIndex;
}
