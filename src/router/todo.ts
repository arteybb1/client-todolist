import TodoView from '@/views/todo/TodoView.vue'
import type { RouteRecordRaw } from 'vue-router'

const todoRoute: RouteRecordRaw = {
  path: '/todo',
  name: 'todo',
  meta: { auth: true },
  component: TodoView,
}

export default todoRoute
