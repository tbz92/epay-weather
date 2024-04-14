<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg z-50">
    <nav class="container flex flex-col sm:flex-row justify-between items-center gap-4 text-white py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Epay Weather</p>
        </div>
      </RouterLink>
      <RouterLink v-if="route.params && route.params.showBackBtn" :to="{ name: 'home' }">
        <i class="fa-solid fa-arrow-left text-2xl"></i>
      </RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import { ref } from "vue";
const route = useRoute();
console.log("Route ", route);
const router = useRouter();
</script>
