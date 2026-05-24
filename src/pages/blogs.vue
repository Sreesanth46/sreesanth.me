<script setup lang="ts">
import { LayoutGroup } from 'motion-v';

definePage({
  meta: {
    title: 'Blogs | sh',
    description: 'Sreesanth - Software Engineer. View my blogs and articles.',
  },
});
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
