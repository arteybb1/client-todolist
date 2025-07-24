import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getProfile } from '@/api/user/user.api'

type UserPayload = {
  token: string
}

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<UserPayload | null>(null)
    const userData = ref<any>(null)
    const isLoggedIn = computed(() => !!user.value?.token)

    const logout = () => {
      user.value = null
      userData.value = null
    }

    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        if (res && res.user) {
          userData.value = res.user
          return res.user
        }
      } catch (error) {
        throw error
      }
    }

    return {
      user,
      userData,
      isLoggedIn,
      logout,
      fetchProfile,
    }
  },
  {
    persist: true,
  },
)
