import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getProfile } from '@/api/user/user.api'

type UserPayload = {
  access_token: string
  refresh_token: string
}

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<UserPayload | null>(null)

    const user = ref<any>(null)
    const isLoggedIn = computed(() => !!token.value?.access_token)

    const logout = () => {
      token.value = null
      user.value = null
    }

    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        if (res && res.user) {
          user.value = res.user
          return res.user
        }
      } catch (error) {
        throw error
      }
    }

    const setToken = (newToken: UserPayload) => {
      token.value = newToken
    }

    return {
      token,
      user,
      isLoggedIn,
      logout,
      setToken,
      fetchProfile,
    }
  },
  {
    persist: true,
  },
)
