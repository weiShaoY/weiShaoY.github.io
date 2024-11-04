/**
 * 水波荡漾效果
 */
<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

import waterBg from './image/water.png'

import WaterRipple from './waterRipple'

let canvasWidth = 600

let canvasHeight = 600

let timer: number | null = null

let waterRipple: WaterRipple | null = null

const boxRef = ref<HTMLElement | null>(null)

const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  if (boxRef.value && canvasRef.value) {
    const { offsetWidth, offsetHeight } = boxRef.value

    canvasWidth = offsetWidth
    canvasHeight = offsetHeight
    canvasRef.value.width = canvasWidth
    canvasRef.value.height = canvasHeight

    const waterImg = new Image()

    waterImg.src = waterBg

    waterRipple = new WaterRipple({
      canvas: canvasRef.value,
      background: waterImg,
      boxRef: boxRef.value,
    })

    waterRipple.animate()

    timer = window.setInterval(() => {
      const x = Math.floor(canvasWidth * Math.random())

      const y = Math.floor(canvasHeight * Math.random())

      waterRipple?.ripple(x, y)
    }, 1000)

    waterRipple.addMousemove()
  }
})

onUnmounted(() => {
  timer && clearInterval(timer)
  waterRipple?.stop()
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
