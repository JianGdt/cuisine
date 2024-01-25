<template>
  <div class="p-12">
    <BackButton />
    <h2>Results:</h2>
    <div v-if="loading">
      <CardsSkeleton />
    </div>
    <div v-else>
      <div v-if="displayedMeals.length === 0">No results found.</div>
      <div>
        <el-input v-model="searchQuery" @input="searchMealsByName" :prefix-icon="Search" />
      </div>
      <ul class="grid grid-cols-4 gap-x-6">
        <li v-for="meal in displayedMeals" :key="meal.idMeal" class="relative flex flex-col">
          <span class="text-dark">
            {{ meal.strMeal }}
          </span>
          <img :src="meal.strMealThumb" :alt="meal.strMeal" class="object-cover w-full h-full" />
          <router-link :to="{ name: 'MealDetails', params: { id: meal.idMeal } }">
            <el-button type="primary" class="absolute bottom-0 left-[0%] z-20 cursor-pointer">
              Explore the recipe
              <el-icon><ArrowRightBold /></el-icon>
            </el-button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
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
