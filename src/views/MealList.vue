<template>
  <div class="p-12">
    <BackButton />
    <div v-if="loading">
      <CardsSkeleton />
    </div>
    <div v-else class="text-start">
      <label class="text-dark"> Search by name: </label>
      <el-input v-model="searchQuery" @input="searchMealsByName" :prefix-icon="Search" />
    </div>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6">
      <MealItem v-for="meal in displayedMeals" :key="meal.idMeal" :meal="meal" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import MealItem from '@/components/MealItem.vue'
import CardsSkeleton from '@/components/skeleton/CardsSkeleton.vue'

type Meal = {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

const props = defineProps<{
  meals: Meal[]
}>()

const meals = ref(props.meals)
const displayedMeals = ref<Meal[]>([])
const searchQuery = ref('')
const loading = ref(true)

watch(
  () => props.meals,
  (newMeals) => {
    meals.value = newMeals
    displayedMeals.value = filterMeals()
    loading.value = false
  }
)

watch(
  () => searchQuery.value,
  () => {
    displayedMeals.value = filterMeals()
  }
)

const filterMeals = () => {
  let filteredMeals = meals.value

  if (searchQuery.value) {
    filteredMeals = filteredMeals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return filteredMeals
}

const searchMealsByName = () => {
  displayedMeals.value = filterMeals()
}
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
  li {
    margin-bottom: 10px;
  }
}
</style>
