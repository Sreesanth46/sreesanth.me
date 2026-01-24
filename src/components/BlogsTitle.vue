<script setup lang="ts">
import { computed } from 'vue';
import type { BlogTitleProps } from '~/types';
import BlogPublishedOn from '~/components/BlogPublishedOn.vue';

const props = defineProps<BlogTitleProps>();

const isPropsEmpty = computed(() => {
  return Object.values(props).every((p) => !p);
});
</script>

<template>
  <div
    v-if="!isPropsEmpty"
    class="prose-sm sm:prose lg:prose-lg dark:prose-invert prose-p:text-gray-500/80 prose-p:dark:text-gray-100/80 mb-6"
  >
    <h1 v-if="title" class="mb-2 lg:mb-0">
      {{ title }}
    </h1>
    <BlogPublishedOn :date="date" :read-time="readTime" class="mt-0 opacity-50" />
  </div>
</template>
