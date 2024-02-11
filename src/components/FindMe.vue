<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  link: { type: String, required: false }
});
</script>

<template>
  <a :href="link" target="_blank" class="flex gap-1 underline">
    <slot></slot>
    <p>{{ label }}</p>
  </a>
</template>
