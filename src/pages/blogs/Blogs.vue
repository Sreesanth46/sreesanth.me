<script setup lang="ts">
import { useRoute } from 'vue-router';
import { blogs } from '~/blogs';
const route = useRoute();

const prettyName = (name: string) => name.split('-').join(' ');
</script>

<template>
  <div class="max-w-[75ch] m-auto pt-4 md:p-6">
    <div v-if="route.name === 'Blogs'">
      <router-link
        :to="`blogs/${name}`"
        v-for="{ name } in blogs"
        :key="name"
        class="capitalize">
        {{ prettyName(name) }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
