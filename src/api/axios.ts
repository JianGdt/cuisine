import axios from 'axios'
import { BASE_API_URL } from '@/constant' 

const axiosInstance = axios.create({
  baseURL: BASE_API_URL
})

export default axiosInstance
