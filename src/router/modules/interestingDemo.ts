/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-31 13:52:30
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-12-19 09:58:26
 * @FilePath: \vite-vue3-temp\src\router\modules\InterestingDemo.ts
 * @Description: 
 * 
 */

export default {
  path: '/interestingDemo',
  name: 'interestingDemo',
  component: () => import('@/views/BaseView.vue'),
  redirect: '/interestingDemo/dragAndZoomBox',
  meta: {
    defaultIndex: 'dragAndZoomBox',
  },
  children: [
    {
      path: '/interestingDemo/dragAndZoomBox',
      name: 'dragAndZoomBox',
      component: () => import('@/views/interestingDemo/DragAndZoomBox.vue')
    },
    {
      path: '/markCrossWindow',
      name: 'markCrossWindow',
      component: () => import('@/views/MarkCrossWindow/index.vue')
    },

  ]
}