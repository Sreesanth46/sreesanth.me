<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  to: string;
}>();

const isExternalLink = computed(() => props.to.startsWith('http'));
</script>

<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="to"
    target="_blank"
    class="hover:text-gray-800 hover:dark:text-gray-50">
    <slot />
  </a>
  <RouterLink
    v-else
    :to="{ name: to }"
    class="hover:text-gray-800 hover:dark:text-gray-50">
    <slot />
  </RouterLink>
</template>
