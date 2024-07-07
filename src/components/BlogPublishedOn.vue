<script setup lang="ts">
import { computed } from "vue";
import type { BlogPublishedOnProps } from "~/types";
import { monthWithDay } from "~/utils/date-utils";

const props = defineProps<BlogPublishedOnProps>();

const now = new Date();

const displayDate = computed(() => {
  const publishedAt = new Date(props.date as string);
  const { year, dayWithMonth } = monthWithDay(publishedAt);

  const isSameYear = now.getFullYear() === year;
  return `${dayWithMonth}${isSameYear ? "" : `, ${year}`}`;
});
</script>

<template>
  <p>
    {{ displayDate }} <span>&middot; {{ readTime }}</span>
  </p>
</template>
