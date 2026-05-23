<script setup lang="ts">
definePage({
  meta: {
    title: 'Projects | sh',
    description: 'Sreesanth - Software Engineer. View my projects and skills.',
  },
});
</script>

<template>
  <div class="sm:m-auto max-w-[75ch]">
    <div class="flex flex-col">
      <project-card
        v-for="project in ProjectList"
        :key="project.title"
        :title="project.title"
        :link="project.github"
        :descriptions="project.description"
      >
        <template #icon>
          <component :is="project.icon" />
        </template>
      </project-card>
    </div>
  </div>
</template>
