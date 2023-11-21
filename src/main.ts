/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-18 09:49:05
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-11-21 17:14:59
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

import * as ElementPlusIconsVue from '@element-plus/icons-vue'




const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.TIM = chat

app.use(createPinia())
app.use(router)

app.mount('#app')
