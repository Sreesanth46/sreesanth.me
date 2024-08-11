<script setup lang="ts">
import ProjectExtraCard from "~/components/ProjectExtraCard.vue";
import { FindMeLinks, ProjectList } from "~/globals";
import WorkExperienceCard from "~/components/WorkExperienceCard.vue";
import { h } from "vue";
import { Experiences } from ".";

const SectionTitle = h("h4", {
  class: "bg-black dark:bg-white w-max text-white dark:text-black px-1",
});
</script>

<template>
  <div class="md:w-[75ch] m-auto">
    <div class="flex flex-col md:flex-row gap-6 md:gap-12">
      <section class="mb-4 m-auto md:m-0">
        <div class="max-w-sm">
          <div class="flex flex-col items-center justify-center">
            <h3 class="font-medium text-3xl">Sreesanth</h3>
            <h5 class="text-md">Software Engineer</h5>
            <p class="font-extralight text-xs mt-3">sreesanth46@gmail.com</p>
            <div class="flex gap-2 mt-2 justify-center items-center">
              <component
                class="h-4 w-4 cursor-pointer"
                v-for="me in FindMeLinks"
                :is="me.icons.outlined"
                :key="me.label"
              />
            </div>
          </div>
        </div>
      </section>
      <section class="text-sm leading-6 flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <section-title> About </section-title>
          <p>
            My name is Sreesanth, a computer science engineering graduate. I
            work on full stack web development projects using various
            technologies, such as Node.js, Vue.js, Python Django, Next.js,
            TypeScript, and JavaScript. I have experience with microservice
            architecture and deploying applications on cloud platforms using
            Docker and Kubernetes. I also contribute to and build open source
            projects, demonstrating my passion and enthusiasm for web
            development.
          </p>
        </div>
        <div>
          <section-title class="mb-2"> Projects </section-title>
          <ProjectExtraCard
            v-for="project in ProjectList"
            :key="project.title"
            :title="project.title"
            :descriptions="project.description"
            :link="project.link"
          />
        </div>
        <div class="flex flex-col gap-4">
          <section-title> Work Experience </section-title>
          <WorkExperienceCard
            v-for="experience in Experiences"
            :key="experience.employer"
            :employer="experience.employer"
            :title="experience.title"
            :start-date="experience.startDate"
            :end-date="experience.endDate"
            :summary="experience.summary"
          />
        </div>
        <div class="flex flex-col gap-4">
          <section-title> Stacks </section-title>
          <div class="grid grid-cols-[max-content,auto] gap-3">
            <div><strong>Frontend</strong></div>
            <p>TypeScript, JavaScript, Vue, Next, React, Vite, Nuxt</p>
            <div><strong>Backend</strong></div>
            <p>Node, Python, MongoDB, MySQL, Supabase, Nginx, Docker</p>
            <div><strong>DevOps</strong></div>
            <p>AWS, Azure, DigitalOcean, Firebase</p>
            <div><strong>Languages</strong></div>
            <p>Python, JavaScript, Java</p>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <section-title> Awards </section-title>
          <div>
            <p><strong>Newbie 2023 Award</strong>, Innovature Labs</p>
            <p class="text-gray-500 font-light">Jan 2024</p>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <section-title> Languages </section-title>
          <div class="flex gap-2">
            <p><strong>English</strong> (Fluent),</p>
            <p><strong>Malayalam</strong> (Native)</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
