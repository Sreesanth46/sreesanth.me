<script setup lang="ts">
import MoonOutlined from '~/icons/MoonOutlined.vue';
import SunOutlined from '~/icons/SunOutlined.vue';
import { toggleDark } from '~/logics';
</script>

<template>
  <div @click="toggleDark">
    <MoonOutlined
      class="hidden dark:block hover:text-gray-800 hover:dark:text-gray-50" />
    <SunOutlined
      class="dark:hidden hover:text-gray-800 hover:dark:text-gray-50" />
  </div>
</template>
