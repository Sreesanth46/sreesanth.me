<script setup lang="ts">
import { computed } from 'vue';
import { blogs } from '~/blogs';
import Markdown from './Markdown.vue';
const { slug } = defineProps<{ slug: string }>();

const blog = computed(() => {
  return blogs.find(blog => blog.name === slug);
});
</script>
<template>
  <Transition name="fade" mode="out-in">
    <Suspense>
      <component
        :is="Markdown"
        :markdown="
          blog?.url ??
          `
        <h4 class='text-center pt-6'>Oops! Not found</h4>
        `
        "></component>
    </Suspense>
  </Transition>
</template>
