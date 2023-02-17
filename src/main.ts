import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './style.css'
import App from './App.vue'

const pinia = createPinia()
createApp(App)
  .use(Antd)
  .use(pinia)
  .mount('#app')
