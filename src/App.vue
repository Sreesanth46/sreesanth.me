<template>
    <div
        id="app"
        class="transition duration-[1500ms] ease-in-out"
        :class="{ 'bg-gray-800': themeStore.darkMode }"
    >
        <Navbar />
        <div class="container">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
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
    @apply fill-violet-900;
}
</style>