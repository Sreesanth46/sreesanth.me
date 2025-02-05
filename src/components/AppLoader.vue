<template>
  <div role="status" class="w-full h-full flex justify-center">
    <svg
      class="sh fill-none stroke-black dark:stroke-white w-96 h-96"
      viewBox="0 0 1485.14 1394.12">
      <path
        d="M66.69 1006.79c0-47.45 32.06-80.8 76.95-80.8s75.67 33.35 75.67 80.8-29.5 80.8-76.95 80.8c-44.89 0-75.67-34.63-75.67-80.8zm277.01-48.73c33.35 21.8 92.34 44.89 148.77 44.89 82.08 0 120.56-41.04 120.56-92.34 0-53.87-32.06-83.36-115.43-114.14-111.58-39.76-164.16-101.32-164.16-175.71 0-100.04 80.8-182.12 214.18-182.12 62.84 0 117.99 17.96 152.62 38.48l-28.22 82.08c-24.37-15.39-69.26-35.91-126.97-35.91-66.69 0-103.88 38.48-103.88 84.65 0 51.3 37.19 74.39 117.99 105.17 107.73 41.04 162.88 94.91 162.88 187.25 0 109.01-84.65 185.97-232.14 185.97-67.97 0-130.82-16.67-174.42-42.32l28.22-85.93zm523.27-795.17h112.86v387.33h2.57c17.96-32.06 46.17-60.28 80.8-79.52 33.35-19.24 73.1-32.06 115.43-32.06 83.36 0 216.75 51.3 216.75 265.48v369.37h-112.86v-356.54c0-100.04-37.19-184.68-143.64-184.68-73.1 0-130.82 51.3-151.34 112.86-6.41 15.39-7.7 32.06-7.7 53.87v374.5h-112.86V162.89z"
        class="fill-none stroke-black dark:stroke-white"
        style="
          stroke-linecap: round;
          stroke-miterlimit: 10;
          stroke-width: 5px;
        " />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<style scoped>
.sh {
  stroke-linecap: round;
  stroke-miterlimit: 10;
  stroke-width: 48px;
  stroke-dasharray: 5800px;
  stroke-dashoffset: 5800px;
  animation: animate_stroke linear 5s forwards;
  animation-iteration-count: 4;
  animation-direction: alternate;
  animation-delay: 0s;
}

@keyframes animate_stroke {
  0% {
    stroke-dashoffset: 5800;
  }
  25% {
    stroke-dashoffset: 5800;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
