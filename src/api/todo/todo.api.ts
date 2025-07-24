import type { ICreateTodo } from '@/type/todo'
import axios from '../instance'

export const getAllTodos = async () => {
  try {
    const { data } = await axios.get(`/todos`)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const createTodo = async (payload: ICreateTodo) => {
  try {
    const { data } = await axios.post(`/todos/create`, payload)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteTodo = async (id: string) => {
  try {
    const { data } = await axios.delete(`/todos/delete/${id}`)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateTodoById = async (id: string, payload: { status: boolean }) => {
  try {
    const { data } = await axios.put(`/todos/update/${id}`, payload)
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}
