<template>
  <div class="flex items-center justify-center align-middle px-44">
    <div class="text-start">
      <h1 class="text-6xl text-dark">The Easiest Way to Make Your Favirite Meal</h1>
      <P class="text-light">Discover 1000+ recipes in your hand with the best recipe.</P>
      <P class="text-light">Help you to find the easiest way to cook.</P>
    </div>
    <img :src="burgerBg" alt="Food background" class="h-auto drop-shadow-2xl" />
  </div>
</template>

<script setup lang="ts">
import burgerBg from '@/assets/images/burgerBg.png'
</script>
