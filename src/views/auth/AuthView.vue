<template>
  <div class="login-wrapper">
    <h1 style="font-weight: bold">TODO</h1>
    <div class="login-form">
      <div class="login-tab">
        <div
          class="tab-item"
          :class="{ 'is-active': state.activeTab === 'login' }"
          @click="changeTab('login')"
        >
          <div v-if="state.activeTab === 'login'" class="circle-top-right" />
          Sign in
        </div>
        <div
          class="tab-item"
          :class="{ 'is-active': state.activeTab === 'register' }"
          @click="changeTab('register')"
        >
          <div v-if="state.activeTab === 'register'" class="circle-top-left" />
          Sign up
        </div>
      </div>
      <div class="form-area">
        <LoginForm v-if="state.activeTab === 'login'" />
        <RegisterForm v-if="state.activeTab === 'register'" />
      </div>
    </div>
    <div v-if="state.activeTab === 'login'" class="forget-wrapper">
      <a href="#"> Forget your ID or password? </a>
    </div>

    <div v-if="state.activeTab === 'login'" class="login-google-wrapper">
      <img
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt=""
        style="width: 30px; height: 30px; position: absolute; left: 110px; top: 10px"
      />
      <button class="login-google-btn">Sign in with google</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { reactive, ref } from 'vue'

const state = reactive({
  activeTab: 'login',
})

const changeTab = (page: string) => {
  state.activeTab = page
}
</script>

<style scoped>
.login-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Kanit;
  overflow-x: hidden;
  padding: 0 16px;
}

h1 {
  color: rgb(233, 20, 20);
  font-weight: bold;
  font-size: 50px;
}

.login-form {
  width: 420px;
  margin-top: 60px;
  overflow: hidden;
}
.login-tab {
  display: flex;
  text-align: center;
  cursor: pointer;
  .tab-item {
    flex: 1;
    background-color: #f4f4f4;
    padding: 15px;
    position: relative;
  }
  .tab-item:first-child {
    border-radius: 15px 0px 0px 0px;
    border-bottom: 1px solid #ccc;
  }

  .tab-item:first-child.is-active {
    border-bottom: none;
    border-radius: 15px 15px 0px 0px;
  }
  .tab-item:last-child {
    border-radius: 0px 15px 0px 0px;
    border-bottom: 1px solid #ccc;
  }

  .tab-item:last-child.is-active {
    border-bottom: none;
    border-radius: 15px 15px 0px 0px;
  }
}
.login-tab .is-active {
  border: 1px solid #ccc;
  border-radius: 15px 15px 0px 0px;
  background-color: #fff;
  border-bottom: none;
}

.form-area {
  width: 100%;
  padding: 30px;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-radius: 0px 0px 15px 15px;
}

.circle-top-right {
  position: absolute;
  top: -5px;
  right: -5px;
  z-index: -1;
  background-color: #f4f4f4;
  width: 15px;
  height: 15px;
  border-radius: 0px 100% 0px 0px;
}

.circle-top-left {
  position: absolute;
  top: -5px;
  left: -5px;
  z-index: -1;
  background-color: #f4f4f4;
  width: 15px;
  height: 15px;

  border-radius: 0px 0px 100% 0px;
}

.forget-wrapper {
  margin-top: 10px;
  a {
    color: gray;
  }
}
.login-google-wrapper {
  margin-top: 30px;
  width: 420px;
  height: 50px;
  position: relative;
  .login-google-btn {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    color: #000;
    background-color: transparent;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
