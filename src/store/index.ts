// index.ts

import { createStore } from 'vuex'
import axios from 'axios'

interface Area {
  strArea: string
}

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

interface State {
  activeName: string
  areas: Area[]
  filteredMeals: Meal[]
  isLoading: boolean
}

export default createStore({
  state: {
    activeName: '',
    areas: [],
    filteredMeals: [],
    isLoading: true
  } as State,
  mutations: {
    setActiveName(state, activeName: string) {
      state.activeName = activeName
    },
    setAreas(state, areas: Area[]) {
      state.areas = areas
    },
    setFilteredMeals(state, meals: Meal[]) {
      state.filteredMeals = meals
    },
    setIsLoading(state, loading: boolean) {
      state.isLoading = loading
    }
  },
  actions: {
    async fetchAreas({ commit, dispatch }) {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        commit('setAreas', response.data.meals)
        const activeName = response.data.meals.length > 0 ? response.data.meals[0].strArea : ''
        commit('setActiveName', activeName)
        await dispatch('fetchMeals', activeName)
      } catch (error) {
        console.error('Error fetching areas:', error)
      }
    },
    async fetchMeals({ commit }, selectedArea: string) {
      commit('setIsLoading', true)
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
        )
        commit('setFilteredMeals', response.data.meals)
      } catch (error) {
        console.error('Error fetching meals:', error)
      } finally {
        commit('setIsLoading', false)
      }
    },
    async searchMeals({ commit }, searchQuery: string) {
      commit('setIsLoading', true)
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
        )
        commit('setFilteredMeals', response.data.meals)
      } catch (error) {
        console.error('Error searching meals:', error)
      } finally {
        commit('setIsLoading', false)
      }
    },
    async filterMealsByName({ commit, dispatch, state }, name) {
      commit('setIsLoading', true)
      try {
        if (name.trim() === '') {
          await dispatch('fetchMeals', state.activeName)
        } else {
          const filteredMeals = state.filteredMeals.filter((meal) =>
            meal.strMeal.toLowerCase().includes(name)
          )
          commit('setFilteredMeals', filteredMeals)
        }
      } catch (error) {
        console.error('Error filtering meals by name:', error)
      } finally {
        commit('setIsLoading', false)
      }
    }
  },
  getters: {}
})
