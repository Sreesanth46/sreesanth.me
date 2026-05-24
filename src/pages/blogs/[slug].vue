<route lang="yaml">
props: true
</route>

<script setup lang="ts">
import { provideBlogContext } from '~/contexts/blogs-context';

const { slug } = defineProps<{ slug: string }>();

const blog = computed(() => {
  return blogs.find((blog) => blog.name === slug);
});

if (!blog.value) {
  const router = useRouter();
  router.replace('/404');
}

provideBlogContext(blog.value!);
</script>

<template>
  <BlogPage v-if="blog" />
</template>
