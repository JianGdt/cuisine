<template>
  <div
    class="flex flex-col items-center justify-center px-2 py-12 mx-auto align-middle lg:flex-row md:px-44"
  >
    <div class="text-start">
      <h1 class="text-2xl md:text-4xl lg:text-6xl text-dark">
        The Easiest Way to Make Your Favorite Meal
      </h1>
      <p class="text-light">
        Discover 1000+ recipes in your hand with the <span class="font-bold"> Best recipe. </span>
      </p>
      <p class="text-light">Help you to find the easiest way to cook.</p>
    </div>
    <img :src="burgerBg" alt="Food background" class="h-auto drop-shadow-2xl" />
  </div>
</template>

<script setup lang="ts">
import burgerBg from '@/assets/images/burgerBg.png'
</script>
