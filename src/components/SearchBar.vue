<template>
  <div>
    <input v-model="searchQuery" placeholder="Enter a meal name" />
    <button @click="searchMeals">Search</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits(["search"]);

const searchMeals = () => {
  emit("search", searchQuery.value);
};
</script>

<style scoped>
input {
  padding: 8px;
  margin-right: 8px;
}

button {
  padding: 8px;
  cursor: pointer;
}
</style>
