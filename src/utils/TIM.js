/*
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-10-20 10:14:29
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-10-20 11:09:27
 * @FilePath: \vite-vue3-temp\src\utils\TIM.js
 * @Description:
 *
 */
// 如果您已集成 v2.x 的 SDK，想升级到 V3 并且想尽可能地少改动项目代码，可以继续沿用 TIM
// import TIM from '@tencentcloud/chat';
import TencentCloudChat from '@tencentcloud/chat'
import TIMUploadPlugin from 'tim-upload-plugin'
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin'
// import { genTestUserSig, EXPIRETIME } from './getUserSig/GenerateTestUserSig'

let options = {
  SDKAppID: 1400505295 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
}

  // 创建 SDK 实例，`TencentCloudChat.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let chat = TencentCloudChat.create(options) // SDK 实例通常用 chat 表示

chat.setLogLevel(0) // 普通级别，日志量较多，接入时建议使用
// chat.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

// 注册腾讯云即时通信 IM 上传插件
chat.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })

// 注册腾讯云即时通信 IM 本地审核插件
chat.registerPlugin({ 'tim-profanity-filter-plugin': TIMProfanityFilterPlugin })

// const loginOptions = genTestUserSig({
//   SDKAppID: 1400505295,
//   secretKey: '287e7887288c76e1a778fd8eb11ed7fb5d6f7d12136b070b6d655b3ed9397b9f',
//   userID: '123456'
// })
// const userInfo = {
//   userID: '123456',
//   userSig: loginOptions.userSig
// }
// chat.login(userInfo)



// let onSdkReady = function (event) {
//   let message = chat.createTextMessage({
//     to: '123',
//     conversationType: 'C2C',
//     payload: { text: 'Hello world!' }
//   })
//   chat.sendMessage(message)
// }
// chat.on(TencentCloudChat.EVENT.SDK_READY, onSdkReady)

// let onMessageReceived = function (event) {
//   // event.data - 存储 Message 对象的数组 - [Message]
// }
// chat.on(TencentCloudChat.EVENT.MESSAGE_RECEIVED, onMessageReceived)

// let onMessageModified = function (event) {
//   // event.data - 存储被修改过的 Message 对象的数组 - [Message]
// }
// chat.on(TencentCloudChat.EVENT.MESSAGE_MODIFIED, onMessageModified)

// let onSdkNotReady = function (event) {
//   // chat.login({userID: 'your userID', userSig: 'your userSig'});
// }
// chat.on(TencentCloudChat.EVENT.SDK_NOT_READY, onSdkNotReady)
export default chat
