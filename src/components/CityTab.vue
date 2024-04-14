<template>
  <div class="flex justify-center shadow">
    <div class="flex-row justify-between pl-4 pr-4" :class="{ 'border-b-2': index === selectedCity }"
      v-for="(city, index) in cities" :key="index">
      <button class="appearance-none" @click="selectCity(city, index)">{{
        city.city_name }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cities: Array,
    selectedCity: Number
  },
  methods: {
    selectCity(city, index) {
      this.$emit('select-city', city, index);
    }
  }
}
</script>