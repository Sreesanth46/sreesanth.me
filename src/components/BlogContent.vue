<script setup lang="ts">
const { url } = defineProps<{
  url: string;
}>();

const emit = defineEmits<{ revealed: [] }>();

const { data: rawPost, isFetching } = useFetch(url).text();

const srcBaseUrl = computed(() => {
  return url.split('/').slice(0, -1).join('/');
});

const content = computed(() => rawPost.value ?? '');
</script>

<template>
  <AppLoader v-if="isFetching" />
  <Markdown v-else :key="url" :src-base-url :content @revealed="emit('revealed')" />
</template>
