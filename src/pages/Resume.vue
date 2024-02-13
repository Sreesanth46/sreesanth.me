<script setup lang="ts">
import ProjectExtraCard from '~/components/ProjectExtraCard.vue';
import { FindMeLinks, ProjectList } from '~/globals';
</script>

<template>
  <div class="flex flex-col gap-6">
    <section class="mb-4">
      <div class="max-w-sm">
        <div class="flex flex-col items-center justify-center">
          <h3 class="font-medium text-3xl">Sreesanth</h3>
          <h5 class="text-md">Software Engineer</h5>
          <p class="font-extralight text-xs mt-3">sreesanth46@gmail.com</p>
          <div class="flex gap-3 mt-2 justify-center items-center">
            <component
              class="h-3 w-3"
              v-for="me in FindMeLinks"
              :is="me.icons.outlined" />
          </div>
        </div>
      </div>
    </section>

    <section class="text-sm leading-6 flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <h4 class="bg-black w-max text-white px-1">About</h4>
        <p>
          My name is Sreesanth, a computer science engineering graduate. I work
          on full stack web development projects using various technologies,
          such as Node.js, Vue.js, Python Django, Next.js, TypeScript, and
          JavaScript. I have experience with microservice architecture and
          deploying applications on cloud platforms using Docker and Kubernetes.
          I also contribute to and build open source projects, demonstrating my
          passion and enthusiasm for web development.
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <h4 class="bg-black w-max text-white px-1">Projects</h4>
        <ProjectExtraCard
          v-for="project in ProjectList"
          :key="project.title"
          :title="project.title"
          :descriptions="project.description"
          :link="project.link" />
      </div>
    </section>
  </div>
</template>
