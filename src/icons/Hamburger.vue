<script setup lang="ts">
import type { IconProps } from './interface';
withDefaults(defineProps<IconProps>(), {
  size: 24,
  color: 'rgb(136, 136, 136)'
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24">
    <path
      fill="none"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</template>
