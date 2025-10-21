<script setup lang="ts">
import { inject } from 'vue';
import type { BlogData } from '~/types';
import { useMarkDown } from '~/hooks';
import { matter } from '~/utils/matter';
import BlogTitle from '~/components/BlogsTitle.vue';
import { useFetch, useTitle } from '@vueuse/core';
import { computed } from 'vue';

const { markdownUrl } = defineProps<{
  markdownUrl: string;
}>();

const readTime = inject('readTime', '5min');
const md = useMarkDown();

const { data: downloaded } = useFetch<string>(markdownUrl);

const baseUrl = computed(() => {
  return markdownUrl.split('/').slice(0, -1).join('/');
});

const m = computed(() => {
  const { data, content } = matter(downloaded.value ?? '');
  return { data, content };
});

const blogData = computed(() => m.value.data as BlogData);

const render = computed(() => {
  const html = md.render(m.value.content);
  return html.replace(/src="([^"]+)"/g, (_, src) => {
    const cleanSrc = src.replace(/^\.?\//, '');
    return `src="${baseUrl.value}/${cleanSrc}"`;
  });
});

const title = computed(() => blogData.value?.title);

useTitle(title);
</script>

<template>
  <div>
    <BlogTitle v-if="render.length" :read-time="readTime" v-bind="blogData" />
    <article
      v-html="render"
      class="prose dark:prose-invert prose-p:text-gray-500/80 prose-p:dark:text-gray-100/80 lg:prose-lg" />
  </div>
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
