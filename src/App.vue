<template>
  <main class="w-full">
    <HomePage v-if="isHomePath" />
    <MealArea v-if="isRoutePath" @selectArea="selectArea" />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MealArea from '@/views/MealArea.vue'
const router = useRouter()

const isHomePath = ref(true)
const isRoutePath = ref(false)

const selectArea = (selectedArea: string) => {
  router.push({ path: `/meals/${selectedArea}` })
}

watch(
  () => router.currentRoute.value.path,
  (path) => {
    isHomePath.value = path === '/'
    isRoutePath.value = path === '/' || path === '/meals'
  }
)
</script>
