// useFetch.ts
import { ref } from 'vue'

export function useFetch(url: string) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(true)

  const fetchData = async () => {
    isLoading.value = true
    try {
      const response = await fetch(url)
      const json = await response.json()
      data.value = json
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  fetchData() // Automatically fetch data when the component is mounted

  return { data, error, isLoading, fetchData }
}
