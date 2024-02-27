<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
import Plum from '~/components/Plum.vue';
</script>

<template>
  <div class="flex flex-col h-screen pb-2 px-6">
    <Plum />
    <Navbar />
    <main class="flex-auto py-10">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    <footer class="flex justify-center py-6">
      <p class="text-gray-600/30 dark:text-gray-100/30 text-xs">
        2023-PRESENT © Sreesanth
      </p>
    </footer>
  </div>
</template>
