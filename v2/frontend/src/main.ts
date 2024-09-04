import './assets/main.css'
import PrimeVue from 'primevue/config'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axiosPlugin from './plugins/axious.plugin'

const app = createApp(App)


app.use(axiosPlugin)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
