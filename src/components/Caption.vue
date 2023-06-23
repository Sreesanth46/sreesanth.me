<script setup>
import { defineProps } from "vue";
const props = defineProps(["textProp"]);
</script>

<template>
    <div class="typing">{{ textProp }}</div>
</template>

<style scoped>
.typing {
    width: 22ch;
    animation: typing 3s steps(22), blink 0.5s step-end infinite alternate;
    white-space: nowrap;
    overflow: hidden;
    /* border-right: 3px solid; */
    font-family: monospace;
    font-size: 2em;
}

@keyframes typing {
    from {
        width: 0;
    }
}

@keyframes blink {
    50% {
        border-color: transparent;
    }
}
</style>