<!--
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-10-19 13:41:02
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-11-23 15:38:08
 * @FilePath: \vite-vue3-temp\src\views\user\TimChatView.vue
 * @Description: 
 * 
-->
<template>
  <div class="container">
    <div class="chat-left">
      <div class="chat-action">
        <el-button :icon="Plus" text bg @click="openSearch">发起单聊</el-button>
      </div>

      <div class="user-list" v-loading="userListLoading">
        <div
          :class="['user-item', item.conversationID === currentUser?.conversationID && 'selected']"
          v-for="item in userList"
          :key="item.userId"
          @click="selectUserFun(item)"
          @click.prevent.right="toggleDialog(item)"
          ref="userItemRef"
        >
          <div
            v-show="rightClickToggle && item.conversationID === curRightMenuInfo?.conversationID"
            class="right-menu"
            ref="rightMenuRef"
          >
            <div v-for="button in rightMenuButtons" :key="button.text">
              <el-button :type="button.type" text @click.stop="button.clickFunc">
                {{ button.text }}
              </el-button>
            </div>
          </div>
          <img
            class="avatar"
            :src="item.avatar || 'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'"
            alt=""
            srcset=""
          />
          <div class="mid">
            <div class="name">{{ item.userProfile?.userID }}</div>
            <div class="cur">{{ item.lastMessage?.messageForShow }}</div>
          </div>
          <span class="time">{{ caculateTimeago(item.lastMessage?.lastTime * 1000) }}</span>
        </div>
      </div>
    </div>

    <div class="chat-content" v-if="currentUser?.conversationID">
      <div class="chat-header">
        <div>{{ currentUser?.userProfile?.userID }}</div>

        <div></div>
      </div>
      <div v-loading="chatLoading" class="message-list" ref="messageListRef">
        <div v-for="item in messageList" :key="item.userId">
          <div class="message-timestamp">{{ calculateTimestamp(item.time * 1000) }}</div>
          <div :class="['message-bubble', item.flow === 'out' && 'reverse']">
            <img
              class="avatar"
              :src="
                item.avatar || 'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'
              "
              alt=""
            />
            <div class="msg-area" v-if="item.type == 'TIMTextElem'">
              <div :class="['text-content', item.flow === 'out' ? 'msg-out' : 'msg-in']">
                {{ item.payload?.text }}
              </div>
            </div>
            <div class="msg-area" v-if="item.type == 'TIMImageElem'">
              <el-image
                :class="['img-content', item.flow === 'out' ? 'msg-out' : 'msg-in']"
                :src="item.payload?.imageInfoArray?.[0]?.url"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="[item.payload?.imageInfoArray?.[0]?.url]"
                fit="cover"
              />
              <div class="progress" v-if="item.progress">
                <el-progress :percentage="item.progress" :color="colors" />
              </div>
            </div>
            <div class="msg-area" v-if="item.type == 'TIMVideoFileElem'">
              <div
                class="message-video-box"
                :style="{
                  width: item.payload.snapshotWidth / 4.3,
                  height: item.payload.snapshotHeight / 4.3
                }"
              >
                <video
                  :width="item.payload.snapshotWidth / 4.3"
                  :height="item.payload.snapshotHeight / 4.3"
                  class="video"
                  :src="item.payload.remoteVideoUrl"
                  controls
                  preload="metadata"
                ></video>
              </div>

              <div class="progress" v-if="item.progress">
                <el-progress :percentage="item.progress" :color="colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-footer">
        <div class="func">
          <div class="func-main">
            <span class="icon-pic">
              <el-icon><Picture /></el-icon>
              <input type="file" data-type="image" accept="image/*" @change="getFile" />
            </span>
            <span class="icon-video">
              <el-icon><VideoCamera /></el-icon>
              <input
                type="file"
                accept="video/*"
                capture="user"
                ref="videoFile"
                @change="(e) => createImageMessage(e.target.files[0], 'video')"
              />
            </span>
          </div>
        </div>
        <div class="message-input">
          <div class="message-input-container">
            <div class="message-input-area">
              <!-- <div
                class="tiptap ProseMirror"
                ref="textarea"
                contenteditable="true"
                tabindex="1"
                placeholder="请输入"
                @keydown="textareaKeydown($event)"
                @drop="(e) => handleFileDropOrPaste(e, 'drop')"
                @paste="(e) => handleFileDropOrPaste(e, 'paste')"
              ></div> -->
              <div
                class="tiptap ProseMirror"
                ref="textarea"
                contenteditable="true"
                tabindex="1"
                spellcheck="false"
                translate="no"
                :placeholder="placeholder"
                @keydown="textareaKeydown($event)"
              ></div>
            </div>
            <div class="message-input-button" @click="sendFun">
              <div class="message-input-button-cont" data-type="text">
                <p class="message-input-button-hover"></p>
                发送
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="chat-null">欢迎使用im聊天</div>
    <el-dialog v-model="dialogVisible" title="登录im" width="40%">
      <el-input placeholder="请输入userId" v-model="curUserID"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="IMLogin"> 登录 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogSearchVisible" title="发起单聊" width="80%">
      <div class="search-container">
        <div class="left">
          <el-input
            placeholder="请输入userId"
            v-model="searchUserID"
            @keyup.enter="handleSearch"
          ></el-input>
          <el-radio-group class="radio-group" v-model="curSearchUser">
            <el-radio
              v-for="item in searchUserList"
              :key="item.userID"
              :label="item.userID"
              size="large"
            >
              <div class="user-item">
                <img
                  class="avatar"
                  :src="
                    item.avatar ||
                    'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'
                  "
                  alt=""
                />
                <span class="name">{{ item.userID }}</span>
              </div>
            </el-radio>
          </el-radio-group>
        </div>
        <div class="right">
          <div>发起单聊</div>

          <div v-if="curSearchUserInfo" class="user-item">
            <img
              class="avatar"
              :src="
                curSearchUserInfo.avatar ||
                'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'
              "
              alt=""
            />
            <span>{{ curSearchUserInfo.userID }}</span>
          </div>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogSearchVisible = false">取消</el-button>
          <el-button :disabled="!curSearchUserInfo" type="primary" @click="startChatting">
            完成
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import TencentCloudChat from '@tencentcloud/chat'
import { genTestUserSig } from '@/utils/getUserSig/GenerateTestUserSig'
import { SDKAppID, secretKey } from '@/config/timConfig'
import { onClickOutside, useElementBounding } from '@vueuse/core'
import {
  base64ToFile,
  isBase64,
  urlToFile,
  caculateTimeago,
  calculateTimestamp
} from '@/utils/util'
import { getCurrentInstance, ref } from '@vue/runtime-core'
const {
  appContext: {
    config: {
      globalProperties: { TIM }
    }
  }
} = getCurrentInstance()
const rightMenuRef = ref(null)
const userItemRef = ref(null)

