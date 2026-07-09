<script setup lang="ts">
import { useMarkDown } from '~/composables/use-markdown';
import { applyMarkdownLineReveal } from '~/utils/markdown-line-reveal';
import {
  blogLineRevealBaseDelay,
  blogLineRevealStagger,
  blogLineRevealDuration,
  blogLineRevealTotalMs,
} from '~/utils/blog-layout';

const { content, srcBaseUrl } = defineProps<{
  content: string;
  srcBaseUrl: string;
}>();

/** Fires once the last line has finished revealing (or immediately when there's
    nothing to animate) so downstream chrome can wait for the body. */
const emit = defineEmits<{ revealed: [] }>();

const md = useMarkDown();
const articleRef = ref<HTMLElement | null>(null);
const prefersReducedMotion = usePreferredReducedMotion();
// Article stays hidden until words are wrapped and lines measured — otherwise
// the full text flashes before it splits and hides for the reveal.
const ready = ref(false);
// True only once the line split has run (and markers injected) — gates the
// native-marker suppression so reduced-motion/empty renders keep their bullets.
const split = ref(false);
let revealTimer: ReturnType<typeof setTimeout> | undefined;

const render = computed(() => {
  const html = md.render(content ?? '');
  return html.replace(/src="([^"]+)"/g, (_, src) => {
    const cleanSrc = src.replace(/^\.?\//, '');
    return `src="${srcBaseUrl}/${cleanSrc}"`;
  });
});

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

async function reveal() {
  ready.value = false;
  split.value = false;
  const article = articleRef.value;

  if (!article?.childElementCount || prefersReducedMotion.value === 'reduce') {
    ready.value = true;
    emit('revealed');
    return;
  }

  // Line wrapping depends on font metrics, so measure once fonts have settled.
  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => {});
  }
  await nextTick();
  await waitForPaint();

  // The component may have unmounted while awaiting (navigation).
  if (articleRef.value !== article) {
    return;
  }

  const lineCount = applyMarkdownLineReveal(article);
  split.value = true;
  ready.value = true;

  // Signal completion off a deterministic timer rather than `animationend`, which
  // can silently never fire (cancelled animation, inactive tab, no rendered box).
  revealTimer = setTimeout(() => emit('revealed'), blogLineRevealTotalMs(lineCount));
}

onMounted(reveal);

onBeforeUnmount(() => {
  clearTimeout(revealTimer);
});
</script>

<template>
  <!-- key on content so navigating between posts replays the reveal -->
  <article
    ref="articleRef"
    :key="content"
    class="prose dark:prose-invert prose-p:text-gray-500/80 prose-p:dark:text-gray-100/80 lg:prose-lg md-lines"
    :class="{ 'md-lines-ready': ready, 'md-lines-split': split }"
    :style="{
      '--line-base-delay': blogLineRevealBaseDelay,
      '--line-stagger': blogLineRevealStagger,
      '--line-duration': blogLineRevealDuration,
    }"
    v-html="render"
  />
</template>

<style lang="css">
pre {
  position: relative;
  background-color: #fafafa !important;
}

.dark pre {
  background-color: #0e0e0e !important;
}

.prose code:not(pre code) {
  padding: 2px 4px;
  font-size: 90%;
  border-radius: 4px;

  cursor: pointer;
  user-select: all;

  background-color: #f5f5f5;
  color: #d6336c;
}

.dark code:not(pre code) {
  background-color: #1e1e1e;
  color: #ffcb6b;
}

code::before,
code::after {
  content: none !important;
}

li {
  white-space: normal;
  overflow-wrap: anywhere;
  word-wrap: break-word;
}

li code {
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: normal;
}

/*
 * Per-visual-line reveal. A JS pass (markdown-line-reveal) wraps each word in a
 * .md-word span in place — inline markup is untouched — and tags each word with
 * a --line-index for its wrapped line. Blocks that aren't split into lines
 * (code, images, tables) get .md-reveal and animate as one unit. Both share the
 * same fade/slide keyed off --line-index. The article is hidden until the split
 * runs so the un-split text never flashes.
 */
.md-lines:not(.md-lines-ready) {
  visibility: hidden;
}

.md-word,
.md-reveal {
  opacity: 0;
  transform: translateY(0.5em);
  animation: md-line-in var(--line-duration, 0.42s) cubic-bezier(0.33, 1, 0.68, 1) both;
  animation-delay: calc(var(--line-base-delay, 0.2s) + var(--line-index, 0) * var(--line-stagger, 90ms));
}

/* Words must be inline-block for translateY; long words still wrap. */
.md-word {
  display: inline-block;
  overflow-wrap: anywhere;
}

/*
 * Native list markers paint immediately and can't fade (opacity isn't allowed on
 * ::marker), so drop them and draw our own on the injected .md-marker token,
 * which reveals with the item's first line.
 */
.md-lines-split :is(ul, ol) {
  list-style: none;
}

.md-lines-split ol {
  counter-reset: md-ol;
}

.md-lines-split ol > li {
  counter-increment: md-ol;
}

.md-marker {
  margin-right: 0.4em;
  overflow-wrap: normal;
}

.md-lines-split ul > li > .md-marker::before {
  content: '•';
}

.md-lines-split ul ul > li > .md-marker::before {
  content: '◦';
}

.md-lines-split ol > li > .md-marker::before {
  content: counter(md-ol) '.';
}

@keyframes md-line-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .md-lines {
    visibility: visible;
  }

  .md-word,
  .md-reveal {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
