<script setup lang="ts">
import { onMounted, ref } from 'vue';
import markdownit from 'markdown-it';
import Shiki from '@shikijs/markdown-it';

const { markdown } = defineProps<{
  markdown: string;
}>();

const md = markdownit({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

(async () => {
  md.use(
    await Shiki({
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      }
    })
  );
})();

const render = ref<string>('');

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
  <div v-html="render"></div>
</template>

<style>
h1 {
  display: block;
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h2 {
  display: block;
  font-size: 1.5em;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h3 {
  display: block;
  font-size: 1.17em;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h4 {
  display: block;
  margin-top: 1.33em;
  margin-bottom: 1.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h5 {
  display: block;
  font-size: 0.83em;
  margin-top: 1.67em;
  margin-bottom: 1.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h6 {
  display: block;
  font-size: 0.67em;
  margin-top: 2.33em;
  margin-bottom: 2.33em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}

code {
  overflow: auto;
  display: block;
  padding: 1.5rem;
}
</style>
