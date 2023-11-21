/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-31 13:52:30
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-11-16 15:59:12
 * @FilePath: \vite-vue3-temp\src\router\modules\largeData.ts
 * @Description: 
 * 
 */

export default {
  path: '/largeData',
  name: 'largeData',
  component: () => import('@/views/BaseView.vue'),
  redirect: '/largeData/screen',
  meta: {
    defaultIndex: 'largeData',
  },
  children: [
    {
      path: '/largeData/screen',
      name: 'largeDataScreen',
      component: () => import('@/views/largeData/ScreenView.vue')
    }

  ]
}