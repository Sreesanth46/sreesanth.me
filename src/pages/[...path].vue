<script setup lang="ts">
definePage({
  meta: {
    title: '404 | sh',
    description: 'Sreesanth - Software Engineer. The page you are looking for does not exist.',
  },
});

const router = useRouter();

function safeBack() {
  const state = router.options.history.state;

  if (state?.back) {
    router.back();
  } else {
    router.replace('/');
  }
}
</script>

<template>
  <div class="grid justify-center pt-10 gap-4">
    <span
      class="font-serif sm:font-sans text-transparent text-[5em] sm:text-[8em] font-bold outer-stoke"
      >404</span
    >
    <h6
      class="text-gray-500 dark:text-white opacity-50 hover:cursor-pointer hover:underline font-normal md:text-xl"
      @click="safeBack"
    >
      cd ..
    </h6>
  </div>
</template>

<style scoped>
.outer-stoke {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.dark .outer-stoke {
  -webkit-text-stroke-color: white;
}
</style>
