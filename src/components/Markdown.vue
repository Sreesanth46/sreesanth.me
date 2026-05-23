<script setup lang="ts">
import { useMarkDown } from '~/composables/use-markdown';

const { content, srcBaseUrl } = defineProps<{
  content: string;
  srcBaseUrl: string;
}>();

const md = useMarkDown();

const render = computed(() => {
  const html = md.render(content ?? '');
  return html.replace(/src="([^"]+)"/g, (_, src) => {
    const cleanSrc = src.replace(/^\.?\//, '');
    return `src="${srcBaseUrl}/${cleanSrc}"`;
  });
});
</script>

<template>
  <article
    v-html="render"
    class="prose dark:prose-invert prose-p:text-gray-500/80 prose-p:dark:text-gray-100/80 lg:prose-lg"
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

  /* Lets use select the whole code section */
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
</style>
