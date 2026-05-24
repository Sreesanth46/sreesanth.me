<script setup lang="ts">
import { useBlog } from '~/contexts/blogs-context';
import { blogChromeExit } from '~/utils/blog-layout';

const blog = useBlog();

const title = computed(() => blog.title);

useTitle(title);
</script>

<template>
  <div>
    <BlogTitle v-bind="blog" />
    <motion.div :exit="blogChromeExit">
      <BlogContent :url="blog.url" />
    </motion.div>
  </div>
</template>
