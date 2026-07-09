import { ref } from 'vue';

/**
 * Slug taking part in the in-flight page transition (set on navigation).
 * Only this post's title/meta get layout-ids — otherwise a post appearing in
 * both trees (e.g. in the exiting header and the entering related list)
 * morphs when it should simply fade.
 */
export const activeBlogSlug = ref<string>();

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

/**
 * Exit for elements carrying a layout-id. motion-v drops the exit-complete
 * signal (without retrying) if a projection animation is still running when
 * the exit resolves — leaving the old page mounted forever. Outlasting the
 * 0.45s morph sidesteps that. Invisible in practice: ancestors fade to 0
 * within 0.12s.
 */
export const blogSharedElementExit = {
  opacity: 0,
  transition: { duration: 0.55 },
} as const;

/** Tags cascade in one after another, left to right, once the
    title/meta layout morph (0.45s) has settled. */
export const blogTagEnterInitial = { opacity: 0, x: -6 } as const;

export function blogTagEnter(index: number) {
  return {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, delay: 0.45 + index * 0.12 },
  };
}

export const blogChromeExit = {
  opacity: 0,
  transition: { duration: 0.12 },
} as const;

/* Article line-reveal timing (ms). Single source of truth — the CSS pulls these
   in as custom properties, and Markdown derives the total reveal duration from
   them so downstream chrome can wait without relying on animation events. */

/** Stagger start for article lines — after the title/meta layout animation. */
export const blogLineRevealBaseDelayMs = 200;

/** Gap between consecutive block reveals. */
export const blogLineRevealStaggerMs = 90;

/** Per-block fade/slide duration. Kept short so blocks snap in crisply rather
    than drifting — the deliberate pacing comes from the stagger, not this. */
export const blogLineRevealDurationMs = 420;

/** Lines past this position share the final delay, so long posts don't accrue an
    ever-growing reveal (and the related list doesn't wait forever). */
export const blogLineRevealMaxIndex = 12;

export const blogLineRevealBaseDelay = `${blogLineRevealBaseDelayMs}ms`;
export const blogLineRevealStagger = `${blogLineRevealStaggerMs}ms`;
export const blogLineRevealDuration = `${blogLineRevealDurationMs}ms`;

/** Total time from mount until the last line has finished revealing. */
export function blogLineRevealTotalMs(lineCount: number) {
  const lastIndex = Math.min(Math.max(lineCount - 1, 0), blogLineRevealMaxIndex);
  return blogLineRevealBaseDelayMs + lastIndex * blogLineRevealStaggerMs + blogLineRevealDurationMs;
}
