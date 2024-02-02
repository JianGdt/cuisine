import axios from 'axios'
import { BASE_API_URL } from '@/constant' // Update the path based on your project structure

const axiosInstance = axios.create({
  baseURL: BASE_API_URL
})

export default axiosInstance
