/*
 * Client-side mermaid rendering for article bodies.
 *
 * The markdown renderer (composables/use-markdown) turns a ```mermaid fence into
 * an empty container carrying the diagram source in `data-mermaid`, rather than
 * sending it down the Shiki path. This module draws those containers.
 *
 * Keeping the source on the element (instead of consuming it) is what makes the
 * dark-mode re-draw possible: mermaid bakes theme colours into the SVG it emits,
 * so a theme change means re-rendering from source, not restyling the output.
 */

/** Container emitted for a ```mermaid fence. */
export const MERMAID_BLOCK_CLASS = 'mermaid-diagram';

/** Set once a container holds a drawn diagram, so re-draws can be told apart. */
const RENDERED_CLASS = 'mermaid-diagram-rendered';

const SOURCE_ATTR = 'data-mermaid';

type Mermaid = typeof import('mermaid').default;

let mermaidPromise: Promise<Mermaid> | undefined;

/**
 * Loaded on first use, not at module scope: mermaid is a large chunk, and most
 * posts have no diagrams. Cached so repeat navigations don't re-import.
 */
function loadMermaid() {
  mermaidPromise ??= import('mermaid').then((module) => module.default);
  return mermaidPromise;
}

/** Distinguishes concurrent renders — mermaid requires a unique id per diagram. */
let diagramId = 0;

/**
 * mermaid's own `theme` presets carry saturated defaults that fight the article's
 * muted palette, so both modes start from `base` and set only what we care about.
 * Colours are pulled from the same values the prose styles use.
 */
function themeVariables(dark: boolean) {
  return dark
    ? {
        background: '#0e0e0e',
        primaryColor: '#1e1e1e',
        primaryTextColor: '#dbd7caee',
        primaryBorderColor: '#4b4b4b',
        secondaryColor: '#262626',
        tertiaryColor: '#1a1a1a',
        lineColor: '#6b6b6b',
        textColor: '#dbd7caee',
        fontSize: '15px',
      }
    : {
        background: '#fafafa',
        primaryColor: '#f5f5f5',
        primaryTextColor: '#393a34',
        primaryBorderColor: '#c6c6c6',
        secondaryColor: '#ededed',
        tertiaryColor: '#f7f7f7',
        lineColor: '#9a9a9a',
        textColor: '#393a34',
        fontSize: '15px',
      };
}

function findContainers(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(`.${MERMAID_BLOCK_CLASS}[${SOURCE_ATTR}]`));
}

/**
 * Renders (or re-renders, on theme change) every mermaid container under `root`.
 * Resolves once all diagrams have settled, so callers can measure layout after.
 * A diagram that fails to parse falls back to its source text — never a blank gap.
 */
export async function renderMermaidDiagrams(root: HTMLElement, dark: boolean) {
  const containers = findContainers(root);

  if (!containers.length) {
    return;
  }

  let mermaid: Mermaid;

  try {
    mermaid = await loadMermaid();
  } catch {
    // Chunk failed to load — leave the fallback text in place rather than throwing
    // into the caller's mount path.
    for (const container of containers) {
      showSourceFallback(container);
    }
    return;
  }

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    themeVariables: themeVariables(dark),
  });

  await Promise.all(
    containers.map(async (container) => {
      const source = container.getAttribute(SOURCE_ATTR);

      if (!source?.trim()) {
        return;
      }

      diagramId += 1;

      try {
        const { svg, bindFunctions } = await mermaid.render(`mermaid-${diagramId}`, source);
        container.innerHTML = svg;
        // Wires up interactive diagram features (click handlers on nodes).
        bindFunctions?.(container);
        container.classList.add(RENDERED_CLASS);
      } catch {
        showSourceFallback(container);
      }
    })
  );
}

/**
 * A malformed diagram shows its source instead. mermaid also appends a stray
 * error <svg> to <body> on parse failure, which we clear so a broken diagram
 * doesn't leave a bomb graphic floating at the end of the page.
 */
function showSourceFallback(container: HTMLElement) {
  const source = container.getAttribute(SOURCE_ATTR) ?? '';

  container.classList.remove(RENDERED_CLASS);
  container.textContent = '';

  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = source;
  pre.appendChild(code);
  container.appendChild(pre);

  document.querySelectorAll('body > svg[id^="mermaid-"]').forEach((node) => node.remove());
  document.querySelectorAll('body > div[id^="dmermaid-"]').forEach((node) => node.remove());
}
