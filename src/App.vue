<template>
  <main class="w-full">
    <HomePage />
    <MealCategoryList v-if="isRootPath" :categories="categories" @selectCategory="selectCategory" />
    <router-view v-if="!isRootPath" :meals="meals" />
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MealCategoryList from '@/views/MealCategoryList.vue'

const router = useRouter()

const fetchCategories = () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
  axios.get(url).then((response) => {
    categories.value = response.data.categories
  })
}

const searchMeals = (error: any) => {
  if (!selectedCategory.value) {
    error.value = 'Please select a category.'
    return
  }

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory.value}`
  axios
    .get(url)
    .then((response) => {
      meals.value = response.data.meals
      error.value = null
    })
    .catch((err) => {
      err.value = 'Error fetching meals.'
    })
}

const meals = ref([])
const error = ref(null)
const categories = ref([])
const selectedCategory = ref<string | null>(null)

const selectCategory = (category: string) => {
  selectedCategory.value = category
  searchMeals(error)
  router.push({ name: 'MealList', params: { category } })
}

const isRootPath = ref(true)
watch(
  () => router.currentRoute.value.path,
  (path) => {
    isRootPath.value = path === '/'
  }
)

fetchCategories()
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
