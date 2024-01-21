<template>
  <div>
    <h2>Results:</h2>
    <ul>
      <li v-for="meal in meals" :key="meal.idMeal">{{ meal.strMeal }}</li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(["meals"]);
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
