<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import type { BlogData } from "~/types";
import { useMarkDown } from "~/hooks";
import { matter } from "~/utils/matter";
import BlogTitle from "~/components/BlogsTitle.vue";
import { useTitle } from "@vueuse/core";
import { computed } from "vue";

const { markdown } = defineProps<{
  markdown: string;
}>();
const readTime = inject("readTime", "5min");
const render = ref<string>("");
const blogData = ref<BlogData>();
const md = await useMarkDown();

async function downloadFile(downloadUrl: string) {
  try {
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`Failed to download file. Status: ${response.status}`);
    }

    const text = await response.text();
    const { data, content } = matter(text);
    blogData.value = data;
    render.value = md.render(content);
  } catch (error) {
    console.error("Error downloading file content:", error);
  }
}

onMounted(async () => {
  if (markdown.startsWith("http")) {
    downloadFile(markdown);
  } else {
    render.value = md.render(markdown);
  }
});

const title = computed(() => blogData.value?.title);
useTitle(title);
</script>

<template>
  <div>
    <BlogTitle v-if="render.length" :read-time="readTime" v-bind="blogData" />
    <article
      v-html="render"
      class="prose dark:prose-invert prose-p:text-gray-500/80 prose-p:dark:text-gray-100/80 lg:prose-lg"
    />
  </div>
</template>

<style>
pre {
  background-color: transparent !important;
}
</style>
