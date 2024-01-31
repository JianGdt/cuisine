<template>
  <figure>
    <ArrowLeft class="w-6 h-6 p-1 rounded-full cursor-pointer bg-light" @click="goBack" />
  </figure>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>
