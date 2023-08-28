<script setup>
import GithubIconVue from "@icons/GithubIcon.vue";
import InstagramIconVue from "@icons/InstagramIcon.vue";
import LinkedinIconVue from "@icons/LinkedinIcon.vue";
import Caption from "@components/Caption.vue";
import { URLS, CAPTION } from "@/globals";
</script>

<template>
  <div>
    <div class="flex gap-8">
      <p class="grid gap-3">
        <GithubIconVue />
        <InstagramIconVue />
        <LinkedinIconVue />
      </p>
      <Caption :text-prop="CAPTION" />
    </div>
  </div>
</template>
