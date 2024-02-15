<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  link: { type: String, required: false },
  descriptions: { type: String, required: false }
});
</script>

<template>
  <a
    class="item relative flex items-center rounded-md gap-2 p-2 hover:bg-gray-100 hover:text-gray-700"
    target="_blank"
    :href="link"
    :title="title">
    <div class="flex justify-center items-center">
      <slot name="icon"></slot>
    </div>
    <div class="flex-auto">
      <p class="text-normal font-medium">{{ title }}</p>
      <p class="desc text-sm opacity-50 font-normal">
        {{ descriptions }}
      </p>
    </div>
  </a>
</template>
