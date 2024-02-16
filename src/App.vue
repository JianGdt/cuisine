<template>
  <main class="w-full">
    <HomePage v-if="isHomePath" />
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
const router = useRouter()

const isHomePath = ref(true)

watch(
  () => router.currentRoute.value.path,
  (path) => {
    isHomePath.value = path === '/'
  }
)
</script>
