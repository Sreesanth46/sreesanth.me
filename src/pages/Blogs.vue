<script setup lang="ts">
import { useRoute } from "vue-router";
import { blogs } from "~/blogs";
const route = useRoute();

const prettyName = (name: string) => name.split("-").join(" ");
</script>

<template>
  <div class="max-w-[75ch] m-auto">
    <div v-if="route.name === 'Blogs'" class="flex flex-col gap-2">
      <router-link
        :to="`blogs/${name}`"
        v-for="{ name } in blogs"
        :key="name"
        class="capitalize hover:text-lg hover:bg-slate-100/50 dark:hover:bg-black/40 p-2 rounded-sm"
      >
        {{ prettyName(name) }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
