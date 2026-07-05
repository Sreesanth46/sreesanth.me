<script setup lang="ts">
import { motion } from 'motion-v';
import {
  activeBlogSlug,
  blogSharedElementExit,
  blogTitleLayoutId,
  blogTitleLayoutTransition,
} from '~/utils/blog-layout';

const {
  name,
  title,
  morph = true,
} = defineProps<{
  name: string;
  date: string;
  readTime: string;
  title: string;
  /**
   * Rows that always share layout with the post header (the blogs index).
   * Pass false for rows shown alongside a header with its own layout-ids
   * (the related-posts section) — they stay inert until clicked, otherwise
   * every row would morph against the exiting page.
   */
  morph?: boolean;
}>();

const prefersReducedMotion = usePreferredReducedMotion();
const layoutId = computed(() =>
  prefersReducedMotion.value === 'reduce' || (!morph && name !== activeBlogSlug.value)
    ? undefined
    : blogTitleLayoutId(name),
);

// motion-v registers layout-ids on mount, so arming happens before the
// navigation starts and the :key below remounts the spans with the id live.
function markActive() {
  activeBlogSlug.value = name;
}
</script>

<template>
  <router-link
    :to="`/blogs/${name}`"
    @click="markActive"
    class="capitalize no-underline text-black dark:text-white text-opacity-65 dark:text-opacity-65 hover:text-opacity-100 dark:hover:text-opacity-100 transition-all duration-200"
  >
    <li class="flex flex-col md:flex-row md:gap-4 md:items-center my-0 text-lg font-normal">
      <motion.span
        :key="layoutId ?? 'static'"
        :layout-id="layoutId"
        :exit="layoutId ? blogSharedElementExit : undefined"
        class="inline-block"
        :transition="blogTitleLayoutTransition"
      >
        {{ title }}
      </motion.span>
      <BlogPublishedOn
        :key="layoutId ?? 'static'"
        :layout-name="layoutId ? name : undefined"
        :date="date"
        :read-time="readTime"
        class="opacity-70 text-sm my-0 normal-case"
      />
    </li>
  </router-link>
</template>
