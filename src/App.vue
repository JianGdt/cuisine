<template>
    <h1>Meal Search App</h1>
    <SearchBar @search="searchMeals"/>
    <MealList v-if="meals.length" :meals="meals" />
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

type Meal ={
  idMeal: string;
  strMeal: string;
}

const meals = ref<Meal[]>([]);
const error = ref<string | null>(null);

const searchMeals = (searchQuery: string) => {
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
