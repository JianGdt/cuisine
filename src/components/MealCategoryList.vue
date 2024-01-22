<template>
    <div>
      <h2>Meal Categories</h2>
      <ul class="grid w-full max-w-6xl grid-cols-6 place-content-center">
        <li
          v-for="category in categories"
          :key="category.idCategory"
          @click="selectCategory(category.strCategory)"
          :class="{ 'selected': category.strCategory === selectedCategory }"
          class="p-4 m-4 bg-gray-100 rounded-lg shadow-md"
        >
            <h3 class="text-lg font-bold text-black">{{ category.strCategory }}</h3>
          <img :src="category.strCategoryThumb" :alt="category.strCategory" class="object-cover w-full cursor-pointer"/>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref} from 'vue';
  
  const { categories } = defineProps(['categories']);
  const emit = defineEmits(['selectCategory']);
  
  const selectedCategory = ref<string | null>(null);
  
  const selectCategory = (category: string) => {
    selectedCategory.value = category;
    emit('selectCategory', category);
  };
  </script>
  
  <style scoped lang="scss">
  .selected {
    font-weight: bold;
    color: #1e90ff;

    .category {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 8px;
        width: 100%;
    }
  }
  </style>
  