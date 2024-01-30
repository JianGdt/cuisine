<template>
  <main class="w-full">
    <HomePage />
    <MealArea v-if="isRoutePath" :areas="areas" @selectArea="selectArea" />
    <router-view :meals="mealsUrl" />
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MealArea from '@/views/MealArea.vue'
import { useFetch } from '@/composables/useFetch'

const router = useRouter()

const areasUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
const mealsUrl = ref<string | null>(null)
const areas = ref<string[]>([])

const { data: areasData, error: areasError } = useFetch(areasUrl)

const isRoutePath = ref(false)

const selectArea = (selectedArea: string) => {
  router.push({ path: `/meals/${selectedArea}` })
}

watch(
  () => router.currentRoute.value.path,
  (path) => {
    isRoutePath.value = path === '/meals'

    if (isRoutePath.value) {
      mealsUrl.value = areasUrl
    } else {
      mealsUrl.value = null
    }
  }
)

onMounted(() => {
  watch(areasData, () => {
    areas.value = areasData.value
      ? areasData.value.meals.map((area: { strArea: string }) => area.strArea)
      : []
  })

  watch(areasError, (err) => {
    console.error(err)
  })
})
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
