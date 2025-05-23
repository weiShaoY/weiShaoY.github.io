<script setup lang="ts">
const canvasWidth = 400

const canvasHeight = 400

const r = canvasWidth / 2

const rem = canvasWidth / 200

let timer = 0

const canvasRef = ref<HTMLCanvasElement>()

/**
 *  绘制时钟的盘面、圆点和数字
 */
function drawBackground(ctx: CanvasRenderingContext2D) {
  ctx.save()
  ctx.translate(r, r)
  ctx.lineWidth = 10 * rem
  ctx.beginPath()
  ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, r - ctx.lineWidth, 0, 2 * Math.PI)
  ctx.fillStyle = '#ffffff'
  ctx.fill()

  const hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]

  ctx.font = `${18 * rem}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  hourNumbers.forEach((num: number, index: number) => {
    const rad = ((2 * Math.PI) / 12) * index

    const x = Math.cos(rad) * (r - 30 * rem)

    const y = Math.sin(rad) * (r - 30 * rem)

    ctx.fillStyle = '#000000'
    ctx.fillText(num.toString(), x, y)
  })

  for (let i = 0; i < 60; i++) {
    const rad = ((2 * Math.PI) / 60) * i

    const x = Math.cos(rad) * (r - 18 * rem)

    const y = Math.sin(rad) * (r - 18 * rem)

    ctx.beginPath()
    if (i % 5 === 0) {
      ctx.fillStyle = '#000'
    }
    else {
      ctx.fillStyle = '#ccc'
    }

    ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI)
    ctx.fill()
  }
}

// 绘制时钟的时针
function drawHour(ctx: CanvasRenderingContext2D, hour: number, minute: number) {
  ctx.save()
  ctx.beginPath()
  const rad = ((2 * Math.PI) / 12) * hour

  const minuteRad = ((2 * Math.PI) / 12 / 60) * minute

  ctx.rotate(rad + minuteRad)
  ctx.lineWidth = 6 * rem
  ctx.lineCap = 'round'
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r / 2)
  ctx.stroke()
  ctx.restore()
}

/**
 *  绘制时钟的分针
 */
function drawMinute(ctx: CanvasRenderingContext2D, minute: number) {
  ctx.save()
  const rad = ((2 * Math.PI) / 60) * minute

  ctx.rotate(rad)
  ctx.lineWidth = 3 * rem
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r + 30 * rem)
  ctx.stroke()
  ctx.restore()
}

// 绘制时钟的秒针
function drawSecond(ctx: CanvasRenderingContext2D, second: number) {
  ctx.save()
  const rad = ((2 * Math.PI) / 60) * second

  ctx.rotate(rad)
  ctx.fillStyle = '#c14543'
  ctx.beginPath()
  ctx.moveTo(-2 * rem, 20 * rem)
  ctx.lineTo(2 * rem, 20 * rem)
  ctx.lineTo(1, -r + 18 * rem)
  ctx.lineTo(-1, -r + 18 * rem)
  ctx.fill()
  ctx.restore()
}

/**
 *  绘制时钟中心的白点
 */
function drawDot(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI)
  ctx.fill()
}

/**
 *  绘制
 */
function draw(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvasWidth, canvasWidth)
  const now = new Date()

  const hour = now.getHours()

  const minute = now.getMinutes()

  const second = now.getSeconds()

  drawBackground(ctx)
  drawHour(ctx, hour, minute)
  drawMinute(ctx, minute)
  drawSecond(ctx, second)
  drawDot(ctx)
  ctx.restore()
}

onMounted(() => {
  if (canvasRef.value) {
    const canvas = canvasRef.value

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    draw(ctx)
    timer = window.setInterval(() => {
      draw(ctx)
    }, 1000)
  }
})

onUnmounted(() => {
  timer && clearInterval(timer)
})
</script>

<template>
  <div
    class="relative aspect-square h-full flex justify-center justify-between bg-[#224141]"
  >
    <canvas
      ref="canvasRef"
      class="absolute left-0 top-0 h-full w-full"
    >
      您的浏览器版本过低，请更新浏览器
    </canvas>
  </div>
</template>
