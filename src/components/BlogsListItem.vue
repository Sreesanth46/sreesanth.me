<script setup lang="ts">
import { motion } from 'motion-v';
import { blogTitleLayoutId, blogTitleLayoutTransition } from '~/utils/blog-layout';

const { name, title } = defineProps<{
  name: string;
  date: string;
  readTime: string;
  title: string;
}>();

const prefersReducedMotion = usePreferredReducedMotion();
const layoutId = computed(() =>
  prefersReducedMotion.value === 'reduce' ? undefined : blogTitleLayoutId(name)
);
</script>

<template>
  <router-link
    :to="`blogs/${name}`"
    class="capitalize no-underline text-black dark:text-white text-opacity-65 dark:text-opacity-65 hover:text-opacity-100 dark:hover:text-opacity-100 transition-all duration-200"
  >
    <li class="flex flex-col md:flex-row md:gap-4 md:items-center my-0 text-lg font-normal">
      <motion.span
        :layout-id="layoutId"
        class="inline-block"
        :transition="blogTitleLayoutTransition"
      >
        {{ title }}
      </motion.span>
      <BlogPublishedOn
        :layout-name="name"
        :date="date"
        :read-time="readTime"
        class="opacity-70 text-sm my-0 normal-case"
      />
    </li>
  </router-link>
</template>
