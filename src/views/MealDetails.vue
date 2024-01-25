<template>
  <div class="p-12">
    <BackButton />
    <h2>Meal Details:</h2>
    <div v-if="mealDetails">
      <h3>{{ mealDetails.strMeal }}</h3>
      <img :src="mealDetails.strMealThumb" :alt="mealDetails.strMeal" class="object-cover w-full" />
      <div v-html="mealDetails.strInstructions"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

type MealDetail = {
  strMeal: string
  strMealThumb: string
  strInstructions: string
}

const mealDetails = ref<MealDetail | null>(null)
const route = useRoute()

onMounted(async () => {
  const mealId = route.params.id
  const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  mealDetails.value = response.data.meals[0]
})
</script>