const userList = ref()
const userListLoading = ref(false)
const chatLoading = ref(false)
const currentUser = ref({})
// 消息列表
const messageList = ref()
const textarea = ref()
const messageListRef = ref()
const dialogVisible = ref(false)
const dialogSearchVisible = ref(false)
const curUserID = ref('123456')
const searchUserID = ref()

const curSearchUser = ref('')
const searchUserList = ref([])
const curSearchUserInfo = computed(() => {
  return searchUserList.value.find((item) => item.userID === curSearchUser.value)
})

const curRightMenuInfo = ref()
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 }
]

const rightClickToggle = ref(false)

const rightMenuButtons = [
  {
    type: 'primary',
    text: '删除会话',
    clickFunc: () => {
      console.log('删除会话')
      console.log(curRightMenuInfo.value, 'curRightMenuInfo')
      TIM.deleteConversation(curRightMenuInfo.value.conversationID)
    }
  },
  {
    type: 'success',
    text: '置顶会话',
    clickFunc: () => {
      console.log('置顶会话')
    }
  },
  {
    type: 'info',
    text: '消息免打扰',
    clickFunc: () => {
      console.log('消息免打扰')
    }
  }
]
// 点击外部关闭右键菜单
onClickOutside(rightMenuRef, () => {
  rightClickToggle.value = false
})

