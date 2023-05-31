<template>
    <div
        id="app"
        class="transition duration-[1500ms] ease-in-out"
        :class="{ 'bg-gray-800': themeStore.darkMode }"
    >
        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { useThemeStore } from "./stores/Theme";
const themeStore = useThemeStore();
</script>

<style>
@import "assets/tailwind.css";

body,
html {
    height: 100%;
}

#app {
    font-family: "Avenir", Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}

.container {
    @apply mx-auto;
}

svg {
    width: 24px;
    height: 24px;
}
</style>