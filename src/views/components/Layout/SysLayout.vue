<!--
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-31 11:13:16
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-11-17 10:17:00
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
import Menu from '@/views/components/Layout/SysMenu.vue'
</script>
