<template>
  <div>
    <BaseForm @submit="submitForm" ref="LoginForm">
      <LoginInput
        v-model="userForm.username"
        placeholder="ID"
        :rules="[
          { required: true, message: 'please enter your ID' },
          { minLength: 3, message: 'must contain at least 3 characters' },
        ]"
      />
      <LoginInput
        v-model="userForm.password"
        label="ชื่อผู้ใช้"
        type="password"
        placeholder="Password"
        :rules="[
          { required: true, message: 'please enter your password' },
          { minLength: 3, message: 'must contain at least 3 characters' },
        ]"
      />

      <p v-if="isError" style="color: red; font-size: 14px">
        Please enter your <b>email or password</b>
      </p>
      <div class="submit-form">
        <div
          v-if="errorMessage"
          style="color: red; font-weight: bold; margin-top: 5px; margin-bottom: 5px"
        >
          {{ errorMessage }}
        </div>
        <button :class="!isFilled ? 'btn-disabled' : 'btn-active'">Sign in</button>
      </div>
    </BaseForm>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import LoginInput from '../inputs/LoginInput.vue'
import BaseForm from '../inputs/BaseForm.vue'
import { useUserStore } from '@/stores/user.pinia'
import { signIn } from '@/api/auth/auth.api'
import { getProfile } from '@/api/user/user.api'
import router from '@/router'

const userForm = reactive<any>({
  username: '',
  password: '',
})
const isFilled = ref<boolean>(false)
const isError = ref<boolean>(false)
const errorMessage = ref<string>('')
const LoginForm = ref()
const userStore = useUserStore()

const submitForm = async () => {
  try {
    const response = await signIn({ username: userForm.username, password: userForm.password })
    if (response) {
      userStore.user = response
      await userStore.fetchProfile()
      router.push('/todo')
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = 'ID or password is invalid'
  }
}

watch(
  () => [userForm.username, userForm.password],
  ([newUsername, newPassword]) => {
    isFilled.value = newUsername !== '' && newPassword !== ''
  },
)
</script>

<style scoped>
.submit-form {
  margin-top: 30px;
  button {
    border-radius: 10px;
    width: 100%;
    height: 50px;
    cursor: pointer;
    outline: none;
    border: none;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
  .btn-disabled {
    background-color: #ccc;
  }
  .btn-active {
    background-color: rgb(233, 20, 20);
  }
}
</style>
