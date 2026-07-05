<script setup lang="ts">
import { motion } from 'motion-v';
import type { BlogTitleProps } from '~/types';
import {
  blogTitleLayoutId,
  blogTitleLayoutTransition,
  blogChromeExit,
  blogSharedElementExit,
} from '~/utils/blog-layout';

const props = defineProps<BlogTitleProps>();

const prefersReducedMotion = usePreferredReducedMotion();
const layoutId = computed(() =>
  prefersReducedMotion.value === 'reduce' ? undefined : blogTitleLayoutId(props.name)
);
</script>

<template>
  <motion.div
    :exit="blogChromeExit"
    class="prose-sm sm:prose lg:prose-lg dark:prose-invert prose-p:text-gray-500/80 prose-p:dark:text-gray-100/80 mb-6"
  >
    <motion.h1
      v-if="props.title"
      :layout-id="layoutId"
      :exit="layoutId ? blogSharedElementExit : undefined"
      class="mb-2 lg:mb-0"
      :transition="blogTitleLayoutTransition"
    >
      {{ props.title }}
    </motion.h1>
    <div class="flex flex-wrap items-baseline gap-x-1.5">
      <BlogPublishedOn :layout-name="props.name" :date="props.date" :read-time="props.readTime" />
      <BlogTags v-if="props.tags?.length" :tags="props.tags" />
    </div>
  </motion.div>
</template>
