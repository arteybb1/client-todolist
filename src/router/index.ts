import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/todo/TodoView.vue'
import authenticationRoute from './authentication'
import todoRoute from './todo'

const routes = [authenticationRoute, todoRoute]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
