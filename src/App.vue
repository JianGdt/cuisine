<template>
  <main class="w-full">
    <h1>Meal Search App</h1>
    <MealCategoryList :categories="categories" @selectCategory="selectCategory" />
    <MealList v-if="meals.length" :meals="meals" />
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

type Meal = {
  idMeal: string;
  strMeal: string;
};

type Category = {
  idCategory: string;
  strCategory: string;
};

const meals = ref<Meal[]>([]);
const error = ref<string | null>(null);
const categories = ref<Category[]>([]);
const selectedCategory = ref<string | null>(null);

const fetchCategories = () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  axios.get(url).then((response) => {
    categories.value = response.data.categories;
  });
};

const searchMeals = () => {
  if (!selectedCategory.value) {
    error.value = 'Please select a category.';
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory.value}`;
  axios
    .get(url)
    .then((response) => {
      meals.value = response.data.meals;
      error.value = null;
    })
    .catch((err) => {
      err.value = 'Error fetching meals.';
    });
};

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  searchMeals();
};

// Fetch categories on component mount
fetchCategories();
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
