<script setup lang="ts">
import Github from '~/icons/Github.vue';
import SunOutlined from '~/icons/SunOutlined.vue';
import MoonOutlined from '~/icons/MoonOutlined.vue';
import LightBulbOutlined from '~/icons/LightBulbOutlined.vue';
import Linkedin from '~/icons/Linkedin.vue';
import CvOutlinedIcon from '~/icons/CvOutlinedIcon.vue';
</script>

<template>
  <header class="h-12 flex items-center text-gray-700 pt-2">
    <router-link :to="{ name: 'Home' }">
      <p
        class="text-2xl animate-pulse bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text">
        .sh
      </p>
    </router-link>
    <div class="flex-auto" />
    <div class="flex gap-6 sm:gap-5 text-gray-700/70">
      <router-link class="hover:text-gray-800" :to="{ name: 'Projects' }">
        <LightBulbOutlined class="sm:hidden" />
        <p class="hidden sm:block">Projects</p>
      </router-link>
      <router-link class="hover:text-gray-800" :to="{ name: 'Resume' }">
        <CvOutlinedIcon />
      </router-link>
      <router-link class="hover:text-gray-800" :to="{ name: 'Github' }">
        <Github />
      </router-link>
      <router-link class="hover:text-gray-800" :to="{ name: 'Linkedin' }">
        <Linkedin />
      </router-link>

      <MoonOutlined class="hidden dark:block hover:text-gray-800" />
      <SunOutlined class="dark:hidden hover:text-gray-800" />
    </div>
  </header>
</template>
