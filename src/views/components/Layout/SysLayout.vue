<!--
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-31 11:13:16
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-09-05 09:22:38
 * @FilePath: \vite-vue3-temp\src\views\components\Layout\SysLayout.vue
 * @Description: 
 * 
-->
<template>
  <div class="sys-container">
    <div class="sys-menu">
      <Menu></Menu>
    </div>
    <div class="sys-content">
      <div class="sys-header">
        <span>用户：xxxx</span>
        <span>
          <el-icon><Setting /></el-icon>
        </span>
      </div>
      <div class="sys-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import Menu from '@/views/components/Layout/SysMenu.vue'
</script>
