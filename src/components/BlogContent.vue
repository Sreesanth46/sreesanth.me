<script setup lang="ts">
import type { Blog } from '~/types';

const { url } = defineProps<{
  url: string;
}>();

const { data: downloaded, isFetching } = useFetch<{
  matter: Blog;
  content: string;
}>(url, {
  afterFetch(ctx) {
    const { data, content } = matter(ctx.data ?? '');
    ctx.data = { matter: data, content };

    return ctx;
  },
});

const srcBaseUrl = computed(() => {
  return url.split('/').slice(0, -1).join('/');
});

const content = computed(() => downloaded.value?.content ?? '');
</script>

<template>
  <AppLoader v-if="isFetching" />
  <Markdown v-else :src-base-url :content />
</template>
