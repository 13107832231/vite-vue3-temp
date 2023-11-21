/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-31 13:52:30
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-11-16 15:51:04
 * @FilePath: \vite-vue3-temp\src\router\modules\user.ts
 * @Description: 
 * 
 */

export default {
  path: '/user',
  name: 'user',
  component: () => import('@/views/BaseView.vue'),
  redirect: '/user/about',
  meta: {
    defaultIndex: 'user',
  },
  children: [
    {
      path: '/user/about',
      name: 'userAbout',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/user/AboutView.vue')
    },
    {
      path: '/user/list',
      name: 'userList',

      component: () => import('@/views/user/UserListView.vue')
    },
    {
      path: '/user/chat',
      name: 'userChat',

      component: () => import('@/views/user/TimChatView.vue')
    },

  ]
}