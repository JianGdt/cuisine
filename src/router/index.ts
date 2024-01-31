import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import MealArea from '@/views/MealArea.vue'
import MealDetails from '@/views/MealDetails.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MealArea',
    component: MealArea,
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