let placeholder = ref('请输入消息')

userList.value = [
  // {
  //   url: 'https://web.sdk.qcloud.com/im/assets/images/Public.svg',
  //   name: '张三',
  //   time: '2023-10-19 13:10:10',
  //   userId: '123',
  //   curText: '哈哈',
  //   userProfile: {
  //     userID: '123',
  //     avatar: 'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'
  //   },
  //   lastMessage: {
  //     lastTime: 1697789616,
  //     messageForShow: '是'
  //   }
  // }
]
messageList.value = [
  // {
  //   msgType: 'text',
  //   msg: 'hahaha',
  //   isMine: true,
  //   userId: '123',
  //   url: 'https://web.sdk.qcloud.com/im/assets/images/Public.svg'
  // },
  // {
  //   msgType: 'text',
  //   msg: '对对对',
  //   isMine: false,
  //   userId: '456',
  //   url: 'https://web.sdk.qcloud.com/im/assets/images/Public.svg'
  // },
  // {
  //   msgType: 'img',
  //   msg: '6666',
  //   isMine: true,
  //   userId: '456',
  //   url: 'https://web.sdk.qcloud.com/im/assets/images/Public.svg',
  //   imgUrl:
  //     'https://cos.ap-shanghai.myqcloud.com/caae-shanghai-007-sharedv4-02-1303031839/6ea1-1400505295/6e35-12345/8328b444e377c5b9634f189cfec0fb71-151032.png?imageMogr2/'
  // },
  // {
  //   msgType: 'img',
  //   msg: '6666',
  //   isMine: false,
  //   userId: '456',
  //   url: 'https://web.sdk.qcloud.com/im/assets/images/Public.svg',
  //   imgUrl:
  //     'https://cos.ap-shanghai.myqcloud.com/caae-shanghai-007-sharedv4-02-1303031839/6ea1-1400505295/6e35-12345/8328b444e377c5b9634f189cfec0fb71-151032.png?imageMogr2/'
  // }
]

async function sendFun(data) {
  if (textarea.value.childNodes.length === 0) {
    return
  }
  for (let i = 0; i < textarea.value.childNodes.length; i++) {
    const element = textarea.value.childNodes[i]
    console.log(element, 'element', element.nodeValue, textarea.value)
    if (element.nodeName === '#text') {
      let message = TIM.createTextMessage({
        to: currentUser.value.userProfile.userID,
        conversationType: TencentCloudChat.TYPES.CONV_C2C,
        payload: { text: element.nodeValue }
      })
      TIM.sendMessage(message)
    } else if (element.nodeName === 'IMG') {
      let file = ''
      if (isBase64(element.currentSrc)) {
        file = base64ToFile(element.currentSrc)
      } else {
        file = await urlToFile(element.currentSrc)
      }

      console.log(file, isBase64(element.currentSrc), 'dd')
      createImageMessage(file, 'image')
    }
  }
  textarea.value.innerHTML = ''
}
function textareaRange() {
  var el = textarea
  var range = document.createRange()
  //返回用户当前的选区
  var sel = document.getSelection()
  //获取当前光标位置
  var offset = sel.focusOffset
  //div当前内容
  var content = el.innerHTML //添加换行符\n
  el.innerHTML = content.slice(0, offset) + '\n' + content.slice(offset) //设置光标为当前位置
  range.setStart(el.childNodes[0], offset + 1)
  //使得选区(光标)开始与结束位置重叠
  range.collapse(true)
  //移除现有其他的选区
  sel.removeAllRanges()
  //加入光标的选区
  sel.addRange(range)
}

