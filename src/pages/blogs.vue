<script setup lang="ts">
definePage({
  meta: {
    title: 'Blogs | sh',
    description: 'Sreesanth - Software Engineer. View my blogs and articles.',
  },
});

const route = useRoute();

const isBlogsPage = computed(() => route.name === '/blogs');
</script>

<template>
  <div class="max-w-[75ch] m-auto">
    <blogs-list v-if="isBlogsPage">
      <BlogsListItem v-for="blog in blogs" :key="blog.name" v-bind="blog" />
    </blogs-list>

    <router-view></router-view>
  </div>
</template>
