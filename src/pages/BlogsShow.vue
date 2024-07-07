<script setup lang="ts">
import { computed, provide } from "vue";
import { blogs } from "~/blogs";
import Markdown from "~/components/Markdown.vue";
const { slug } = defineProps<{ slug: string }>();

const blog = computed(() => {
  return blogs.find((blog) => blog.name === slug);
});

provide("readTime", blog.value?.readTime);
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
        "
      ></component>
    </Suspense>
  </Transition>
</template>
