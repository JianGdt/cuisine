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
    SET_ACTIVE_NAME(state, activeName: string) {
      state.activeName = activeName
    },
    SET_AREAS(state, areas: Area[]) {
      state.areas = areas
    },
    SET_FILTERED_MEALS(state, meals: Meal[]) {
      state.filteredMeals = meals
    },
    SET_LOADING(state, loading: boolean) {
      state.isLoading = loading
    }
  },
  actions: {
    async fetchAreas({ commit, dispatch }) {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        commit('SET_AREAS', response.data.meals)
        const activeName = response.data.meals.length > 0 ? response.data.meals[0].strArea : ''
        commit('SET_ACTIVE_NAME', activeName)
        await dispatch('fetchMeals', activeName)
      } catch (error) {
        console.error('Error fetching areas:', error)
      }
    },
    async fetchMeals({ commit }, selectedArea: string) {
      commit('SET_LOADING', true)
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
        )
        commit('SET_FILTERED_MEALS', response.data.meals)
      } catch (error) {
        console.error('Error fetching meals:', error)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {}
})
