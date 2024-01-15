<template>
  <div class="container flex">
    <div class="main1 flex" ref="mainRef">
      <div class="main2">
        <!-- 最外层的圆环 -->
        <div class="firstCircle positon center"></div>
        <!-- 第二层两段圆环 -->
        <div class="secondCircle positon center"></div>

        <div class="thirdCircle flex positon center">
          <!-- 一堆圆环组成的圆环 -->
          <div class="annulusContent">
            <div
              class="annulus"
              :style="{
                transform: `translateX(-50%) translateY(-50%) rotateZ(${item * 10}deg)`
              }"
              v-for="item in Object.keys(Array.from({ length: 36 }))"
              :key="item"
            ></div>
          </div>
        </div>
        <div class="bar positon flex">
          <!--  流星雨 css -->
          <!-- <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
          <div class="line line4"></div>
          <div class="line line5"></div>
          <div class="line line6"></div>
          <div class="line line7"></div>
          <div class="line line8"></div>
          <div class="line line9"></div>
          <div class="line line10"></div>
          <div class="line line11"></div> -->

          <!--  流星雨 动态 -->
          <div
            class="line"
            :style="{
              animation: `lineAni ${Math.random() * 3}s ${Math.random() * 1.5}s linear infinite`
            }"
            v-for="item in Object.keys(Array.from({ length: 300 }))"
            :key="item"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const mainRef = ref(null)
onMounted(() => {
  let style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  document.head.appendChild(style)
  let sheet = style.sheet
  sheet.insertRule(
    '@keyframes lineAni {0% {transform: translateY(-220px);}100% {transform: translateY(220px);}'
  )

  // 'var elem = document.querySelector('.main1')
  var isDragging = false // 用于判断是否正在拖动
  var initialX = 0 // 初始鼠标X坐标
  var initialY = 0 // 初始鼠标Y坐标
  var currentX = 0 // 当前鼠标X坐标
  var currentY = 0 // 当前鼠标Y坐标
  var initialRotationY = 0 // 初始旋转角度（Y轴）
  var initialRotationX = 0 // 初始旋转角度（X轴）

  mainRef.value.addEventListener('mousedown', function (e) {
    // 当鼠标按下时
    initialY = e.clientY // 获取初始鼠标Y坐标
    initialRotationY = parseInt(
      getComputedStyle(mainRef.value)
        .getPropertyValue('transform')
        .replace(/[^0-9-.,]/g, '')
        .split(',')[4]
    ) // 获取初始旋转角度（Y轴）
    initialRotationX = parseInt(
      getComputedStyle(mainRef.value)
        .getPropertyValue('transform')
        .replace(/[^0-9-.,]/g, '')
        .split(',')[5]
    ) // 获取初始旋转角度（X轴）
    isDragging = true // 设置isDragging为true，表示正在拖动
  })

  document.addEventListener('mousemove', function (e) {
    // 当鼠标移动时
    if (isDragging) {
      // 如果正在拖动
      currentY = e.clientY // 获取当前鼠标Y坐标
      var dy = currentY - initialY // Y轴方向移动的距离
      var newRotationY = initialRotationY + dy * -1 // 根据移动方向计算新的旋转角度（Y轴）
      console.log(111, dy)

      mainRef.value.style.transform = 'rotateX(' + newRotationY + 'deg)' // 设置元素的旋转角度
    }
  })

  document.addEventListener('mouseup', function () {
    // 当鼠标松开时
    isDragging = false // 设置isDragging为false，表示已经停止拖动
  })
})
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-color: #000;
}
.main1 {
  width: 500px;
  height: 500px;
  transform: translateZ(-150px);
  transform-style: preserve-3d;
}
.main2 {
  width: 300px;
  height: 300px;
  transform-style: preserve-3d;
  transform: rotateX(60deg);
  position: relative;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.positon {
  position: absolute;
}
.center {
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.firstCircle {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: 3px solid rgb(254, 69, 78);
}
.secondCircle {
  width: 350px;
  height: 350px;
  border-radius: 50%;
  border: 10px solid rgb(254, 69, 78);
  border-color: rgb(254, 69, 78) transparent;

  animation: rotate1 3s linear infinite;
}
.thirdCircle {
  width: 300px;
  height: 300px;
  transform: translateX(-50%) translateY(-50%) translateZ(30px);
  // animation: rotate2 3s linear infinite;
}

.annulusContent {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
}
.bar {
  width: 280px;
  height: 300px;
  background: transparent;
  top: 50%;
  left: 50%;
  transform: translateZ(150px) translateX(-50%) translateY(-50%) rotateX(90deg);
  display: flex;
  // gap: 10px;
  overflow: hidden;
}
.line {
  width: 3px;
  height: 100px;
  background: linear-gradient(to top, rgb(254, 69, 78), rgba(42, 153, 255, 0.1));
}
.line1 {
  animation: lineAni 1s linear infinite;
}
.line2 {
  animation: lineAni 0.5s 0.2s linear infinite;
}
.line3 {
  animation: lineAni 1.5s 0.5s linear infinite;
}
.line4 {
  animation: lineAni 1.3s 1s linear infinite;
}
.line5 {
  animation: lineAni 1.6s 0.3s linear infinite;
}
.line6 {
  animation: lineAni 2s 0.4s linear infinite;
}
.line7 {
  animation: lineAni 1.2s 0.6s linear infinite;
}
.line8 {
  animation: lineAni 1.1s 1.1s linear infinite;
}
.line9 {
  animation: lineAni 1.9s 0.9s linear infinite;
}
.line10 {
  animation: lineAni 1.7s 1.3s linear infinite;
}
.line11 {
  animation: lineAni 1.3s 1.1s linear infinite;
}
.line12 {
  animation: lineAni 1.4s 0.4s linear infinite;
}
.annulus {
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: conic-gradient(rgb(254, 69, 78) 0, rgb(254, 69, 78) 2%, transparent 2%);
  // background: conic-gradient(red 0, #fff, 2%, transparent 2%);
  border-radius: 50%;
  // -webkit-mask: radial-gradient(transparent, transparent 57%, #000 57%, #000 100%);
}

@keyframes rotate1 {
  0% {
    transform: translateZ(20px) translateX(-50%) translateY(-50%) rotateZ(0deg);
  }
  100% {
    transform: translateZ(20px) translateX(-50%) translateY(-50%) rotateZ(-360deg);
  }
}
@keyframes rotate2 {
  0% {
    transform: translateX(-50%) translateY(-50%) translateZ(30px) rotateZ(0deg);
  }
  100% {
    transform: translateX(-50%) translateY(-50%) translateZ(30px) rotateZ(360deg);
  }
}

// 线条下到上的动画
@keyframes lineAni {
  0% {
    transform: translateY(-220px);
  }
  100% {
    transform: translateY(220px);
  }
}
</style>
