<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMarkDown } from '~/hooks';

const { markdown } = defineProps<{
  markdown: string;
}>();

const render = ref<string>('');
const md = await useMarkDown();

async function downloadFile(downloadUrl: string) {
  try {
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`Failed to download file. Status: ${response.status}`);
    }

    const content = await response.text();
    render.value = md.render(content);
  } catch (error) {
    console.error('Error downloading file content:', error);
  }
}

onMounted(async () => {
  if (markdown.startsWith('http')) {
    downloadFile(markdown);
  } else {
    render.value = md.render(markdown);
  }
});
</script>

<template>
  <article
    v-html="render"
    class="prose dark:prose-invert prose-p:text-gray-500/80 prose-p:dark:text-gray-100/80 lg:prose-lg" />
</template>

<style>
pre {
  background-color: transparent !important;
}
</style>
