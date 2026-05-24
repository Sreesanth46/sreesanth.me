<script setup lang="ts">
import { motion } from 'motion-v';
import { blogChromeAnimate, blogChromeExit, blogChromeInitial } from '~/utils/blog-layout';
</script>

<template>
  <motion.div :initial="blogChromeInitial" :animate="blogChromeAnimate" :exit="blogChromeExit">
    <blogs-list>
      <BlogsListItem v-for="blog in blogs" :key="blog.name" v-bind="blog" />
    </blogs-list>
  </motion.div>
</template>
