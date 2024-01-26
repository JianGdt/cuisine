import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MealCategoryList from '@/views/MealCategoryList.vue'
import MealList from '@/views/MealList.vue'
import MealDetails from '@/views/MealDetails.vue'

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
  },
  {
    path: '/meal/:id',
    name: 'MealDetails',
    component: MealDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
