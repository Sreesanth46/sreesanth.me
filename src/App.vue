<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
import Plum from '~/components/Plum.vue';
</script>

<template>
  <div class="flex flex-col h-screen pb-2 px-6">
    <Plum />
    <Navbar />
    <div class="flex-auto pt-10"><router-view></router-view></div>
  </div>
</template>
