/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-31 14:12:02
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-11-17 10:14:29
 * @FilePath: \vite-vue3-temp\src\utils\menuList.ts
 * @Description: 
 * 
 */

const menuList: any = [
  {
    name: '用户管理',
    path: '/user',
    key: 'user',
    icon: 'user',
    children: [
      {
        name: '用户简介',
        path: '/user/about',
        key: 'userAbout'
      },
      {
        name: '用户列表',
        path: '/user/list',
        key: 'userList'
      },
      {
        name: 'tim聊天',
        path: '/user/chat',
        key: 'userChat'
      },

    ]
  },
  {
    name: '数据大屏',
    path: '/largeData',
    key: 'largeData',
    icon: 'setting',
    children: [
      {
        name: 'echarts数据图表',
        path: '/largeData/screen',
        key: 'largeDataScreen'
      },


    ]
  },

]
export default menuList