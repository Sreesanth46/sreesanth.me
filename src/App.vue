<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
import Plum from '~/components/Plum.vue';
</script>

<template>
  <div class="flex flex-col h-screen pb-2 xs:px-4">
    <Plum />
    <Navbar />
    <div class="flex-auto"><router-view></router-view></div>
  </div>
</template>
