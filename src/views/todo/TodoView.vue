<template>
  <div class="todo-wrapper">
    <div class="todo-inner">
      <div class="todo-box">
        <div style="display: flex; align-items: center; justify-content: space-between">
          <h2>TODO LIST</h2>

          <div>
            <button
              @click="logout"
              style="
                color: #fff;
                background-color: #000;
                width: 70px;
                height: 25px;
                border: none;
                border-radius: 25px;
                cursor: pointer;
              "
            >
              Sign out
            </button>
            User :
            {{ userStore.userData?.username }}
          </div>
        </div>

        <div class="todo-search-box">
          <input v-model="inputTodo.title" type="text" placeholder="Add Task..." />

          <button @click="create" :class="inputTodo.title ? 'btn' : 'btn-disabled'">ADD</button>
        </div>
        <div class="error-message" style="margin-top: 5px; margin-bottom: 20px; color: red">
          {{ errorSearch }}
        </div>
        <div v-if="todoListData.length > 0">
          <div v-for="todo in todoListData" :key="todo.id" class="todo-item">
            <div class="todo-content">
              <h3 class="todo-item-title">{{ todo.title }}</h3>
              <span class="todo-status">{{ todo.status }}</span>
            </div>
            <button @click="deleteTodoList(todo.id)" class="todo-delete">DELETE</button>
          </div>
        </div>
        <div v-else style="color: gray; font-size: 18px; text-align: center; margin-top: 30px">
          Empty Task...
        </div>
        <div class="todo-bottom">You have {{ todoListData.length }} tasks.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createTodo, deleteTodo, getAllTodos } from '@/api/todo/todo.api'
import router from '@/router'
import { useUserStore } from '@/stores/user.pinia'
import type { ICreateTodo, ITodo } from '@/type/todo'
import { onMounted, ref } from 'vue'
const userStore = useUserStore()
const todoListData = ref<ITodo[]>([])
const inputTodo = ref<ICreateTodo>({
  title: '',
})
const errorSearch = ref<string>('')
const fetchAllTodo = async () => {
  try {
    const response = await getAllTodos()
    if (response) {
      todoListData.value = response.todos
      console.log(response)
    }
  } catch (error) {
    console.log('error', error)
  }
}

const create = async () => {
  try {
    if (!inputTodo.value.title) {
      errorSearch.value = 'just enter your task'
      return
    }
    errorSearch.value = ''
    const payload = {
      user_id: userStore.userData.id,
      title: inputTodo.value.title,
    }
    const response = await createTodo(payload)
    if (response) {
      inputTodo.value.title = ''
      await fetchAllTodo()
    }
  } catch (error) {
    console.log('error', error)
  }
}

const logout = () => {
  userStore.logout()
  router.push('/')
}

const deleteTodoList = async (id: string) => {
  try {
    const response = await deleteTodo(id)
    if (response) {
      await fetchAllTodo()
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchAllTodo()
})
</script>

<style scoped>
.btn-disabled {
  background-color: #666;
}
.todo-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #e60012;
  display: flex;
  justify-content: center;
  align-items: center;
}
.todo-box {
  background-color: #fff;
  border-radius: 30px;
  width: 600px;
  min-height: 300px;
  padding: 30px;
  position: relative;
  .todo-bottom {
    position: absolute;
    bottom: 10px;
  }
}
.todo-search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  input {
    flex-grow: 1;
    height: 40px;
    border: 3px solid #000;
    border-radius: 35px;
    padding-left: 10px;
  }
  input:focus {
    outline: none;
  }
  button {
    background-color: #e60012;
    width: 75px;
    height: 40px;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: 0.4s;
    border: 3px solid #000;
    font-weight: bold;
  }
  button:hover {
    filter: brightness(95%);
    transition: 0.4s;
  }
}
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 15px;
  padding: 15px 20px;
  margin-bottom: 30px;

  .todo-content {
    display: flex;
    flex-direction: column;
  }

  .todo-item-title {
    font-size: 18px;
    margin: 0;
  }

  .todo-status {
    font-size: 14px;
    color: #666;
  }

  .todo-delete {
    background-color: #000;
    width: 75px;
    height: 40px;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: 0.3s;
    border: 3px solid #000;
    font-weight: bold;
  }

  .todo-delete:hover {
    filter: brightness(85%);
  }
}
</style>
