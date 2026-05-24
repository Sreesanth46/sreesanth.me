<script setup lang="ts">
import { useBlog } from '~/contexts/blogs-context';

const blog = useBlog();

const title = computed(() => blog.title);

useTitle(title);
</script>

<template>
  <div>
    <BlogTitle v-bind="blog" />
    <BlogContent :url="blog.url" />
  </div>
</template>
