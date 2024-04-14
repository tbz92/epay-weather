<template>
  <div>
    <Suspense>
      <template #default>
        <SearchCityDetailView />
      </template>
      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import SearchCityDetailView from "../components/SearchCityDetailView.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
</script>
