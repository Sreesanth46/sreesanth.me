<script setup lang="ts">
import Github from '~/icons/Github.vue';
import RightArrowOutlined from '~/icons/RightArrowOutlined.vue';
defineProps<{
  title: string;
  github?: string;
  live?: string;
  descriptions?: string;
}>();
</script>

<template>
  <div
    class="relative flex items-center rounded-md gap-2 p-2 hover:bg-gray-100/70 dark:hover:bg-black/40 dark:text-gray-300 dark:hover:text-white hover:text-gray-950"
  >
    <div class="flex-auto">
      <div class="flex gap-2 items-center">
        <p class="text-normal font-semibold">{{ title }}</p>
        <a
          class="flex gap-1 items-center"
          v-if="github"
          :href="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github class="h-3 w-3" />
        </a>
        <a
          class="flex gap-1 items-center"
          v-if="live"
          :href="live"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RightArrowOutlined />
        </a>
      </div>
      <p class="desc text-sm opacity-50 font-normal">
        {{ descriptions }}
      </p>
    </div>
  </div>
</template>