function textareaKeydown(event) {
  console.log(event.target.childNodes, 'event')
  if (event.ctrlKey && event.keyCode === 13) {
    //ctrl+enter
    textareaRange()
  } else if (event.keyCode === 13) {
    //enter
    sendFun()
    event.preventDefault() // 阻止浏览器默认换行操作
    return false
  }
}

const IMLogin = () => {
  userListLoading.value = true

  const loginOptions = genTestUserSig({
    SDKAppID,
    secretKey,
    userID: curUserID.value
  })
  console.log(loginOptions, 'loginOptions', SDKAppID, secretKey, curUserID)
  const userInfo = {
    userID: curUserID.value,
    userSig: loginOptions.userSig
  }
  TIM.login(userInfo)
    .then((res) => {
      console.log(res, '1111')
      if (res.repeatLogin) {
        TIM.logout()
        IMLogin()
      }
    })
    .catch((err) => {
      console.log(err, 'eee')
    })

  dialogVisible.value = false
}

let onMessageReceived = function (event) {
  // event.data - 存储 Message 对象的数组 - [Message]
  messageList.value = event.data
  console.log(messageList.value, ' messageList.value111')
  messageList.value.forEach((message) => {
    if (message.type === TencentCloudChat.TYPES.MSG_TEXT) {
      // 文本消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.TextPayload
    } else if (message.type === TencentCloudChat.TYPES.MSG_IMAGE) {
      // 图片消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.ImagePayload
    } else if (message.type === TencentCloudChat.TYPES.MSG_SOUND) {
      // 音频消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.AudioPayload
    } else if (message.type === TencentCloudChat.TYPES.MSG_VIDEO) {
      // 视频消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.VideoPayload
    } else if (message.type === TencentCloudChat.TYPES.MSG_FILE) {
      // 文件消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.FilePayload
    } else if (message.type === TencentCloudChat.TYPES.MSG_CUSTOM) {
      // 自定义消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.CustomPayload
    } else if (message.type === TencentCloudChat.TYPES.MSG_MERGER) {
      // 合并消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.MergerPayload
    } else if (message.type === TencentCloudChat.TYPES.MSG_LOCATION) {
      // 地理位置消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.LocationPayload
    } else if (message.type === TencentCloudChat.TYPES.MSG_GRP_TIP) {
      // 群提示消息 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.GroupTipPayload
    } else if (message.type === TencentCloudChat.TYPES.MSG_GRP_SYS_NOTICE) {
      // 群系统通知 - https://web.sdk.qcloud.com/im/doc/v3/zh-cn/Message.html#.GroupSystemNoticePayload
    }
  })
}

TIM.on(TencentCloudChat.EVENT.MESSAGE_RECEIVED, onMessageReceived)

IMLogin()

let onSdkNotReady = function (event) {
  // chat.login({userID: 'your userID', userSig: 'your userSig'});
}
TIM.on(TencentCloudChat.EVENT.SDK_NOT_READY, onSdkNotReady)

// 会话列表更新，event.data 是包含 Conversation 对象的数组。
let onConversationListUpdated = function (event) {
  console.log(event.data, '22222222222222222') // 包含 Conversation 实例的数组
  // userList.value = event.data

  userListLoading.value = false

  getConversationList()
}
TIM.on(TencentCloudChat.EVENT.CONVERSATION_LIST_UPDATED, onConversationListUpdated)

let onSdkReady = function (event) {
  console.log('onSdkReady')
}
TIM.on(TencentCloudChat.EVENT.SDK_READY, onSdkReady)

