<template>
    <nav class="w-full fixed top-0 bg-white z-10">
        <div class="container mx-auto py-5 flex items-center justify-between">
            <div class="hidden sm:flex items-center gap-2">
                <!-- Logo -->
                <span class="text-2xl font-medium text-indigo-900"
                    >Sreesanth</span
                >
            </div>

            <div
                class="hidden md:flex space-x-8 text-gray-600 font-medium items-center justify-center"
            >
                <ul v-for="(item, index) in navMenu" :key="index">
                    <li class="hover:text-gray-400">
                        {{ item.name }}
                    </li>
                </ul>
                <Theme />
            </div>
        </div>
    </nav>
</template>

<script setup>
import Theme from "./Theme.vue";

const navMenu = [
    {
        name: "Home",
    },

    {
        name: "About",
    },

    {
        name: "Services",
    },

    {
        name: "Contact Me",
    },
];
</script>