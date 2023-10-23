<!--
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-18 09:49:05
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-09-05 09:31:35
 * @FilePath: \vite-vue3-temp\src\views\UsersView.vue
 * @Description: 
 * 
-->

<script setup lang="ts">
import { get, put, del } from '@/api/http.ts'
import { reactive } from 'vue'

interface User {
  username: String
  phone: String
  age: Number
}

const isShow = ref(false)
const total = ref(0)
const pageConfig = reactive({
  current: 1,
  pageSize: 10
})
const form: User = ref({
  username: '',

  age: 0,
  phone: ''
})
const tableData = ref([])
getUserList()

const delUser = (row) => {
  console.log(row)
  ElMessageBox.confirm('该操作不可逆', '是否删除该用户', {
    type: 'warning',

    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    del(`/api/user/del/${row._id}`).then((res) => {
      if (res.ok === 0) {
        return ElMessage.error(res.msg)
      }
      getUserList()
      return ElMessage.success('删除成功')
    })
  })
}
const edit = (row) => {
  form.value = { ...row }
  isShow.value = true
}
const confirm = () => {
  isShow.value = false
  put(`/api/user/update/${form.value._id}`, { ...form.value }).then((res) => {
    if (res.ok === 0) {
      return ElMessage.error(res.msg)
    }
    form.value = {}
    getUserList()

    return ElMessage.success('修改成功')
  })
}

function handleSizeChange() {
  getUserList()
}
function handleCurrentChange() {
  getUserList()
}
function getUserList() {
  const params = {
    current: pageConfig.current,
    pageSize: pageConfig.pageSize
  }
  get('/api/user/list', {
    params
  }).then((res) => {
    if (res.ok === 0) {
      return ElMessage.error(res.msg)
    }
    tableData.value = res.data
    total.value = res.total
  })
}
</script>

<template>
  <div class="me-page">
    <div class="me-table">
      <el-table :data="tableData">
        <el-table-column prop="username" label="用户名" min-width="180" />
        <el-table-column prop="phone" label="电话号码" />
        <el-table-column prop="age" label="年龄" />

        <el-table-column prop="sort" label="排序" />
        <el-table-column fixed="right" label="Operations" min-width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="edit(scope.row)">修改</el-button>
            <el-button link type="primary" size="small" @click="delUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      class="pagination"
      v-model:current-page="pageConfig.current"
      v-model:page-size="pageConfig.pageSize"
      :page-sizes="[5, 10, 50, 100, 500]"
      :small="false"
      :disabled="false"
      :background="false"
      layout="sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog title="修改信息" v-model="isShow">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>

        <el-form-item label="电话号码" type="phone">
          <el-input v-model="form.phone" />
        </el-form-item>

        <el-form-item label="年龄">
          <el-input-number v-model="form.age" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