// 获取全量的会话列表
function getConversationList() {
  let promise = TIM.getConversationList()
  promise
    .then(function (imResponse) {
      console.log(imResponse, '全量会话列表')
      // 全量的会话列表，用该列表覆盖原有的会话列表
      const conversationList = imResponse.data.conversationList
      userList.value = conversationList
      selectUserFun(userList.value[0])
      // 从云端同步会话列表是否完成
      const isSyncCompleted = imResponse.data.isSyncCompleted
      console.log(conversationList, 'conversationList', isSyncCompleted, imResponse)
    })
    .catch(function (imError) {
      // 获取会话列表失败的相关信息
      console.warn('getConversationList error:', imError)
    })
}
function getMessageList(params = {}) {
  if (!params.conversationID) return
  chatLoading.value = true

  let promise = TIM.getMessageList({ conversationID: params.conversationID })
  promise.then(function (imResponse) {
    chatLoading.value = false
    messageList.value = imResponse.data.messageList // 消息列表。
    const nextReqMessageID = imResponse.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
    const isCompleted = imResponse.data.isCompleted // 表示是否已经拉完所有消息。
    // // 自动滚动到底部
    nextTick(() => {
      messageListRef.value.scrollTop = messageListRef.value.scrollHeight
    })
  })
}
// 创建图片消息
async function createImageMessage(file: any, type: string) {
  let message = ''
  if (type === 'image') {
    message = TIM.createImageMessage({
      to: currentUser.value.userProfile.userID,
      conversationType: TencentCloudChat.TYPES.CONV_C2C,
      payload: {
        file
      },
      // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到）
      // cloudCustomData: 'your cloud custom data'
      onProgress: function (event) {
        console.log('file uploading:', event, message, 'mmm')
        message.progress = event * 100
        messageList.value = messageList.value.map((item: any) => {
          if (item.ID === message.ID) {
            return { ...message, progress: parseInt(event * 100) }
          }
          return item
        })
      }
    })
  }
  if (type === 'video') {
    message = TIM.createVideoMessage({
      to: currentUser.value.userProfile.userID,
      conversationType: TencentCloudChat.TYPES.CONV_C2C,
      payload: {
        file
      },
      // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到）
      // cloudCustomData: 'your cloud custom data'
      onProgress: function (event) {
        console.log('file uploading:', event, message, 'mmm')
        message.progress = event * 100
        messageList.value = messageList.value.map((item: any) => {
          if (item.ID === message.ID) {
            return { ...message, progress: parseInt(event * 100) }
          }
          return item
        })
      }
    })
  }

  messageList.value.push(message)
  const imResponse = await TIM.sendMessage(message)
  message.progress = 0
  messageList.value = messageList.value.map((item: any) => {
    if (item.ID === imResponse.data.message.ID) {
      return imResponse.data.message
    }
    return item
  })
}

// 点击选中联系人
function selectUserFun(item) {
  console.log(item, 'iiiiii')
  currentUser.value = item
  getMessageList(item)
}
// 获取文件
function getFile(e) {
  console.log(e.target.files[0])

  createImageMessage(e.target.files[0], 'image')
}
// 开始聊天
function startChatting() {
  dialogSearchVisible.value = false
  const name = `C2C${curSearchUserInfo.value.userID}`
  console.log(name, 'name')
  TIM.getConversationProfile(name).then((imResponse: any) => {
    console.log(imResponse, 'imResponse')
    currentUser.value = imResponse.data.conversation
    selectUserFun(currentUser.value)
    // 通知 TUIConversation 模块切换当前会话
    // Notify TUIConversation to toggle the current conversation
    // TUIServer.TUICore.TUIServer.TUIConversation.handleCurrentConversation(imResponse.data.conversation);
  })
}
// 搜索聊天用户
function handleSearch() {
  curSearchUserInfo.value = {}
  TIM.getUserProfile({
    userIDList: [searchUserID.value] // 请注意：即使只拉取一个用户的资料，也需要用数组类型，例如：userIDList: ['user1']
  }).then((res) => {
    if (res.data.length === 0) {
      return ElMessage.error('该用户不存在')
    }
    searchUserList.value = [...res.data, ...res.data]
  })
}
// 打开搜索对话框
function openSearch() {
  dialogSearchVisible.value = true
}
// 用户右击事件

function toggleDialog(item) {
  console.log('toggleDialog')
  curRightMenuInfo.value = item
  rightClickToggle.value = true
}
</script>

<style lang="less" scoped src="@/styles/TimChatView.less"></style>
