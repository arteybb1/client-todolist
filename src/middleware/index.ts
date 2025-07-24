import { getProfile } from '@/api/user/user.api'
import { useUserStore } from '@/stores/user.pinia'
import type { Router } from 'vue-router'

const initialMiddleware = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()

    const requiresAuth = to.meta.auth === true
    const isLoggedIn = userStore.isLoggedIn

    if (requiresAuth && !isLoggedIn) {
      next({ name: 'authentication' })
    } else if (!requiresAuth && isLoggedIn && to.name === 'authentication') {
      next({ name: 'todo' })
    } else {
      next()
    }
  })
}

export default initialMiddleware
