<script setup lang="ts">
import {
  NodeSkillIcon,
  DjangoSkillIcon,
  VueSkillIcon,
  NextSkillIcon,
  ReactSkillIcon
} from '~/icons';

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
    <div class="max-w-prose mb-8">
      <hi class="mb-0 text-4xl font-bold"> Sreesanth </hi>
    </div>
    <article>
      <div class="m-auto text-gray-700/70 flex flex-col gap-4">
        <p>Hey, I am Sreesanth, a Full-Stack Developer | open sourceror</p>

        <div>
          <p>
            Detail-oriented Full-Stack Developer with expertise developing and
            deploying complete web applications with technologies like
          </p>
          <div class="flex flex-wrap">
            <div
              class="flex items-center pr-3"
              v-for="({ label, icon }, i) in Frameworks"
              :key="label">
              <p class="mr-1">{{ label }}</p>
              <component :is="icon" />
              <span v-if="Frameworks.length - 1 !== i">&#65104;</span>
            </div>
          </div>
        </div>

        <p>
          Dreaming up ideas and making them come true is where my passion lies.
          I excel in roles that require versatility, whether it's leading
          collaborative planning sessions, designing scalable backend
          architectures for growth, or coding intuitive and responsive frontend.
        </p>
        <p>Outside coding, I enjoy doing photography and traveling.</p>
      </div>
      <hr class="w-24 m-auto my-10 border-[#7d7d7d4d]" />
    </article>
  </div>
</template>
