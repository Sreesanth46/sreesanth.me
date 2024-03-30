<template>
  <Transition name="slide-enter" mode="out-in">
    <slot></slot>
  </Transition>
</template>

<style scoped>
@keyframes slide-enter {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-enter-enter-active {
  animation: slide-enter 1s;
}

.slide-enter-leave-active {
  animation: slide-enter 0.3s reverse;
}
</style>
