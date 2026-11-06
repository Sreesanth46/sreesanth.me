<route lang="yaml">
props: true
</route>

<script lang="ts">
import { Blog } from '~/types';

export const [useBlog, provideBlogContext] = createContext<Blog>('BlogPage');
</script>

<script setup lang="ts">
const { slug } = defineProps<{ slug: string }>();

const blog = computed(() => {
  return blogs.find((blog) => blog.name === slug);
});

if (!blog.value) {
  const router = useRouter();
  router.replace('/404');
} else {
  provideBlogContext(blog.value);
}
</script>

<template>
  <BlogPage v-if="blog" />
</template>
