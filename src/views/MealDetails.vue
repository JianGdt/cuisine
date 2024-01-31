<template>
  <div class="p-12">
    <BackButton />
    <div v-if="mealDetails" class="shadow-md bg-darkest">
      <h3 class="text-main">{{ mealDetails.strMeal }}</h3>
      <div class="relative flex flex-col items-center justify-center">
        <img
          :src="mealDetails.strMealThumb"
          :alt="mealDetails.strMeal"
          class="object-cover w-5/12 h-full cursor-pointer hover:opacity-80"
          @mouseover="showPlayIcon = true"
          @mouseout="showPlayIcon = true"
        />
        <div
          v-if="mealDetails.strYoutube && showPlayIcon"
          class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        >
          <img
            @click="playYouTube"
            :src="playIcon"
            alt="Play icon"
            class="w-12 h-12 cursor-pointer"
          />
        </div>
        <div class="p-12 font-bold text-light">
          <h4 class="text-4xl text-light">Meal {{ displayType }}</h4>
          <div class="flex items-center justify-center gap-x-12">
            <button
              @click="setDisplayType('Ingredients')"
              :class="{ 'active-button': displayType === 'Ingredients' }"
              class="transition-all duration-300 cursor-pointer text-main focus:outline-none"
            >
              Show Ingredients
            </button>
            <button
              @click="setDisplayType('Instructions')"
              :class="{ 'active-button': displayType === 'Instructions' }"
              class="transition-all duration-300 cursor-pointer text-main focus:outline-none"
            >
              Show Instructions
            </button>
          </div>
          <transition name="fade" mode="out-in">
            <ul
              v-if="displayType === 'Ingredients'"
              key="ingredients"
              class="grid max-w-2xl grid-cols-1 mx-auto my-4 md:grid-cols-3 text-light"
            >
              <li
                v-for="ingredient in mealDetails.ingredients"
                :key="ingredient.ingredient"
                class="text-start text-main"
              >
                <img :src="checkIcon" alt="check icon" class="inline-block w-[20px] h-full" />
                {{ ingredient.ingredient }} - {{ ingredient.measure }}
              </li>
            </ul>
            <div
              v-else-if="displayType === 'Instructions'"
              key="instructions"
              class="my-4 text-start text-light"
            >
              <ul class="max-w-2xl mx-auto text-main">
                <li>
                  <img :src="checkIcon" alt="check icon" class="inline-block w-[20px] h-full" />
                  {{ mealDetails.strInstructions }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import playIcon from '@/assets/images/playIcon.svg'
import checkIcon from '@/assets/images/check.svg'

type MealDetail = {
  strMeal: string
  strMealThumb: string
  strInstructions: string
  ingredients: { ingredient: string; measure: string }[]
  strYoutube?: string
}

const mealDetails = ref<MealDetail | null>(null)
const route = useRoute()
const displayType = ref<string>('Ingredients')
const showPlayIcon = ref(false)

onMounted(async () => {
  const mealId = route.params.id
  const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  mealDetails.value = {
    ...response.data.meals[0],
    ingredients: extractIngredients(response.data.meals[0])
  }
})

function extractIngredients(
  meal: Record<string, string>
): { ingredient: string; measure: string }[] {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient) {
      ingredients.push({ ingredient, measure })
    } else {
      break
    }
  }
  return ingredients
}

function setDisplayType(type: string): void {
  displayType.value = type
}

function playYouTube(): void {
  // You can implement your logic to play the YouTube video here
  // For example, open a modal with an embedded YouTube video player
  console.log('Play YouTube video:', mealDetails.value?.strYoutube)
}
</script>

<style scoped lang="scss">
.active-button {
  color: #fff;
  border-bottom: 2px solid #fff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

img[w-12] {
  width: 3rem; /* Adjust size as needed */
  height: 3rem; /* Adjust size as needed */
}
</style>
