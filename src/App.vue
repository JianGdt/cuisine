<template>
  <main class="w-full">
    <HomePage />
    <MealCategoryList
      v-if="isRoutePath"
      :categories="categories"
      @selectCategory="selectCategory"
    />
    <router-view v-else :meals="meals" />
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MealCategoryList from '@/views/MealCategoryList.vue'
import { useFetch } from '@/composables/useFetch'

const router = useRouter()

const categoriesUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php'
const mealsUrl = ref<string | null>(null)

const { data: categoriesData, error: categoriesError } = useFetch(categoriesUrl)
const { data: mealsData, error: mealsError } = useFetch(mealsUrl)

const categories = ref([])
const selectedCategory = ref<string | null>(null)
const meals = ref([])
const error = ref(null)
const isRoutePath = ref(true)

watch(
  () => router.currentRoute.value.path,
  (path) => {
    isRoutePath.value = path === '/'
  }
)

const selectCategory = (category: string) => {
  selectedCategory.value = category
  meals.value = []
  error.value = null
  searchMeals(category)
  router.push({ name: 'MealList', params: { category } })
}

const searchMeals = async (category: string) => {
  if (!category) {
    console.log('No category selected.')
    return
  }

  mealsUrl.value = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`

  await Promise.allSettled([mealsData, mealsError]).then(([data, err]) => {
    if (data.status === 'fulfilled' && data.value) {
      meals.value = data.value.meals
      error.value = null
    } else if (err.status === 'rejected') {
      error.value = err.reason
    }
  })
}

onMounted(() => {
  watch(categoriesData, () => {
    if (categoriesData.value) {
      categories.value = categoriesData.value.categories
    }
  })

  watch(categoriesError, (err) => {
    console.log(err)
  })
})
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
