<script setup lang="ts">
import { LayoutGroup } from 'motion-v';

definePage({
  meta: {
    title: 'Blogs | sh',
    description: 'Sreesanth - Software Engineer. View my blogs and articles.',
  },
});

const route = useRoute();

watch(
  () => route.params,
  (params) => {
    const slug = 'slug' in params ? params.slug : undefined;
    activeBlogSlug.value = typeof slug === 'string' ? slug : undefined;
  },
  { immediate: true }
);
</script>

<template>
  <div class="max-w-[75ch] m-auto relative">
    <LayoutGroup id="blogs">
      <RouterView v-slot="{ Component, route }">
        <AnimatePresence mode="popLayout" :initial="false">
          <component :is="Component" v-if="Component" :key="route.path" />
        </AnimatePresence>
      </RouterView>
    </LayoutGroup>
  </div>
</template>
