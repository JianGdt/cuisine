<template>
  <div>
    <h2>Results:</h2>
    <ul>
      <li v-for="meal in displayedMeals" :key="meal.idMeal">{{ meal.strMeal }}</li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, ref, watch } from 'vue';

type Meal = {
  idMeal: string;
  strMeal: string;
}

const props = defineProps<{
  meals: Meal[];
}>();

const meals = ref(props.meals);
const displayedMeals = ref<Meal[]>([]);

watch(() => props.meals, (newMeals) => {
  meals.value = newMeals;
});

watch(() => meals.value, () => {
  displayedMeals.value = [...meals.value];
});

console.log(meals.value);

</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
