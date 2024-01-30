<template>
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
          <ul class="grid grid-cols-1 p-12 md:grid-cols-3 lg:grid-cols-4 gap-9">
            <MealItem v-for="meal in store.state.filteredMeals" :key="meal.idMeal" :meal="meal" />
          </ul>
        </div>
        <div v-else>
          <p>No meals found for the selected area.</p>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import type { TabsPaneContext } from 'element-plus'
import CardsSkeleton from '@/components/skeleton/CardsSkeleton.vue'
import MealItem from '@/components/MealItem.vue'

const store = useStore()

const handleClick = (tab: TabsPaneContext) => {
  store.dispatch('fetchMeals', tab.paneName as string)
}

const onMounted = async () => {
  await store.dispatch('fetchAreas')
}

onMounted()
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
