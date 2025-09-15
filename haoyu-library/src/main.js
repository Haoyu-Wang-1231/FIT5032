import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import firebase from 'firebase/compat/app'


const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Lara
  }
})

app.use(router)

// app.use(firebase)
app.mount('#app')
