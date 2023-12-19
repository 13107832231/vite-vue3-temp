<!--
 * @Author: zhengjiefeng zhengjiefeng
 * @Date: 2023-12-08 11:09:22
 * @LastEditors: zhengjiefeng zhengjiefeng
 * @LastEditTime: 2023-12-19 15:55:39
 * @FilePath: \vite-vue3-temp\src\views\InterestingDemo\DragAndZoomBox.vue
 * @Description: 
 * 
-->
<template>
  <div class="container">
    <div class="box" id="drag" ref="dragRef">
      <div class="resize-handle top-left"></div>
      <div class="resize-handle top"></div>
      <div class="resize-handle top-right"></div>
      <div class="resize-handle right"></div>
      <div class="resize-handle bottom-right"></div>
      <div class="resize-handle bottom"></div>
      <div class="resize-handle bottom-left"></div>
      <div class="resize-handle left"></div>
    </div>
  </div>
</template>

<script setup >
const dragRef = ref(null)
onMounted(() => {
  console.log(dragRef, 'ssss')
  dragRef.value.addEventListener('mousedown', startDrag)
  // 缩放功能
  const resizeHandles = document.getElementsByClassName('resize-handle')
  console.log(resizeHandles, 'resizeHandles')
  Array.from(resizeHandles).forEach((handle) => {
    handle.addEventListener('mousedown', startResize)
  })
})

// 拖拽功能
function startDrag(event) {
  console.log(event, 'event')
  event.preventDefault()
  const currentHandle = event.target
  const isResizeHandle = currentHandle.className.includes('resize-handle')
  if (isResizeHandle) return
  const startX = event.clientX
  const startY = event.clientY
  const startLeft = dragRef.value.offsetLeft
  const startTop = dragRef.value.offsetTop
  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDrag)
  function drag(event) {
    const dx = event.clientX - startX
    const dy = event.clientY - startY
    const newLeft = startLeft + dx
    const newTop = startTop + dy
    dragRef.value.style.left = newLeft + 'px'
    dragRef.value.style.top = newTop + 'px'
  }
  function stopDrag() {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', stopDrag)
  }
}

function startResize(event) {
  event.preventDefault()
  const currentHandle = event.target
  const direction = currentHandle.className.split(' ')[1]
  console.log(direction, 'direction')
  const startX = event.clientX
  const startY = event.clientY
  const startWidth = dragRef.value.offsetWidth
  const startHeight = dragRef.value.offsetHeight
  const startLeft = dragRef.value.offsetLeft
  const startTop = dragRef.value.offsetTop
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
  function resize(event) {
    const dx = event.clientX - startX
    const dy = event.clientY - startY
    let width = startWidth,
      height = startHeight,
      left = startLeft,
      top = startTop
    if (direction.includes('left')) {
      width = startWidth - dx + 'px'
      left = startLeft + dx / 2 + 'px'
    }
    if (direction.includes('right')) {
      width = startWidth + dx + 'px'
      left = startLeft + dx / 2 + 'px'
    }
    if (direction.includes('top')) {
      height = startHeight - dy + 'px'
      top = startTop + dy / 2 + 'px'
    }
    if (direction.includes('bottom')) {
      height = startHeight + dy + 'px'
      top = startTop + dy / 2 + 'px'
    }
    if (parseInt(width) <= 0 || parseInt(height) <= 0) return
    dragRef.value.style.width = width
    dragRef.value.style.height = height
    dragRef.value.style.left = left
    dragRef.value.style.top = top
  }
  function stopResize() {
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', stopResize)
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.box {
  position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
  left: 0;
  top: 0;
  width: 200px;
  height: 200px;
  background-color: #f0f0f0;
  cursor: move;
}

.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #000;
}

.top-left {
  top: -5px;
  left: -5px;
  cursor: nw-resize;
}

.top {
  top: -5px;
  left: calc(50% - 5px);
  cursor: ns-resize;
}

.top-right {
  top: -5px;
  right: -5px;
  cursor: ne-resize;
}

.right {
  top: calc(50% - 5px);
  right: -5px;
  cursor: ew-resize;
}

.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: se-resize;
}

.bottom {
  bottom: -5px;
  left: calc(50% - 5px);
  cursor: ns-resize;
}

.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: sw-resize;
}

.left {
  top: calc(50% - 5px);
  left: -5px;
  cursor: ew-resize;
}
</style>
