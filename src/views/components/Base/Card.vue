<!--
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-11-16 16:08:49
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-11-17 15:01:39
 * @FilePath: \vite-vue3-temp\src\views\components\base\card.vue
 * @Description: 
 * 
-->
<template>
  <div class="card" >
    <div>
      <h3 class="title" v-if="title">{{ title }}</h3>

      <slot v-else name="title"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.card {
  margin: 20px 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  .title {
    padding: 5px 10px;
    border-bottom: 1px solid #aaa;
    margin-bottom: 10px;
  }
}
</style>
