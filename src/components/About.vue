<script setup>
import GithubIconVue from "../icons/GithubIcon.vue";
import InstagramIconVue from "../icons/InstagramIcon.vue";
import LinkedinIconVue from "../icons/LinkedinIcon.vue";
import Caption from "./Caption.vue";
import { URLS } from "../globals";

const textProp = "Hey, I'm Sreesanth, a fullstack developer.";
</script>
        
<template>
    <div class="">
        <h1 class="">Sreesanth</h1>
    </div>
    <article>
        <div class="">
            <Caption :type-prop="textProp" />
            <p>Find me on</p>
            <p class="grid gap-3">
                <a :href="URLS.GITHUB">
                    <GithubIconVue />
                </a>
                <a :href="URLS.INSTAGRAM">
                    <InstagramIconVue />
                </a>
                <a :href="URLS.LINKEDIN">
                    <LinkedinIconVue />
                </a>
            </p>
        </div>
    </article>
</template>
