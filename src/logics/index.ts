import { useDark } from '@vueuse/core';
import { nextTick } from 'vue';

export const isDark = useDark();

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
export function toggleDark(event: MouseEvent) {
  const isAppearanceTransition =
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value;
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  // Publish the origin before the snapshots exist, so CSS can pre-collapse the
  // incoming layer's clip-path. Without that, the frames between `ready` resolving
  // and this animation's first tick paint ::view-transition-new(root) unclipped —
  // a full flash of the destination colours before the wipe. See tailwind.css.
  const root = document.documentElement;
  root.style.setProperty('--vt-x', `${x}px`);
  root.style.setProperty('--vt-y', `${y}px`);

  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  });
  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    const animation = document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-out',
        fill: 'forwards',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
      }
    );

    // fill:forwards keeps this animation in effect forever — it stays attached to
    // documentElement and re-targets the *next* transition's pseudo-element, which
    // is a fresh snapshot it knows nothing about. A leftover old(root) collapse
    // clips the outgoing page away on frame one of the following dark -> light
    // toggle, exposing the already-updated page beneath the snapshots: the colours
    // change first and the wipe plays over them. Drop it once the pseudo tree is
    // gone, by which point fill:forwards has done its job.
    transition.finished.finally(() => animation.cancel());
  });
}
