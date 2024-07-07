<script setup lang="ts">
import { computed } from "vue";
import type { BlogTitleProps } from "~/types";
import { monthWithDay } from "~/utils/date-utils";

const props = defineProps<BlogTitleProps>();
const now = new Date();

const isPropsEmpty = computed(() => {
  return Object.values(props).every((p) => !p);
});

const displayDate = computed(() => {
  const publishedAt = new Date(props.date as string);
  const { year, dayWithMonth } = monthWithDay(publishedAt);

  const isSameYear = now.getFullYear() === year;
  return `${dayWithMonth}${isSameYear ? "" : `, ${year}`}`;
});
</script>

<template>
  <div
    v-if="!isPropsEmpty"
    class="prose dark:prose-invert prose-p:text-gray-500/80 prose-p:dark:text-gray-100/80 lg:prose-lg mb-6"
  >
    <h1 v-if="title" class="mb-2">
      {{ title }}
    </h1>
    <p v-if="date" class="mt-2 opacity-50">
      {{ displayDate }} <span>&middot; {{ readTime }}</span>
    </p>
  </div>
</template>
