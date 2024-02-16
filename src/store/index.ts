import { createStore } from 'vuex'
import axios from 'axios'
import { BASE_API_URL } from '@/api/constant'

type Area = {
  strArea: string
}

type Meal = {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

type State = {
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
    isLoading: false
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
        const response = await axios.get(`${BASE_API_URL}/list.php?a=list`)
        commit('setAreas', response.data.meals)
        const activeName = response.data.meals[0].strArea
        commit('setActiveName', activeName)
        await dispatch('fetchMeals', activeName)
      } catch (error) {
        console.error('Error fetching areas:', error)
      }
    },
    async fetchMeals({ commit }, selectedArea: string) {
      commit('setIsLoading', true)
      try {
        const response = await axios.get(`${BASE_API_URL}/filter.php?a=${selectedArea}`)
        commit('setFilteredMeals', response.data.meals)
      } catch (error) {
        console.error('Error fetching meals:', error)
      } finally {
        commit('setIsLoading', false)
      }
    },
    async searchMeals({ commit }, searchMealsByName: string) {
      commit('setIsLoading', true)
      try {
        const response = await axios.get(`${BASE_API_URL}/search.php?s=${searchMealsByName}`)
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
