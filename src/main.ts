import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import initialMiddleware from './middleware'
import { useUserStore } from './stores/user.pinia'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
initialMiddleware(router)

const userStore = useUserStore()

if (userStore.isLoggedIn) {
  userStore.fetchProfile().catch(() => {
    userStore.logout()
  })
}

app.mount('#app')
