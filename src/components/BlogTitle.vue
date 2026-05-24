<script setup lang="ts">
import { motion } from 'motion-v';
import type { BlogTitleProps } from '~/types';
import { blogTitleLayoutId, blogTitleLayoutTransition } from '~/utils/blog-layout';

const props = defineProps<BlogTitleProps>();

const prefersReducedMotion = usePreferredReducedMotion();
const layoutId = computed(() =>
  prefersReducedMotion.value === 'reduce' ? undefined : blogTitleLayoutId(props.name),
);
</script>

<template>
  <div
    class="prose-sm sm:prose lg:prose-lg dark:prose-invert prose-p:text-gray-500/80 prose-p:dark:text-gray-100/80 mb-6"
  >
    <motion.h1
      v-if="props.title"
      :layout-id="layoutId"
      class="mb-2 lg:mb-0"
      :transition="blogTitleLayoutTransition"
    >
      {{ props.title }}
    </motion.h1>
    <BlogPublishedOn
      :layout-name="props.name"
      :date="props.date"
      :read-time="props.readTime"
    />
  </div>
</template>
