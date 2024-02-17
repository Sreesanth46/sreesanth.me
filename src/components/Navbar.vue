<script setup lang="ts">
import ToggleDark from './ToggleDark.vue';
import AppLink from './AppLink.vue';
import { NavbarLinks } from '~/globals';
</script>

<template>
  <header
    class="h-12 flex items-center text-gray-700/70 dark:text-gray-200/70 pt-4 md:pt-6 md:px-4">
    <router-link :to="{ name: 'Home' }">
      <p
        class="text-2xl animate-pulse bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
        .sh
      </p>
    </router-link>
    <div class="flex-auto" />
    <div class="flex gap-6 sm:gap-5">
      <app-link
        v-for="link in NavbarLinks"
        :key="link.to"
        :to="link.to"
        :title="link.label">
        <component :is="link.icon" />
      </app-link>

      <ToggleDark />
    </div>
  </header>
</template>
