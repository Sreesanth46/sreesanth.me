<script setup lang="ts">
import { motion } from 'motion-v';
import { blogChromeExit, blogTagEnter, blogTagEnterInitial } from '~/utils/blog-layout';

const { tags } = defineProps<{ tags: readonly string[] }>();

const DraftTags = [
  'draft',
  'wip',
  'work in progress',
  'work-in-progress',
  'in progress',
  'in-progress',
];

function isDraft(tag: string) {
  return DraftTags.includes(tag.toLowerCase());
}
</script>

<template>
  <motion.span v-if="tags.length" :exit="blogChromeExit" class="inline-flex flex-wrap gap-x-1.5">
    <motion.span
      v-for="(tag, index) in tags"
      :key="tag"
      :initial="blogTagEnterInitial"
      :animate="blogTagEnter(index)"
      class="whitespace-nowrap"
      :class="isDraft(tag) ? 'text-amber-600 dark:text-amber-400 font-medium' : 'opacity-50'"
    >
      &middot; {{ tag }}
    </motion.span>
  </motion.span>
</template>
