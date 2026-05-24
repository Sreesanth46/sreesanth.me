export function blogTitleLayoutId(name: string) {
  return `blog-title-${name}`;
}

export function blogMetaLayoutId(name: string) {
  return `blog-meta-${name}`;
}

export const blogTitleLayoutTransition = {
  layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
} as const;

/** Fade for list, metadata, and article body — not the shared title. */
export const blogChromeInitial = { opacity: 0 } as const;

export const blogChromeAnimate = {
  opacity: 1,
  transition: { duration: 0.2 },
} as const;

export const blogChromeExit = {
  opacity: 0,
  transition: { duration: 0.12 },
} as const;

/** Stagger start for article lines — after the title/meta layout animation. */
export const blogLineRevealBaseDelay = '0.2s';

export const blogLineRevealStagger = '38ms';
