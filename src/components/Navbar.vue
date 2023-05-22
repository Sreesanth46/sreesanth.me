<template>
    <nav class="w-full fixed top-0 bg-white">
        <div class="container mx-auto py-5 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <!-- Logo -->
                <span class="text-2xl font-medium text-indigo-900"
                    >Sreesanth</span
                >
            </div>

            <div class="hidden md:flex space-x-8 text-gray-600 font-medium">
                <ul v-for="(item, index) in navMenu" :key="index">
                    <li class="hover:text-gray-400">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
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
        name: "Contact",
    },
];
</script>