import { createApp } from 'vue'

import './assets/style.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia)
app.mount('#app')
