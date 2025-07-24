import axios from 'axios'
import { useUserStore } from '@/stores/user.pinia'
import { refreshToken } from './auth/auth.api'

const api = axios.create({
  baseURL: import.meta.env.VITE_CONFIG_BASE_URL,
  timeout: 10000,
})

// Request: แนบ access token
api.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.token?.access_token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const userStore = useUserStore()

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refresh_token = userStore.token?.refresh_token
        if (!refresh_token) {
          userStore.logout()
          return Promise.reject(error)
        }

        const newTokens = await refreshToken(refresh_token)

        userStore.token = newTokens

        originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`
        return api(originalRequest)
      } catch (err) {
        userStore.logout()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

export default api
