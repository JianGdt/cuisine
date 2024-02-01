<template>
  <div class="pl-0 md:pl-12">
    <input
      v-model="searchQuery"
      @input="emitSearchQuery"
      placeholder="Search by name..."
      class="w-full md:w-[300px] justify-start items-start flex p-2 font-bold rounded-md outline-none placeholder-dark"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const emitSearchQuery = () => {
  emit('search', searchQuery.value)
}
</script>
