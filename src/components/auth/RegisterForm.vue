<template>
  <div>
    <BaseForm @submit="submitForm">
      <LoginInput
        v-model="userForm.username"
        label="ID"
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
      <div class="submit-form">
        <button :class="!isFilled ? 'btn-disabled' : 'btn-active'">Sign up</button>
      </div>
    </BaseForm>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import LoginInput from '../inputs/LoginInput.vue'
import BaseForm from '../inputs/BaseForm.vue'
import { register } from '@/api/user/user.api'
const userForm = reactive({
  username: '',
  password: '',
})
const isFilled = ref<boolean>(false)

const submitForm = async () => {
  try {
    const payload = {
      username: userForm.username,
      password: userForm.password,
    }

    const response = await register(payload)
    if (response) {
      console.log(response)
      userForm.username = ''
      userForm.password = ''
    }
  } catch (error) {
    console.log(error)
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
    background-color: rgb(17, 170, 17);
  }
}
</style>
