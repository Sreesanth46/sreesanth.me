<script setup lang="ts">
import { motion } from 'motion-v';
import { useBlog } from '~/contexts/blogs-context';
import { blogChromeExit, blogChromeInitial, blogContentAnimate } from '~/utils/blog-layout';

const blog = useBlog();

const title = computed(() => blog.title);

useTitle(title);
</script>

<template>
  <div>
    <BlogTitle v-bind="blog" />
    <motion.div :initial="blogChromeInitial" :animate="blogContentAnimate" :exit="blogChromeExit">
      <BlogContent :url="blog.url" />
    </motion.div>
  </div>
</template>
