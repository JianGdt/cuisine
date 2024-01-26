<template>
  <li class="relative flex flex-col">
    <span class="text-dark">{{ meal.strMeal }}</span>
    <img :src="meal.strMealThumb" :alt="meal.strMeal" class="object-cover w-full h-full" />
    <router-link :to="{ name: 'MealDetails', params: { id: meal.idMeal } }">
      <el-button type="primary" class="absolute bottom-0 left-[0%] z-20 cursor-pointer">
        Explore the recipe
        <el-icon><ArrowRightBold /></el-icon>
      </el-button>
    </router-link>
  </li>
</template>

<script setup lang="ts">
type Meal = {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

const { meal } = defineProps({
  meal: {
    type: Object as () => Meal,
    required: true
  }
})
</script>

<style scoped lang="scss">
/* Add your styles here */
</style>
