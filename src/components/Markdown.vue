<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import type { BlogData } from "~/types";
import { useMarkDown } from "~/hooks";
import { matter } from "~/utils/matter";
import BlogTitle from "~/components/BlogsTitle.vue";
import { readTime } from "~/utils/read-time";

const { markdown } = defineProps<{
  markdown: string;
}>();

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

const blogReadTime = computed(() => {
  return readTime(render.value);
});
</script>

<template>
  <div>
    <BlogTitle :read-time="blogReadTime" v-bind="blogData" />
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
