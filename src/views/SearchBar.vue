<!-- SearchBar.vue -->
<template>
  <div>
    <el-input
      v-model="searchQuery"
      @input="emitSearchQuery"
      placeholder="Search by name"
      :prefix-icon="Search"
    />
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const emitSearchQuery = () => {
  emit('search', searchQuery.value)
}
</script>
