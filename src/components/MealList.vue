<template>
  <div>
    <h2>Results:</h2>
    <div>
      <label for="search">Search by Name:</label>
      <el-input v-model="searchQuery" @input="searchMealsByName" :prefix-icon="Search"/>
    </div>
    <ul>
      <li v-for="meal in displayedMeals" :key="meal.idMeal">{{ meal.strMeal }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';

type Meal = {
  idMeal: string;
  strMeal: string;
}

const props = defineProps<{
  meals: Meal[];
}>();

const meals = ref(props.meals);
const displayedMeals = ref<Meal[]>([]);
const searchQuery = ref('');

watch(() => props.meals, (newMeals) => {
  meals.value = newMeals;
  displayedMeals.value = filterMeals();
});

watch(() => searchQuery.value, () => {
  displayedMeals.value = filterMeals();
});

const filterMeals = () => {
  let filteredMeals = meals.value;

  if (searchQuery.value) {
    filteredMeals = filteredMeals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filteredMeals;
};

const searchMealsByName = () => {
  displayedMeals.value = filterMeals();
};

</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
  li {
    margin-bottom: 10px;
  }
}
</style>
