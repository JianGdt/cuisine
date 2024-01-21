<template>
  <div id="app">
    <h1>Meal Search App</h1>
    <SearchBar @search="searchMeals" />
    <MealList v-if="meals.length" :meals="meals" />
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SearchBar from "@/components/SearchBar.vue";
import MealList from "@/components/MealList.vue";

const meals = ref([]);
const error = ref(null);

const searchMeals = (searchQuery) => {
  try {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
      .then((response) => {
        meals.value = response.data.meals;
      });
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(() => {
  searchMeals("");
});
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
