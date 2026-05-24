<script setup lang="ts">
import { useMarkDown } from '~/composables/use-markdown';
import { htmlToMarkdownBlocks } from '~/utils/markdown-blocks';
import { applyMarkdownLineReveal } from '~/utils/markdown-line-reveal';
import { blogLineRevealBaseDelay, blogLineRevealStagger } from '~/utils/blog-layout';

const { content, srcBaseUrl } = defineProps<{
  content: string;
  srcBaseUrl: string;
}>();

const md = useMarkDown();
const articleRef = ref<HTMLElement | null>(null);
const prefersReducedMotion = usePreferredReducedMotion();
const revealed = ref(false);

const render = computed(() => {
  const html = md.render(content ?? '');
  return html.replace(/src="([^"]+)"/g, (_, src) => {
    const cleanSrc = src.replace(/^\.?\//, '');
    return `src="${srcBaseUrl}/${cleanSrc}"`;
  });
});

const blocks = computed(() => htmlToMarkdownBlocks(render.value));

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

async function revealLines() {
  revealed.value = false;
  await nextTick();
  await waitForPaint();

  const article = articleRef.value;
  if (!article) {
    return;
  }

  if (!blocks.value.length) {
    revealed.value = true;
    return;
  }

  if (prefersReducedMotion.value === 'reduce') {
    revealed.value = true;
    return;
  }

  applyMarkdownLineReveal(article);
  revealed.value = true;
}

watch(() => content, revealLines);

onMounted(revealLines);
</script>

<template>
  <article
    ref="articleRef"
    class="prose dark:prose-invert prose-p:text-gray-500/80 prose-p:dark:text-gray-100/80 lg:prose-lg md-lines"
    :class="{ 'md-lines-revealed': revealed }"
    :style="{
      '--line-base-delay': blogLineRevealBaseDelay,
      '--line-stagger': blogLineRevealStagger,
    }"
  >
    <div v-for="(block, index) in blocks" :key="index" class="md-block" v-html="block" />
  </article>
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

.md-lines:not(.md-lines-revealed) {
  visibility: hidden;
}

.md-lines.md-lines-revealed {
  visibility: visible;
}

/* Native markers paint before line text; bullets live inside the animated inner */
.md-lines :is(ul, ol) {
  list-style: none !important;
  padding-inline-start: 1.625em;
}

.md-lines ul > li > .md-line:first-child > .md-line__inner::before {
  content: '•\00a0';
}

.md-lines ul ul > li > .md-line:first-child > .md-line__inner::before {
  content: '◦\00a0';
}

.md-lines ol {
  counter-reset: md-ol;
}

.md-lines ol > li {
  counter-increment: md-ol;
}

.md-lines ol > li > .md-line:first-child > .md-line__inner::before {
  content: counter(md-ol) '.\00a0';
}

.md-line {
  display: block;
  overflow: hidden;
}

.md-line__inner {
  display: block;
  opacity: 0;
  transform: translateY(0.92em);
  animation: md-line-in 0.52s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(var(--line-base-delay, 0.2s) + var(--line-index, 0) * var(--line-stagger, 38ms));
  will-change: transform, opacity;
}

/* Shiki/pre chrome lives on the animated inner wrapper, not the shell */
.md-lines pre.md-line-reveal-host,
.md-lines pre.md-line-reveal-host.shiki {
  padding: 0;
  background: transparent !important;
  background-color: transparent !important;
}

.md-lines pre.md-line-reveal-host code,
.md-lines pre.md-line-reveal-host .shiki {
  background: transparent !important;
  background-color: transparent !important;
}

.md-lines pre.md-line-reveal-host .md-line__inner {
  padding: 1em;
  overflow-x: auto;
  border-radius: 0.375rem;
  background-color: #fafafa !important;
}

.dark .md-lines pre.md-line-reveal-host .md-line__inner {
  background-color: #0e0e0e !important;
}

@keyframes md-line-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .md-lines:not(.md-lines-revealed) {
    visibility: visible;
  }

  .md-line__inner {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
