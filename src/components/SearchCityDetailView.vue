<template>
  <div v-if="!isLoading && !isError" class="flex flex-col flex-1 items-center">
    <div class="flex w-1/3 text-white justify-end pt-10" v-if="weatherData">
      <i class="fa-solid fa-refresh text-2xl" @click="refresh(route.query)"></i>
    </div>
    <WeatherDetails v-if="weatherData" v-bind:weatherData="weatherData" v-bind:cityName="route.params.city">
    </WeatherDetails>
  </div>
  <div v-if="!isLoading && isError" class="flex flex-col items-center text-white py-12">

    <p class="py-2" v-if="isError">
      Sorry, something went wrong, please try again.
    </p>
  </div>
  <div v-if="isLoading">
    <CityViewSkeleton />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import WeatherDetails from "./WeatherDetails.vue";
import { getWeatherSearchData } from ".././services/weather";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";

const route = useRoute();
const isLoading = ref(true);
const isError = ref(false);
let weatherData;

const refresh = async (cityQuery) => {
  try {
    isLoading.value = true;
    weatherData = await getWeatherSearchData(cityQuery);
    if (weatherData) {
      isLoading.value = false;
    }
  } catch (err) {
    console.log("error retrieving data", err);
    isLoading.value = false
    isError.value = true;
  }
}
await refresh(route.query);
const router = useRouter();
</script>
