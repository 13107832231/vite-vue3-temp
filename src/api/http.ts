/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-08-18 11:06:55
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-09-04 15:31:38
 * @FilePath: \vite-vue3-temp\src\api\http.ts
 * @Description: 
 * 
 */
// api.js
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import router from '@/router/index.ts'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/', // 替换为你的后端接口地址
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在请求发送之前可以做一些处理，比如添加请求头等
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`

    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 在这里可以对响应数据进行处理
    const { authorization } = response.headers

    authorization && localStorage.setItem("token", authorization)
    console.log(response.headers, 'responseresponse1111')

    return response.data;
  },
  error => {
    const code = error.response.status

    console.log(error, 'rrr', code)
    switch (code) {
      case 401:
        console.log('400iiii', router)
        router.push('/login')
        break;

      default:
        break;
    }
    // 响应错误处理
    return Promise.reject(error);
  }
);

// 封装get请求
export function get(url: string, config?: AxiosRequestConfig) {
  return instance.get(url, config);
}

// 封装post请求
export function post(url: string, param: unknown, config?: AxiosRequestConfig) {
  return instance.post(url, param, config);
}


// 封装put请求
export function put(url: string, param: unknown, config?: AxiosRequestConfig) {
  return instance.put(url, param, config);
}
// 封装delete请求
export function del(url: string, param: unknown, config?: AxiosRequestConfig) {
  return instance.delete(url, { data: param, ...config });
}