<script setup lang="ts">
import { motion } from 'motion-v';
import type { BlogPublishedOnProps } from '~/types';
import { monthWithDay } from '~/utils/date-utils';
import {
  blogMetaLayoutId,
  blogSharedElementExit,
  blogTitleLayoutTransition,
} from '~/utils/blog-layout';

const props = defineProps<
  BlogPublishedOnProps & {
    /** Blog slug — enables shared layout transition with the list view. */
    layoutName?: string;
  }
>();

const prefersReducedMotion = usePreferredReducedMotion();
const layoutId = computed(() =>
  props.layoutName && prefersReducedMotion.value !== 'reduce'
    ? blogMetaLayoutId(props.layoutName)
    : undefined,
);

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
  <!-- Always the same motion element — an undefined layout-id is inert.
       Swapping element types mid-exit strands AnimatePresence's tracking. -->
  <motion.p
    :layout-id="layoutId"
    :exit="layoutId ? blogSharedElementExit : undefined"
    :title="ago"
    :transition="blogTitleLayoutTransition"
    class="mt-0 opacity-50 whitespace-nowrap inline-block"
  >
    {{ displayDate }} <span>&middot; {{ readTime }}</span>
  </motion.p>
</template>
