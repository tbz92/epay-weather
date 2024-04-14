<template>
  <div v-if="!isLoading && !isError">
    <div class="pt-10 tabs">
      <CityTab :cities="favoriteCities" :selected-city="selectedCity" @select-city="selectCity">
      </CityTab>
      <div class="flex justify-end pt-10" v-if="selectedWeatherData && favoriteCities[selectedCity]">
        <i class="fa-solid fa-refresh text-2xl" @click="refresh(selectedCity)"></i>
      </div>
    </div>
    <div v-if="selectedWeatherData && favoriteCities[selectedCity]" class="weather-details">
      <WeatherDetails v-bind:weatherData="selectedWeatherData" v-bind:cityName="favoriteCities[selectedCity].city_name">
      </WeatherDetails>
    </div>
  </div>
  <div v-if="!isLoading && isError">
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
import CityTab from "./CityTab.vue";
import favoriteCities from ".././assets/favoriteCities.json";
import WeatherDetails from "./WeatherDetails.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
import { getFavoriteCities, weatherParser } from "../services/weather"

const selectedCity = ref(null);
const selectedWeatherData = ref(null);
const isLoading = ref(true);
const isError = ref(false);
let weatherData;

const refresh = async (cityIndex) => {
  try {
    isLoading.value = true;
    const weatherResp = await getFavoriteCities(selectedCity);
    weatherData = weatherParser(weatherResp);
    
    if (weatherData)
      isLoading.value = false;
    if(cityIndex)
      selectedCity.value = cityIndex;

    selectedWeatherData.value = weatherData[selectedCity.value];
  } catch (ex) {
    console.log("error retrieving data", ex);
    isLoading.value = false
    isError.value = true;
  }
}

const selectCity = (city, index) => {
  isLoading.value = true;
  selectedCity.value = index;

  if(weatherData) {
    selectedWeatherData.value = weatherData[selectedCity.value];    
    isLoading.value = false;
  }
}

await refresh();
</script>
