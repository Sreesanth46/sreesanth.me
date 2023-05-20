<template>
    <header class="bg-slate-100">
      <nav class="flex items-center mx-auto justify-between p-5">
          <div>
            Sreesanth
          </div>
          <div class="flex ">
            <ul v-for="(item, index) in navMenu" :key="index">
                <li>
                    {{ item.name }}
                </li>
            </ul>
          </div>
      </nav>
    </header>
  </template>

<script setup>
const navMenu = [
    {
        name: "Home"
    },

    {
        name: "About"
    },

    {
        name: "Services"
    },
    
    {
        name: "Contact"
    },
]
</script>