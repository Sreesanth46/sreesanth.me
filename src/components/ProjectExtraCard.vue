 <script setup lang="ts">
import Github from '~/icons/Github.vue';
import RightArrowOutlined from '~/icons/RightArrowOutlined.vue';
defineProps({
  title: { type: String, required: true },
  link: { type: String, required: false },
  descriptions: { type: String, required: false },
});
</script>

<template>
  <div
    class="item relative flex items-center rounded-md gap-2 p-2 hover:bg-gray-100 hover:text-gray-950">
    <div class="flex-auto">
      <p class="flex gap-2 items-center">
          <p class="text-normal font-semibold">{{ title }}</p>
            <a 
            class="flex gap-1 items-center" 
            v-if="link"
            :href="link"
            target="_blank"
            >
                <Github class="h-3 w-3" />
                <RightArrowOutlined />
            </a>
      </p>
      <p class="desc text-sm opacity-50 font-normal">{{descriptions}}</p>
    </div>
  </div>
</template>
