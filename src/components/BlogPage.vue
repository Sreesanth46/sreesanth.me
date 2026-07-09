<script setup lang="ts">
import { useBlog } from '~/contexts/blogs-context';
import { blogChromeInitial, blogChromeAnimate, blogChromeExit } from '~/utils/blog-layout';
import { relatedBlogs } from '~/utils/related-blogs';
import { motion } from 'motion-v';

const blog = useBlog();

const title = computed(() => blog.title);

useTitle(title);

const related = computed(() => relatedBlogs(blog, blogs));

const readNextLabel = computed(() =>
  related.value.similar ? 'Read something similar' : 'Keep reading',
);

// Hold the related list back until the article body has finished revealing.
const contentRevealed = ref(false);
watch(
  () => blog.url,
  () => {
    contentRevealed.value = false;
  },
);
</script>

<template>
  <div>
    <BlogTitle v-bind="blog" />
    <motion.div :exit="blogChromeExit">
      <BlogContent :url="blog.url" @revealed="contentRevealed = true" />
    </motion.div>
    <motion.div
      v-if="related.blogs.length && contentRevealed"
      :initial="blogChromeInitial"
      :animate="blogChromeAnimate"
      :exit="blogChromeExit"
      class="mt-16"
    >
      <p class="opacity-50 text-sm mb-3">{{ readNextLabel }}</p>
      <BlogsList>
        <BlogsListItem
          v-for="item in related.blogs"
          :key="item.name"
          :morph="false"
          :name="item.name"
          :date="item.date"
          :read-time="item.readTime"
          :title="item.title"
        />
      </BlogsList>
    </motion.div>
  </div>
</template>
