<!------------------------------------  水波  ------------------------------------------------->
<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

import waterBg from './image/water.png'

import WaterRipple from './waterRipple'

/**
 * 画布宽度
 */
const canvasWidth = ref(600)

/**
 * 画布高度
 */
const canvasHeight = ref(600)

/**
 * 定时器 ID
 */
let timer: number | null = null

/**
 * 水波对象
 */
let waterRipple: WaterRipple | null = null

/**
 * 画布外部容器引用
 */
const boxRef = ref<HTMLElement | null>(null)

/**
 * 画布引用
 */
const canvasRef = ref<HTMLCanvasElement | null>(null)

/**
 * 组件挂载时执行
 */
onMounted(() => {
  if (boxRef.value && canvasRef.value) {
    const { offsetWidth, offsetHeight } = boxRef.value

    canvasWidth.value = offsetWidth // 设置画布宽度
    canvasHeight.value = offsetHeight // 设置画布高度
    canvasRef.value.width = canvasWidth.value // 设置画布的实际宽度
    canvasRef.value.height = canvasHeight.value // 设置画布的实际高度

    const waterImg = new Image()

    waterImg.src = waterBg // 设置水波背景图

    waterRipple = new WaterRipple({
      canvas: canvasRef.value,
      background: waterImg,
      boxRef: boxRef.value,
    })

    waterRipple.animate() // 开始动画

    timer = window.setInterval(() => {
      const x = Math.floor(canvasWidth.value * Math.random()) // 随机 X 坐标

      const y = Math.floor(canvasHeight.value * Math.random()) // 随机 Y 坐标

      waterRipple?.ripple(x, y) // 添加涟漪效果
    }, 1000)

    waterRipple.addMousemove() // 添加鼠标移动事件
  }
})

/**
 * 组件卸载时执行
 */
onUnmounted(() => {
  if (timer) {
    clearInterval(timer) // 清除定时器
  }

  waterRipple?.stop() // 停止水波动画
})
</script>

<template>
  <div
    ref="boxRef"
    class="box-border h-full w-full flex hover:cursor-pointer"
  >
    <canvas
      ref="canvasRef"
    >
      您的浏览器版本过低，请更新浏览器
    </canvas>
  </div>
</template>
