import { useUserStore } from '@/stores/user.pinia'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_CONFIG_BASE_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.user?.token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
