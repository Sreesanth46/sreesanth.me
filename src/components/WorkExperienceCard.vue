<script setup lang="ts">
import type { Experience } from '~/types';

defineProps<Experience>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>
      <p class="flex gap-2">
        <strong class="underline decoration-fg-tertiary decoration-dashed">
          <a href="#"> {{ employer }} </a>
        </strong>
        <span class="text-fg-secondary">{{ title }}</span>
      </p>
      <p class="text-fg-tertiary font-light">
        {{ `${startDate} - ${endDate ? endDate : 'Present'}` }}
      </p>
    </div>
    <ul class="pl-8 list-[circle]">
      <li v-for="whatIDid in summary" :key="whatIDid">
        {{ whatIDid }}
      </li>
    </ul>
  </div>
</template>
