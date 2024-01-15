<template>
  <div class="about">
    <el-button type="primary" @click="state.show = true"
      >打开长按录音功能(切换移动端测试)</el-button
    >
    <div class="playVoice" v-if="state.show">
      <div class="voiceBox">
        <h5>录音<i @click="close">&times;</i></h5>
        <div class="content">
          <!-- <img src="@/assets/logo.svg" alt="" /> -->
          <!-- <div :class="['vocePlay', state.isPlay ? 'play' : '']">
          <div
            class="imgBg"
            v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            :key="index"
          ></div>
        </div> -->
          <div v-show="state.isPlay" class="voice-box">
            <div
              class="item"
              :class="{ play: state.isPlay }"
              v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="index"
              :style="{ 'animation-delay': item / 10 + 's' }"
            ></div>
          </div>
        </div>
        <p>{{ talking }}</p>
        <div class="btm">
          <button
            ref="recoding"
            @click="btnClick"
            @touchstart="haldstart"
            @touchmove="haldmove"
            @touchend="haldend"
          >
            {{ state.btnVal }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const state = reactive({
  show: false,
  posStart: 0, //初始化起点坐标
  posEnd: 0, //初始化终点坐标
  posMove: 0, //初始化滑动坐标
  talking: '',
  isPlay: false, //是否在说话
  btnVal: '按住说话'
})

function haldstart(event) {
  console.log('开始说话', event)
  event = event || window.event
  event.preventDefault() //阻止浏览器默认行为
  state.posStart = 0
  state.posStart = event.touches[0].pageY //获取起点坐标
  state.isPlay = true
  state.talking = '正在说话'
  state.btnVal = '松开结束'
}
function haldmove(event) {
  console.log('开始移动', event)
  event = event || window.event
  event.preventDefault() //阻止浏览器默认行为
  state.posMove = 0
  state.posMove = event.targetTouches[0].pageY //获取滑动实时坐标
  if (state.posStart - state.posMove < 100) {
    state.btnVal = '松开结束'
  } else {
    state.btnVal = '松开手指，取消发送'
  }
}
function haldend(event) {
  console.log('结束说话', event)
  event = event || window.event
  event.preventDefault() //阻止浏览器默认行为
  state.posEnd = 0
  state.posEnd = event.changedTouches[0].pageY //获取终点坐标
  state.isPlay = false
  state.talking = ''
  state.btnVal = '按住说话'
  if (state.posStart - state.posEnd < 100) {
    console.log('发送成功')
    close()
  } else {
    console.log('取消发送')
  }
}
function close() {
  state.show = false
  // state.$emit('close', false)
}
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
}

.playVoice {
  position: relative;
  width: 100%;
  height: 100%;
  .voiceBox {
    position: absolute;
    top: 50px;
    left: 10px;

    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99;
    width: 220px;
    color: #fff;
    > h5 {
      font-size: 12px;
      margin: 0;
      line-height: 35px;
      text-align: left;
      padding-left: 15px;
      border-bottom: 1px solid #999;
      i {
        float: right;
        font-size: 20px;
        font-weight: 400;
        margin-right: 10px;
      }
    }
    .content {
      // height: 100px;
      // padding-top: 35px;
      height: 100px;

      .voice-box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        .item {
          width: 4px;
          // height: 10px;
          border-radius: 2px;
          margin: 0px 2px;
          background-color: #fff;
          &.play {
            animation: anmateVoice 1.5s infinite;
          }
        }
      }

      @keyframes anmateVoice {
        0% {
          height: 10px;
        }
        25% {
          height: 25px;
        }
        50% {
          height: 70px;
        }
        75% {
          height: 73px;
        }
        75% {
          height: 40px;
        }
        75% {
          height: 20px;
        }
        100% {
          height: 10px;
        }
      }
    }
    > p {
      margin: 0;
      font-size: 14px;
      margin: 10px 0;
    }
    .btm {
      margin: 20px 0px;
      text-align: center;
      button {
        border: none;
        border-radius: 20px;
        color: #fff;
        background-color: #4d70ff;
        width: 132px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
      }
    }
  }
}
</style>
