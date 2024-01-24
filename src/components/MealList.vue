<template>
  <div class="p-12">
    <BackButton />
    <h2>Results:</h2>
    <div v-if="displayedMeals.length === 0">No results found.</div>
    <div>
      <label for="search">Search by Name:</label>
      <el-input v-model="searchQuery" @input="searchMealsByName" :prefix-icon="Search" />
    </div>
    <ul>
      <li v-for="meal in displayedMeals" :key="meal.idMeal">
        <span>
          {{ meal.strMeal }}
        </span>
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="object-cover w-2/12 cursor-pointer"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const Search = import('@element-plus/icons-vue')

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

watch(
  () => props.meals,
  (newMeals) => {
    meals.value = newMeals
    displayedMeals.value = filterMeals()
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
