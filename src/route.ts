import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MealCategoryList from '@/components/MealCategoryList.vue'
import MealList from '@/components/MealList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MealCategoryList',
    component: MealCategoryList
  },
  {
    path: '/meals/:category',
    name: 'MealList',
    component: MealList,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
