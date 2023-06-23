<template>
    <div
        id="app"
        class="h-screen transition duration-[1500ms] ease-in-out"
        :class="{ 'bg-gray-800': themeStore.darkMode }"
    >
        <Navbar />
        <div class="container">
            <RouterView />
        </div>
        <Particles />
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Particles from "./components/Particles.vue";
import { useThemeStore } from "./stores/Theme";
const themeStore = useThemeStore();
</script>

<style>
@import "assets/tailwind.css";

body,
html {
    height: 100%;
}

.container {
    @apply mx-auto;
}

svg {
    width: 24px;
    height: 24px;
    @apply fill-gray-400;
}
</style>