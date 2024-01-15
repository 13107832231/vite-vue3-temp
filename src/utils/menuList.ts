/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-31 14:12:02
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2024-01-12 13:56:58
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
  {
    name: '有趣的示例',
    path: '/interestingDemo',
    key: 'dragAndZoomBox',
    icon: 'setting',
    children: [
      {
        name: '拖拽缩放盒子',
        path: '/interestingDemo/dragAndZoomBox',
        key: 'dragAndZoomBox'
      },
      {
        name: '跨窗口渲染动画',
        path: '/markCrossWindow',
        key: 'markCrossWindow'
      },
      {
        name: '流动边框',
        path: '/interestingDemo/flowingBorder',
        key: 'flowingBorder'
      },
      {
        name: '传送阵动画',
        path: '/interestingDemo/transferAnimation',
        key: 'transferAnimation'
      },


    ]
  },

]
export default menuList