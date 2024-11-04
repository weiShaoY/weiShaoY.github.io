<!------------------------------------  代码背景墙  ------------------------------------------------->
<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

/**
 * 画布宽度
 */
const canvasWidth = ref(600)

/**
 * 画布高度
 */
const canvasHeight = ref(600)

/**
 * 要绘制的文本
 */
const text = 'abcdefghijklmnopqrstuvwxyz'

/**
 * 每列的高度
 */
const bl = 26

/**
 * 上下文引用
 */
let ctxRef: CanvasRenderingContext2D | null = null

/**
 * 动画帧 ID
 */
let frameId: number = 0

/**
 * 每列的速率
 */
const rates = ref<Record<number, number>>({
})

/**
 * 列的起始速率
 */
const startRates = ref<Record<number, number>>({
})

/**
 * 列的结束速率
 */
const endRates = ref<Record<number, number>>({
})

/**
 * 存储文本对象
 */
const textObj = ref<Record<string, string>>({
})

/**
 * 画布外部容器引用
 */
const boxRef = ref<HTMLDivElement>()

/**
 * 画布引用
 */
const canvasRef = ref<HTMLCanvasElement>()

/**
 * 初始化画布和上下文
 */
function initCanvas() {
  if (boxRef.value && canvasRef.value) {
    resizeCanvas() // 调整画布大小
    ctxRef = canvasRef.value.getContext('2d') as CanvasRenderingContext2D // 获取绘图上下文
    ctxRef.font = '14px SourceHanSansCN-Regular' // 设置字体
  }
}

/**
 * 开始动画循环
 */
function startAnimation() {
  if (!ctxRef) {
    return
  } // 如果没有上下文，则返回

  ctxRef.clearRect(0, 0, canvasWidth.value, canvasHeight.value) // 清空画布
  for (let i = 0; i < canvasWidth.value; i += bl) { // 遍历每列
    drawColumn(i) // 绘制当前列
  }

  frameId = window.requestAnimationFrame(startAnimation) // 请求下一帧
}

/**
 * 绘制一列
 * @param {number} x - 列的 X 坐标
 */
function drawColumn(x: number) {
  ctxRef!.beginPath() // 开始新的路径
  const gradient = ctxRef!.createLinearGradient(0, 0, 0, canvasHeight.value) // 创建渐变

  const s1 = Math.random() * 0.2 // 随机速率

  const s2 = Math.random() * 0.6 + 0.2 // 随机速率

  const step = Math.random() * 0.02 // 随机步长

  initializeRates(x, s1, s2) // 初始化速率

  // 设置渐变颜色
  gradient.addColorStop(0, '#000000')
  gradient.addColorStop(startRates.value[x] < 0 ? 0 : startRates.value[x], '#000000')
  gradient.addColorStop(rates.value[x] < 0 ? 0 : rates.value[x], '#0ee30e')
  gradient.addColorStop(endRates.value[x], '#000000')
  gradient.addColorStop(1, '#000000')

  ctxRef!.fillStyle = gradient // 设置填充样式

  for (let j = 0; j < canvasHeight.value; j += bl) { // 遍历每个高度
    const key = `${x}-${j}` // 生成键

    // 为当前列的每一行分配随机字符
    textObj.value[key] = textObj.value[key] || text[Math.floor(Math.random() * text.length)]
    ctxRef!.fillText(textObj.value[key], x, j) // 绘制文本
  }

  updateRates(x, s1, s2, step) // 更新速率
}

/**
 * 初始化列的速率
 * @param {number} x - 列的 X 坐标
 * @param {number} s1 - 随机速率
 * @param {number} s2 - 随机速率
 */
function initializeRates(x: number, s1: number, s2: number) {
  rates.value[x] = rates.value[x] || -s1 // 设置速率
  endRates.value[x] = endRates.value[x] || 0 // 设置结束速率
  startRates.value[x] = startRates.value[x] || -s2 // 设置起始速率
}

/**
 * 更新列的速率
 * @param {number} x - 列的 X 坐标
 * @param {number} s1 - 随机速率
 * @param {number} s2 - 随机速率
 * @param {number} step - 步长
 */
function updateRates(x: number, s1: number, s2: number, step: number) {
  rates.value[x] += step // 更新当前速率
  endRates.value[x] += step // 更新结束速率
  startRates.value[x] += step // 更新起始速率

  // 限制速率范围
  if (startRates.value[x] > 1) {
    startRates.value[x] = -s2
  }

  if (rates.value[x] > 1) {
    rates.value[x] = startRates.value[x] === -s2 ? -s1 : 1
  }

  if (endRates.value[x] > 1) {
    endRates.value[x] = (rates.value[x] === -s1 && startRates.value[x] === -s2) ? step : 1
  }
}

/**
 * 调整画布大小
 */
function resizeCanvas() {
  if (boxRef.value && canvasRef.value) {
    const { offsetWidth, offsetHeight } = boxRef.value // 获取外部容器的尺寸

    canvasWidth.value = offsetWidth // 设置画布宽度
    canvasHeight.value = offsetHeight // 设置画布高度
    canvasRef.value.width = canvasWidth.value // 设置画布的实际宽度
    canvasRef.value.height = canvasHeight.value // 设置画布的实际高度
  }
}

/**
 * 组件挂载时执行
 */
onMounted(() => {
  initCanvas() // 初始化画布
  startAnimation() // 开始动画
  window.addEventListener('resize', resizeCanvas) // 监听窗口大小变化
})

/**
 * 组件卸载时执行
 */
onUnmounted(() => {
  if (frameId) {
    cancelAnimationFrame(frameId)
  } // 取消动画帧请求

  window.removeEventListener('resize', resizeCanvas) // 移除窗口大小监听
})
</script>

<template>
  <div
    ref="boxRef"
    class="box-border h-full w-full flex bg-#000000 hover:cursor-pointer"
  >
    <canvas
      ref="canvasRef"
    >
      您的浏览器版本过低，请更新浏览器
    </canvas>
  </div>
</template>
