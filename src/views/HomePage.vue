<template>
  <div
    class="flex flex-col items-center justify-center px-2 py-12 mx-auto align-middle lg:flex-row md:px-32"
  >
    <div class="flex flex-col-reverse items-center px-4 md:flex-row overlay">
      <div class="text-start">
        <h1 class="text-2xl font-bold md:text-2.5xl lg:text-3xl text-main">
          The Easiest Way to Make Your Favorite Meal
        </h1>
        <p class="font-medium text-gray-200">
          Discover 1000+ recipes in your hand with the
          <span class="font-bold text-main"> Best recipe. </span>
          Help you to find the easiest way to cook.
        </p>
      </div>
      <img
        :src="burgerBg"
        alt="Food background"
        class="h-auto w-[200px] lg:w-[300px] xl:w-full drop-shadow-2xl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import burgerBg from '@/assets/images/burgerBg.png'
</script>

<style scoped lang="scss">
.overlay {
  background: rgba(130, 130, 130, 0.2);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border-radius: 5px;
}
</style>
