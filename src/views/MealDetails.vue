<template>
  <div class="p-12">
    <BackButton />
    <div v-if="mealDetails || loading" class="my-4 rounded-lg shadow-md bg-main">
      <div v-if="loading">
        <CardsSkeleton />
      </div>
      <div v-else>
        <div class="relative flex flex-col items-center justify-center">
          <div class="relative">
            <h3
              class="absolute px-6 md:px-0 text-[30px] bottom-6 md:text-6xl text-main bg-dark rounded-lg"
            >
              {{ mealDetails?.strMeal }}
            </h3>
            <img
              :src="mealDetails?.strMealThumb"
              :alt="mealDetails?.strMeal"
              class="w-full px-6 my-12 md:px-0 rounded-xl"
            />
            <div
              v-if="mealDetails?.strYoutube"
              class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
              <img
                @click="playYouTube"
                :src="playIcon"
                alt="Play icon"
                class="w-12 h-12 cursor-pointer"
              />
            </div>
          </div>
          <div class="p-12 font-bold text-light">
            <h4 class="mb-4 text-lg text-center md:text-4xl text-light">
              Meal {{ mealDetailsType }}
            </h4>
            <div class="flex items-center justify-center text-sm leading-4 md:text-lg gap-x-12">
              <button
                v-for="type in ['Ingredients', 'Instructions']"
                :key="type"
                @click="setDisplayType(type)"
                :class="{ activeButton: mealDetailsType === type }"
                class="transition-all duration-300 cursor-pointer text-main focus:outline-none"
              >
                Show {{ type }}
              </button>
            </div>
            <transition name="fade" mode="out-in">
              <ul
                v-if="mealDetailsType === 'Ingredients'"
                key="ingredients"
                class="grid grid-cols-1 gap-4 m-auto my-4 md:grid-cols-2 text-light"
              >
                <li
                  v-for="ingredient in mealDetails?.ingredients"
                  :key="ingredient.ingredient"
                  class="text-start leaning-none text-main"
                >
                  <img :src="checkIcon" alt="check icon" class="inline-block w-[20px] h-full" />
                  {{ `${ingredient.ingredient} - ${ingredient.measure}` }}
                </li>
              </ul>
              <div
                v-else-if="mealDetailsType === 'Instructions'"
                key="instructions"
                class="max-w-2xl mx-auto my-4 text-start text-main"
              >
                <ul>
                  <li
                    v-for="(instruction, index) in mealDetails?.strInstructions.split('\r\n')"
                    :key="index"
                  >
                    {{ instruction }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>
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
import CardsSkeleton from '@/components/skeleton/CardsSkeleton.vue'
import { extractIngredients } from '@/utils/helpers'

type MealDetail = {
  strMeal: string
  strMealThumb: string
  strInstructions: string
  ingredients: { ingredient: string; measure: string }[]
  strYoutube?: string
}

const mealDetails = ref<MealDetail | null>(null)
const route = useRoute()
const mealDetailsType = ref<string>('Ingredients')
const loading = ref(false)

onMounted(async () => {
  const mealId = route.params.id
  try {
    loading.value = true
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    )
    mealDetails.value = {
      ...response.data.meals[0],
      ingredients: extractIngredients(response.data.meals[0])
    }
  } finally {
    loading.value = false
  }
})

function setDisplayType(type: string): void {
  mealDetailsType.value = type
}

function playYouTube(): void {
  window.open(mealDetails.value?.strYoutube, '_blank')
}
</script>

<style scoped lang="scss">
.activeButton {
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
  width: 3rem;
  height: 3rem;
}
</style>
