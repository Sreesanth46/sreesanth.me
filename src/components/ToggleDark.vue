<script setup lang="ts">
import { toggleDark } from '~/logics';
</script>

<template>
  <div @click="toggleDark">
    <MoonOutlined class="hidden dark:block hover:text-fg-strong" />
    <SunOutlined class="dark:hidden hover:text-fg-strong" />
  </div>
</template>
