<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const settings = {
  particles: {
    length: 500,
    duration: 2,
    velocity: 100,
    effect: -0.75,
    size: 30,
  },
}

type Point = {
  x: number
  y: number
  clone: () => Point
  length: (length?: number) => number | Point
  normalize: () => Point
}

class PointImpl implements Point {
  x: number
  y: number

  constructor(x?: number, y?: number) {
    this.x = x ?? 0
    this.y = y ?? 0
  }

  clone(): Point {
    return new PointImpl(this.x, this.y)
  }

  length(length?: number): number | Point {
    if (typeof length === 'undefined') { return Math.sqrt(this.x * this.x + this.y * this.y) }

    this.normalize()
    this.x *= length
    this.y *= length
    return this
  }

  normalize(): Point {
    const length = this.length() as number

    this.x /= length
    this.y /= length
    return this
  }
}

type Particle = {
  position: Point
  velocity: Point
  acceleration: Point
  age: number
  initialize: (x: number, y: number, dx: number, dy: number) => void
  update: (deltaTime: number) => void
  draw: (context: CanvasRenderingContext2D, image: HTMLImageElement) => void
}

class ParticleImpl implements Particle {
  position: Point
  velocity: Point
  acceleration: Point
  age: number

  constructor() {
    this.position = new PointImpl()
    this.velocity = new PointImpl()
    this.acceleration = new PointImpl()
    this.age = 0
  }

  initialize(x: number, y: number, dx: number, dy: number): void {
    this.position.x = x
    this.position.y = y
    this.velocity.x = dx
    this.velocity.y = dy
    this.acceleration.x = dx * settings.particles.effect
    this.acceleration.y = dy * settings.particles.effect
    this.age = 0
  }

  update(deltaTime: number): void {
    this.position.x += this.velocity.x * deltaTime
    this.position.y += this.velocity.y * deltaTime
    this.velocity.x += this.acceleration.x * deltaTime
    this.velocity.y += this.acceleration.y * deltaTime
    this.age += deltaTime
  }

  draw(context: CanvasRenderingContext2D, image: HTMLImageElement): void {
    function ease(t: number): number {
      return (--t) * t * t + 1
    }

    const size = image.width * ease(this.age / settings.particles.duration)

    context.globalAlpha = 1 - this.age / settings.particles.duration
    context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size)
  }
}

class ParticlePool {
  private particles: Particle[]
  private firstActive: number
  private firstFree: number
  private duration: number

  constructor(length: number) {
    this.particles = Array.from({
      length,
    }, () => new ParticleImpl())
    this.firstActive = 0
    this.firstFree = 0
    this.duration = settings.particles.duration
  }

  add(x: number, y: number, dx: number, dy: number): void {
    this.particles[this.firstFree].initialize(x, y, dx, dy)
    this.firstFree++
    if (this.firstFree === this.particles.length) { this.firstFree = 0 }

    if (this.firstActive === this.firstFree) { this.firstActive++ }

    if (this.firstActive === this.particles.length) { this.firstActive = 0 }
  }

  update(deltaTime: number): void {
    let i: number

    if (this.firstActive < this.firstFree) {
      for (i = this.firstActive; i < this.firstFree; i++) { this.particles[i].update(deltaTime) }
    }

    if (this.firstFree < this.firstActive) {
      for (i = this.firstActive; i < this.particles.length; i++) { this.particles[i].update(deltaTime) }

      for (i = 0; i < this.firstFree; i++) { this.particles[i].update(deltaTime) }
    }

    while (this.particles[this.firstActive].age >= this.duration && this.firstActive !== this.firstFree) {
      this.firstActive++
      if (this.firstActive === this.particles.length) { this.firstActive = 0 }
    }
  }

  draw(context: CanvasRenderingContext2D, image: HTMLImageElement): void {
    let i: number

    if (this.firstActive < this.firstFree) {
      for (i = this.firstActive; i < this.firstFree; i++) { this.particles[i].draw(context, image) }
    }

    if (this.firstFree < this.firstActive) {
      for (i = this.firstActive; i < this.particles.length; i++) { this.particles[i].draw(context, image) }

      for (i = 0; i < this.firstFree; i++) { this.particles[i].draw(context, image) }
    }
  }
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

function pointOnHeart(t: number): Point {
  return new PointImpl(
    160 * Math.sin(t) ** 3,
    130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25,
  )
}

function createHeartImage(): HTMLImageElement {
  const canvas = document.createElement('canvas')

  const context = canvas.getContext('2d')!

  canvas.width = settings.particles.size
  canvas.height = settings.particles.size

  function to(t: number): Point {
    const point = pointOnHeart(t)

    point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350
    point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350
    return point
  }

  context.beginPath()
  let t = -Math.PI

  let point = to(t)

  context.moveTo(point.x, point.y)
  while (t < Math.PI) {
    t += 0.01
    point = to(t)
    context.lineTo(point.x, point.y)
  }

  context.closePath()

  context.fillStyle = '#ea80b0'
  context.fill()

  const image = new Image()

  image.src = canvas.toDataURL()
  return image
}

onMounted(() => {
  if (!canvasRef.value) {
    return
  }

  const canvas = canvasRef.value

  const context = canvas.getContext('2d')!

  const particles = new ParticlePool(settings.particles.length)

  const particleRate = settings.particles.length / settings.particles.duration

  let time: number | undefined

  const image = createHeartImage()

  function render() {
    requestAnimationFrame(render)

    const newTime = new Date().getTime() / 1000

    const deltaTime = newTime - (time ?? newTime)

    time = newTime

    context.clearRect(0, 0, canvas.width, canvas.height)

    const amount = particleRate * deltaTime

    for (let i = 0; i < amount; i++) {
      const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random())

      const dir = pos.clone().length(settings.particles.velocity) as Point

      particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y)
    }

    particles.update(deltaTime)
    particles.draw(context, image)
  }

  function onResize() {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }

  window.addEventListener('resize', onResize)

  setTimeout(() => {
    onResize()
    render()
  }, 10)
})
</script>

<template>
  <div
    class="heart-animation"
  >
    <canvas
      ref="canvasRef"
      class="canvas"
    />

    <div
      class="title"
    >
      <slot>
        王胖子同志，我喜欢你
      </slot>
    </div>
  </div>
</template>

<style>
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
  background: #000;
}

.heart-animation {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
}

.canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
}

.title {
  width: 20%;
  height: 30%;
  text-align: center;
  font-size: 30px;
  background-color: transparent;
  color: rgba(247, 110, 206, 0.829);
  margin: auto;
  position: relative;
  top: 45%;
  /* font-family: '幼圆'; */
}
</style>
