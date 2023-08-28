<script setup>
const props = defineProps({
    textProp: String
});
</script>

<template>
    <div  v-html="textProp" class="typing dark:text-slate-400 whitespace-nowrap w-full text-lg" />
</template>

<style scoped>
.typing {
    animation: typing 3s steps(44), blink 0.5s step-end infinite alternate;
    overflow: hidden;
    font-family: monospace;
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