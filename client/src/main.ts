import { createApp } from 'vue'
import App from './App.vue'
import createRouter from "@/router"
import '@/assets/main.less'
import { createPinia } from 'pinia'
import { vuetify } from '@/plugins/vuetify.ts'
import 'vuetify/styles'
import axios from 'axios'
import VueAxios from 'vue-axios';
import '@mdi/font/css/materialdesignicons.min.css'


const pinia = createPinia()
const router = createRouter()

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .use(VueAxios, axios)
  .mount('#app')
