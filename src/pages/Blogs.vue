<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { blogs } from '~/blogs';
import BlogPublishedOn from '~/components/BlogPublishedOn.vue';
const route = useRoute();

const isBlogsPage = computed(() => route.name === 'Blogs');

const prettyName = (name: string) => name.split('-').join(' ');
</script>

<template>
  <div class="max-w-[75ch] m-auto">
    <ul v-if="isBlogsPage" class="flex flex-col gap-3 prose dark:prose-invert">
      <router-link
        :to="`blogs/${name}`"
        v-for="{ name, date, readTime } in blogs"
        :key="name"
        class="capitalize no-underline text-black dark:text-white text-opacity-65 dark:text-opacity-65 hover:text-opacity-100 dark:hover:text-opacity-100 transition-all duration-200"
      >
        <li class="flex flex-col md:flex-row md:gap-4 md:items-center my-0 text-lg font-normal">
          {{ prettyName(name) }}
          <BlogPublishedOn :date="date" :read-time="readTime" class="opacity-70 text-sm my-0" />
        </li>
      </router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>
