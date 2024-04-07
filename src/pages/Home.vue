<script setup lang="ts">
import FindMe from '~/components/FindMe.vue';
import {
  NodeSkillIcon,
  DjangoSkillIcon,
  VueSkillIcon,
  NextSkillIcon,
  ReactSkillIcon
} from '~/icons';
import { FindMeLinks } from '~/globals';

const Frameworks = [
  {
    label: 'Node.js',
    icon: NodeSkillIcon
  },
  {
    label: 'Python Django',
    icon: DjangoSkillIcon
  },
  {
    label: 'Vue.js',
    icon: VueSkillIcon
  },
  {
    label: 'Next.js',
    icon: NextSkillIcon
  },
  {
    label: 'React',
    icon: ReactSkillIcon
  }
];
</script>

<template>
  <div class="sm:m-auto max-w-[75ch]">
    <article class="prose dark:prose-invert lg:prose-lg">
      <h1 class="mb-0 text-4xl font-bold">Sreesanth</h1>
      <p>Hey, I am Sreesanth, a Full-Stack Developer | open sourceror</p>
      <p class="mb-0">
        Detail-oriented Full-Stack Developer with expertise developing and
        deploying complete web applications with technologies like
        <span class="flex flex-wrap not-prose">
          <div
            class="flex items-center pr-3"
            v-for="({ label, icon }, i) in Frameworks"
            :key="label">
            <p class="mr-1">{{ label }}</p>
            <component :is="icon" />
            <span v-if="Frameworks.length - 1 !== i">&#65104;</span>
          </div>
        </span>
      </p>

      <p>
        Dreaming up ideas and making them come true is where my passion lies. I
        excel in roles that require versatility, whether it's leading
        collaborative planning sessions, designing scalable backend
        architectures for growth, or coding intuitive and responsive frontend.
      </p>
      <p>Outside coding, I enjoy doing photography and traveling.</p>
      <hr
        class="w-24 m-auto my-10 border-[#7d7d7d4d] dark:border-[#e9e9e94d]" />
    </article>

    <div class="flex flex-col gap-2 mt-10">
      <p>Find me on</p>
      <div class="flex gap-4">
        <find-me
          v-for="me in FindMeLinks"
          :key="me.link"
          :label="me.label"
          :link="me.link">
          <component :is="me.icons.outlined" />
        </find-me>
      </div>
    </div>
  </div>
</template>
