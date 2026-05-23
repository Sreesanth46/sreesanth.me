<script setup lang="ts">
definePage({
  meta: {
    title: 'sh',
    description:
      'Sreesanth - Software Engineer. A passionate full-stack developer with expertise in Python Django | FastAPI, Node.js, Vue.js, Nuxt.js, Next.js, and React. Explore my projects, blogs, and find me on social media.',
  },
});

const Frameworks = [
  {
    label: 'Python Django',
    icon: resolveComponent('DjangoSkillIcon'),
  },
  {
    label: 'Node.js',
    icon: resolveComponent('NodeSkillIcon'),
  },
  {
    label: 'Vue.js',
    icon: resolveComponent('VueSkillIcon'),
  },
  {
    label: 'Next.js',
    icon: resolveComponent('NextSkillIcon'),
  },
  {
    label: 'React',
    icon: resolveComponent('ReactSkillIcon'),
  },
];
</script>

<template>
  <div class="sm:m-auto max-w-[75ch]">
    <article class="prose dark:prose-invert lg:prose-lg">
      <h1 class="mb-0 text-4xl font-bold">Sreesanth</h1>
      <p>Hey, I am Sreesanth, a Full-Stack Developer | open sourceror</p>
      <p class="mb-0">
        Detail-oriented Full-Stack Developer with expertise developing and deploying complete web
        applications with technologies like
        <span class="flex flex-wrap not-prose">
          <div
            class="flex items-center pr-3"
            v-for="({ label, icon }, i) in Frameworks"
            :key="label"
          >
            <p class="mr-1">{{ label }}</p>
            <component :is="icon" />
            <span v-if="Frameworks.length - 1 !== i">&#65104;</span>
          </div>
        </span>
      </p>

      <p>
        My passion lies in dreaming up innovative ideas and making them a reality. I excel in roles
        that require versatility, whether it's leading collaborative planning sessions, designing
        scalable backend architectures for growth, or coding intuitive and responsive frontend.
      </p>
      <p>
        When I'm not coding, you'll usually find me reading something interesting, playing badminton
        or cricket, or behind the camera, capturing moments while exploring new places.
      </p>
      <hr class="w-24 m-auto my-10 border-[#7d7d7d4d] dark:border-[#e9e9e94d]" />
    </article>

    <div class="flex flex-col gap-2 mt-10">
      <p>Find me on</p>
      <div class="flex gap-4">
        <find-me v-for="me in FindMeLinks" :key="me.link" :label="me.label" :link="me.link">
          <component :is="me.icons.outlined" />
        </find-me>
      </div>
    </div>
  </div>
</template>
