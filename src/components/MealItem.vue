<template>
  <li class="flex flex-col w-[300px] md:w-full p-2 bg-main justify-center mx-auto">
    <span class="p-2 text-sm text-start text-main">{{ meal.strMeal }}</span>
    <img :src="meal.strMealThumb" :alt="meal.strMeal" class="object-cover w-full h-full" />
    <el-button type="info" class="left-[0%] z-20 cursor-pointer">
      <router-link :to="{ name: 'MealDetails', params: { id: meal.idMeal } }" class="flex p-1">
        View recipe
        <el-icon class="icon-arrow"><ArrowRightBold /></el-icon>
      </router-link>
    </el-button>
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
.el-button {
  position: relative;
  margin: 5px 0;
  &:hover {
    .icon-arrow {
      transform: translateX(10px);
      transition: transform 0.3s ease-in-out;
    }
  }
}
</style>
