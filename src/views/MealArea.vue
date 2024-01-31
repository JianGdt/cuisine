<template>
  <div>
    <h1 class="text-4xl text-main text-start">Best Recipes</h1>
  </div>
  <el-tabs v-model="store.state.activeName" class="customTabs" @tab-click="handleClick">
    <el-tab-pane
      :label="area.strArea"
      :name="area.strArea"
      v-for="area in store.state.areas"
      :key="area.strArea"
    >
      <div v-if="store.state.isLoading">
        <CardsSkeleton />
      </div>
      <div v-else>
        <div v-if="store.state.filteredMeals.length > 0">
          <SearchBar @search="handleSearch" />
          <ul class="grid grid-cols-1 p-12 md:grid-cols-3 lg:grid-cols-4 gap-9">
            <MealItem v-for="meal in store.state.filteredMeals" :key="meal.idMeal" :meal="meal" />
          </ul>
        </div>
        <div v-else>
          <p class="text-main">No meals found for the selected area.</p>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import CardsSkeleton from '@/components/skeleton/CardsSkeleton.vue'
import MealItem from '@/components/MealItem.vue'
import SearchBar from '@/views/SearchBar.vue'

const store = useStore()
const searchQuery = ref('')

const handleClick = (tab: TabsPaneContext) => {
  store.dispatch('fetchMeals', tab.paneName as string)
}

const handleSearch = (query: string) => {
  searchQuery.value = query
  filterMeals()
}

const filterMeals = () => {
  const filteredByName = searchQuery.value.trim().toLowerCase()
  store.dispatch('filterMealsByName', filteredByName)
}

const onMounted = async () => {
  await store.dispatch('fetchAreas')
}

onMounted()
watch(searchQuery, filterMeals)
</script>

<style lang="scss" scoped>
.customTabs > .el-tabs__content {
  padding: 32px;
  color: #ffffff;
  font-size: 32px;
  font-weight: 600;
}

.el-skeleton {
  margin-bottom: 20px;
}
</style>
