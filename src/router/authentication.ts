import AuthView from '@/views/auth/AuthView.vue'
import type { RouteRecordRaw } from 'vue-router'

const authenticationRoute: RouteRecordRaw = {
  path: '/',
  name: 'authentication',
  component: AuthView,
  meta: { auth: false },
}

export default authenticationRoute
