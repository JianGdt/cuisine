<template>
  <div class="search-bar">
    <el-input
        v-model="searchQuery"
        placeholder="Search for a meal..."
        :prefix-icon="Search"
      />
    <el-button type="primary" @click="searchMeals" class="search-button">
      <el-icon>
        <Search />
      </el-icon>
      <span>Search</span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'

const emit = defineEmits(
  ["search"]
);
const searchQuery = ref('');

const searchMeals = () => {
  emit("search", searchQuery.value);
};
</script>

<style scoped lang="scss">

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .search-input {
  padding: 8px;
  margin-right: 8px;
  }
.search-button {
  padding: 8px;
  cursor: pointer;
  }
}
</style>
