<script setup lang="ts">
import { computed } from 'vue';
import type { BlogPublishedOnProps } from '~/types';
import { monthWithDay } from '~/utils/date-utils';

const props = defineProps<BlogPublishedOnProps>();

const now = new Date();

const displayDate = computed(() => {
  const publishedAt = new Date(props.date as string);
  const { year, dayWithMonth } = monthWithDay(publishedAt);

  const isSameYear = now.getFullYear() === year;
  return `${dayWithMonth}${isSameYear ? '' : `, ${year}`}`;
});

const ago = computed(() => {
  const publishedAt = new Date(props.date as string);
  const relativeTimeFormat = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
  });

  const Δms = publishedAt.getTime() - now.getTime();
  const Δd = Math.floor(Δms / (1000 * 60 * 60 * 24));
  return relativeTimeFormat.format(Δd, 'days');
});
</script>

<template>
  <p :title="ago">
    {{ displayDate }} <span>&middot; {{ readTime }}</span>
  </p>
</template>
