<!--
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-18 09:49:05
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-09-12 15:22:33
 * @FilePath: \vite-vue3-temp\src\views\LoginView.vue
 * @Description: 
 * 
-->
<script setup lang="ts">
import { post } from '@/api/http'

import { useRouter } from 'vue-router'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
interface User {
  username: String
  password: String
  avatar: String
  age: Number
  phone: String
}

const loginForm: User = reactive({
  username: '',
  password: ''
})
const registerForm: User = reactive({
  username: '',
  password: '',
  avatar: '',
  age: 0,
  phone: ''
})

const activeName = ref('register')
const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  console.log(response, uploadFile, 'response, uploadFile')
  imageUrl.value = URL.createObjectURL(response.file)
  registerForm.avatar = response.file
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!['image/jpeg', 'image/png'].includes(rawFile.type)) {
    ElMessage.error('Avatar picture must be JPG or PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

/**
 * 注册
 */
const registerFun = () => {
  let formData: any = new FormData()
  formData.append('username', registerForm.username)
  formData.append('password', registerForm.password)
  formData.append('age', registerForm.age)
  formData.append('phone', registerForm.phone)
  formData.append('avatar', registerForm.avatar)
  post('/api/user/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res: any) => {
    if (res.ok === 0) {
      return ElMessage.error(res.msg)
    }

    return ElMessage.success(res.msg)
  })
}
const loginFun = () => {
  post('/api/user/login', { ...loginForm }).then((res: any) => {
    console.log(res, 'res')
    if (res.ok === 0) {
      return ElMessage.error(res.msg)
    }

    ElMessage.success('登录成功')
    router.push('/')
  })
}

let str = '([]){}'

var isValid = function (s) {
  const n = s.length
  if (n % 2 === 1) {
    return false
  }
  const pairs = new Map([
    [')', '('],
    [']', '['],
    ['}', '{']
  ])
  const stk = []
  for (let ch of s) {
    console.log(ch, 'ccc', pairs.has(ch))
    if (pairs.has(ch)) {
      if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
        return false
      }
      stk.pop()
    } else {
      stk.push(ch)
    }
    console.log(stk, 'stkstk')
  }
  return !stk.length
}

console.log(isValid(str))
</script>

<template>
  <main class="container">
    <h2 class="title">vue3-vite-后台管理系统</h2>
    <div class="card-box">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" label-width="120px">
            <el-form-item label="用户名">
              <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="loginForm.password" />
            </el-form-item>

            <el-form-item>
              <el-button @click="loginFun">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="registerForm" label-width="120px">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :http-request="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="registerForm.username" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="registerForm.password" />
            </el-form-item>
            <el-form-item label="电话号码" type="phone">
              <el-input v-model="registerForm.phone" />
            </el-form-item>

            <el-form-item label="年龄">
              <el-input-number v-model="registerForm.age" />
            </el-form-item>
            <el-form-item>
              <el-button @click="registerFun">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </main>
</template>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100vh;
  .card-box {
    width: 500px;
    height: 400px;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 10px 30px 10px;
    margin-top: 50px;
  }
  .title {
    margin-top: 50px;
    text-align: center;
  }
  .avatar-uploader {
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
