<template>
  <main class="container text-white">

    <div class="pt-10 mb-8 relative">
      <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]" />
      <ul class="absolute bg-weather-secondary max-h-96	overflow-auto text-white w-full shadow-md py-2 px-1 top-[78px]"
        v-if="inputSearchResults">
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p class="py-2" v-if="!searchError && inputSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li v-for="searchResult in inputSearchResults" :key="searchResult.id" class="py-2 cursor-pointer"
            @click="previewCity(searchResult)">
            {{ searchResult.city_name }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityTabDetail />
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

import CityTabDetail from "../components/CityTabDetail.vue";
import Cities from "../assets/cities.json"
import { getRelevance, compareRelevance } from "../utils/utils.js";

const router = useRouter();

const searchQuery = ref("");
const queryTimeout = ref(null);
const inputSearchResults = ref(null);
const searchError = ref(null);

const previewCity = (searchResult) => {
  const city = searchResult.city_name;
  const state = "";
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city, showBackBtn: true },
    query: {
      lat: searchResult.lat,
      lon: searchResult.lon,
      preview: true,
    },
  });
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "" && searchQuery.value.length >= 3) {
      const data = Cities;
      var results = [];
      for (var i in data) {

        var rel = getRelevance(data[i].city_name, searchQuery.value)
        if (rel == 0)
          continue;
      
        results.push({ relevance: rel, entry: data[i] })
      }

      results.sort(compareRelevance);

      for (i = 0; i < results.length; i++) {
        results[i] = results[i].entry;
      }

      inputSearchResults.value = results;
    } else {
      inputSearchResults.value = null;
    }
  }, 300);
};


</script>

<style lang="scss" scoped></style>