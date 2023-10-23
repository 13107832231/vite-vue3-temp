/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-18 09:49:05
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-10-20 11:09:41
 * @FilePath: \vite-vue3-temp\src\main.ts
 * @Description: 
 * 
 */
import './assets/main.css'
import './styles/base.less'
import chat from './utils/TIM.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'


const app = createApp(App)

app.config.globalProperties.TIM = chat

app.use(createPinia())
app.use(router)

app.mount('#app')
