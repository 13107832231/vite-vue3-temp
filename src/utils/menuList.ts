/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-31 14:12:02
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-10-19 13:40:49
 * @FilePath: \vite-vue3-temp\src\utils\menuList.ts
 * @Description: 
 * 
 */

const menuList: any = [
  {
    name: '用户管理',
    path: '/user',
    key: 'user',
    children: [
      {
        name: '用户简介',
        path: '/user/about',
        key: 'userAbout'
      },
      {
        name: '用户列表',
        path: '/user/list',
        key: 'user/List'
      },
      {
        name: 'tim聊天',
        path: '/user/chat',
        key: 'userChat'
      },

    ]
  },

]
export default menuList