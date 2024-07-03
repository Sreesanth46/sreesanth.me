<script setup lang="ts">
import { Experience } from "~/types";

defineProps<Experience>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>
      <p class="flex gap-2">
        <strong
          class="underline decoration-stone-400 dark:decoration-slate-300 decoration-dashed"
        >
          <a href="#"> {{ employer }} </a>
        </strong>
        <span class="text-gray-500 dark:text-gray-300">{{ title }}</span>
      </p>
      <p class="text-gray-600 dark:text-gray-400 font-light">
        {{ `${startDate} - ${endDate ? endDate : "Present"}` }}
      </p>
    </div>
    <ul class="pl-8 list-[circle]">
      <li v-for="whatIDid in summary" :key="whatIDid">
        {{ whatIDid }}
      </li>
    </ul>
  </div>
</template>
