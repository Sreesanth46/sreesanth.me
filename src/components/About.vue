<script setup>
import GithubIconVue from "@icons/GithubIcon.vue";
import InstagramIconVue from "@icons/InstagramIcon.vue";
import LinkedinIconVue from "@icons/LinkedinIcon.vue";
import Caption from "@components/Caption.vue";
import { CAPTION } from "@/globals";
</script>

<template>
  <div>
    <article>
      <div class="flex gap-8">
        <div
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src="https://source.unsplash.com/random"
            alt=""
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <p
              class="mb-2 tracking-tight text-gray-900 dark:text-white"
            >
              Hey everyone
          </p>
            <Caption :text-prop="CAPTION" />
          </div>
        </div>
      </div>
      <p>Find me on</p>
      <p class="flex gap-3 flex-wrap">
        <GithubIconVue />
        <InstagramIconVue />
        <LinkedinIconVue />
      </p>
    </article>
  </div>
</template>
