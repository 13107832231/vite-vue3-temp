<!--
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-31 11:13:16
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-11-17 10:15:52
 * @FilePath: \vite-vue3-temp\src\views\components\Layout\SysMenu.vue
 * @Description: 
 * 
-->
<template>
  <div class="menu-box" :style="{ width: isCollapse ? '60px' : '220px' }">
    <div class="menu-title">
      <span>管理后台</span>
      <span class="icon" @click="toggleFun">
        <el-icon v-if="isCollapse"><Expand /></el-icon>
        <el-icon v-else><Fold /></el-icon>
      </span>
    </div>
    <el-menu
      :collapse="isCollapse"
      :default-active="activeMenuKey"
      class="menu-content"
      @open="handleOpen"
      @close="handleClose"
      @select="headerMenuSelect"
    >
      <template v-for="item in menuList" :key="item.key">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.key">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>

            <span>{{ item.name }}</span>
          </template>

          <el-menu-item
            :index="sub.key"
            v-for="sub in item.children"
            :key="sub.key"
            @click="goPage(sub.path)"
            >{{ sub.name }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item :index="item.key" @click="goPage(sub.path)" v-else>
          {{ item.name }}
        </el-menu-item>
      </template>

      <!-- <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

import menuList from '@/utils/menuList.ts'

const router = useRouter()
const route = useRoute()
const isCollapse = ref()
onMounted(() => {
  console.log(1231)
})
const activeMenuKey = computed(() => {
  return router.currentRoute.value.name
})

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const headerMenuSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const goPage = (path: string) => {
  router.push({ path: path })
}
const toggleFun = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="less" scoped>
.menu-box {
  width: 220px;
  .menu-title {
    font-size: 16px;
    padding: 0px 15px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    .icon {
      cursor: pointer;
    }
  }
  .menu-content {
    border-right: none;
  }
}
</style>
