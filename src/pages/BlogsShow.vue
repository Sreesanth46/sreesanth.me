<script setup lang="ts">
import { computed, provide } from 'vue';
import { blogs } from '~/blogs';
import Markdown from '~/components/Markdown.vue';
const { slug } = defineProps<{ slug: string }>();

const blog = computed(() => {
  return blogs.find(blog => blog.name === slug);
});

provide('readTime', blog.value?.readTime);
</script>
<template>
  <Transition name="fade" mode="out-in">
    <Suspense>
      <component :is="Markdown" :markdown="blog?.url ?? `Oops! Not found`" />
      <template #fallback>
        <div role="status" class="relative animate-pulse">
          <div
            class="h-8 max-w-96 bg-gray-200 rounded-md dark:bg-gray-900 mb-2" />
          <div class="h-8 w-56 bg-gray-200 rounded-md dark:bg-gray-900 mb-4" />
          <div class="h-4 bg-gray-200 rounded-md dark:bg-gray-900 w-48 mb-10" />

          <div
            class="h-6 bg-gray-200 rounded-md dark:bg-gray-900 mb-4"
            v-for="item in Array.from(Array(5).keys())"
            :key="item" />
          <span class="sr-only">Loading...</span>
        </div>
      </template>
    </Suspense>
  </Transition>
</template>
