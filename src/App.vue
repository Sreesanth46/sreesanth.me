<template>
    <div id="app">
        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
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
</style>