/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-18 09:49:05
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-11-16 16:03:08
 * @FilePath: \vite-vue3-temp\src\router\index.ts
 * @Description: 
 * 
 */
import { createRouter, createWebHistory } from 'vue-router'

import SysLayout from '@/views/components/Layout/SysLayout.vue'


const files: any = import.meta.globEager("./modules/*.ts");

const modules: any = {};
Object.keys(files).forEach((key) => {
  if (key === "./index.js") return;
  const keyName: string = key.replace(/(\.\/|\.ts)/g, "").replace("modules/", "");
  modules[keyName] = files[key].default;
});

interface Routers {
  path: string;
  component?: Function;
  name?: string;
  redirect?: string;
  meta?: {
    title: string;
    icon?: string;
  };
  children?: Routers[];
}

const router: Routers[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/user',
    component: SysLayout,
    children: [
      modules.user,
      modules.largeData,
    ]
  },

  {
    path: '/login',
    name: 'userLogin',

    component: () => import('@/views/LoginView.vue')
  }
];
const cRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: router as RouteRecordRaw[],
})

export default cRouter
