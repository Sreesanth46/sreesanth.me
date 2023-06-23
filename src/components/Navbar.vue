<script setup>
import Theme from "./Theme.vue";
import GithubIconVue from "../icons/GithubIcon.vue";
import InstagramIconVue from "../icons/InstagramIcon.vue";
import LinkedinIconVue from "../icons/LinkedinIcon.vue";
import { URLS } from "../globals";
const navMenu = [
    {
        name: "Projects",
    },

    {
        name: "Demos",
    },

    {
        name: "Services",
    },
];
</script>

<template>
    <nav class="w-full top-0 z-10">
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
                    <router-link :to="{ name: item.name }">
                        <li class="hover:text-gray-400 cursor-pointer">
                            {{ item.name }}
                        </li>
                    </router-link>
                </ul>
                <Theme />
                <a :href="URLS.GITHUB">
                    <GithubIconVue />
                </a>
                <a :href="URLS.INSTAGRAM">
                    <InstagramIconVue />
                </a>
                <a :href="URLS.LINKEDIN">
                    <LinkedinIconVue />
                </a>
            </div>

            <!-- TODO -->
            <!-- https://paste.sreesanth.me/dahavomehu.xml -->
            <!-- Mobile screen nav -->
        </div>
    </nav>
</template>