<script setup lang="ts">
defineProps<{
  name: string;
  date: string;
  readTime: string;
  title: string;
}>();
</script>

<template>
  <router-link
    :to="`blogs/${name}`"
    class="capitalize no-underline text-black dark:text-white text-opacity-65 dark:text-opacity-65 hover:text-opacity-100 dark:hover:text-opacity-100 transition-all duration-200"
  >
    <li class="flex flex-col md:flex-row md:gap-4 md:items-center my-0 text-lg font-normal">
      {{ title }}
      <BlogPublishedOn :date="date" :read-time="readTime" class="opacity-70 text-sm my-0" />
    </li>
  </router-link>
</template>
