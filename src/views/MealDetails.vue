<template>
  <div class="p-12">
    <BackButton />
    <h2>Meal Details:</h2>
    <div v-if="mealDetails">
      <h3 class="text-dark">{{ mealDetails.strMeal }}</h3>
      <div class="flex flex-col justify-between text-center align-middle lg:flex-row gap-x-6">
        <img
          :src="mealDetails.strMealThumb"
          :alt="mealDetails.strMeal"
          class="object-cover w-auto h-auto"
        />
        <h4 class="my-4 text-4xl text-dark text-end">
          Instructions:
          <div v-html="mealDetails.strInstructions" class="text-sm text-dark text-start"></div>
        </h4>
      </div>
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
