<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

const pageProfile = {
  badge: 'LOVE LETTER 001',
  sender: '会一直偏爱你的人',
  recipient: '王胖子同志',
  anniversaryAt: '2024-02-14T20:13:14',
  location: '在每一个普通又闪亮的晚上',
  headlineLead: '这次把喜欢做成了',
  headlineAccent: '会发光的网页',
  description: '不是正式公告，是蓄谋已久的心动展示页。想把偏爱、想念、认真，还有一点点幼稚的浪漫，都摆在你眼前。',
  signature: '偏爱不是选择题，你就是标准答案。',
  closingLine: '以后这里还会继续更新，像我们慢慢变长的故事一样。',
}

const floatingTags = [
  {
    text: '比喜欢更久一点',
    top: '10%',
    left: '8%',
    delay: '0s',
    rotate: '-7deg',
  },
  {
    text: '今天也会想你',
    top: '18%',
    left: '78%',
    delay: '1.2s',
    rotate: '6deg',
  },
  {
    text: '已被你可爱击中',
    top: '58%',
    left: '5%',
    delay: '2s',
    rotate: '-4deg',
  },
  {
    text: '想和你浪费时间',
    top: '72%',
    left: '80%',
    delay: '2.8s',
    rotate: '8deg',
  },
]

const loveNotes = [
  '你一出现，平凡的一天就会自动切换成限定版。',
  '想把所有好天气都攒起来，只在见你的时候打开。',
  '不是突然很会浪漫，只是刚好很想对你认真一点。',
  '如果心动有声音，那应该是一整晚都在重复你的名字。',
]

const promises = [
  {
    title: '情绪低落时',
    content: '我会先抱抱你，再陪你把那一点点委屈讲完。',
  },
  {
    title: '平淡日常里',
    content: '把晚饭、散步、电影和无聊碎碎念都过成值得收藏的小事。',
  },
  {
    title: '面对未来时',
    content: '我们不急着抵达答案，但可以一直站在同一边。',
  },
]

const memoryCards = [
  {
    label: '第一次心动',
    title: '是你把普通对话聊成了烟火',
    description: '有些人只是在出现，而你像是把场景、空气和时间一起变得柔软了。',
  },
  {
    label: '最喜欢的时刻',
    title: '你认真听我说话的时候',
    description: '那种被稳稳接住的感觉，会让人很想把往后的故事都继续讲给你听。',
  },
  {
    label: '未来愿望清单',
    title: '想和你解锁很多很小的第一次',
    description: '第一次一起看海、第一次晚风里散步到很晚、第一次把一句“回家了没”说成习惯。',
  },
]

const wishList = [
  '一起去海边看日出',
  '下雨天躲进同一家咖啡店',
  '拍一组奇奇怪怪的合照',
  '听歌时偷偷交换一边耳机',
  '把对方写进长期计划',
  '认真庆祝每个纪念日',
]

const galleryPhotos = [
  {
    title: '预留给第一次正式合照',
    caption: '这里以后可以换成你们最喜欢的一张照片。',
    mood: 'sunset',
    image: '',
  },
  {
    title: '预留给某次散步的傍晚',
    caption: '有风、有路灯、还有你笑起来的时候。',
    mood: 'rose',
    image: '',
  },
  {
    title: '预留给想反复回看的瞬间',
    caption: '不用多完美，只要一眼看过去就会想起那天。',
    mood: 'night',
    image: '',
  },
]

const canvasRef = ref<HTMLCanvasElement | null>(null)

const currentNoteIndex = ref(0)

const secretOpened = ref(true)

const heartRate = ref(98)

const now = ref(Date.now())

let timerId: number | undefined

let stopHeartScene: (() => void) | undefined

const currentNote = computed(() => loveNotes[currentNoteIndex.value])

const anniversaryLabel = computed(() => {
  const date = new Date(pageProfile.anniversaryAt)

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
})

const nameBadge = computed(() => pageProfile.recipient.slice(0, 2))

const elapsed = computed(() => {
  const start = new Date(pageProfile.anniversaryAt).getTime()

  const diff = Math.max(0, now.value - start)

  const totalMinutes = Math.floor(diff / 1000 / 60)

  const days = Math.floor(totalMinutes / (60 * 24))

  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)

  const minutes = totalMinutes % 60

  return {
    days,
    hours,
    minutes,
  }
})

const stats = computed(() => [
  {
    label: '已经心动',
    value: String(elapsed.value.days),
    unit: '天',
  },
  {
    label: '今天想你',
    value: String(elapsed.value.hours),
    unit: '小时',
  },
  {
    label: '甜度浓度',
    value: `${heartRate.value}`,
    unit: '%',
  },
  {
    label: '此刻状态',
    value: '超想见',
    unit: '',
  },
])

function showNextLoveNote() {
  currentNoteIndex.value = (currentNoteIndex.value + 1) % loveNotes.length
  heartRate.value = 96 + Math.floor(Math.random() * 5)
  secretOpened.value = true
}

type Point = {
  x: number
  y: number
  clone: () => Point
  length: (size?: number) => number | Point
  normalize: () => Point
}

class PointImpl implements Point {
  x: number
  y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  clone() {
    return new PointImpl(this.x, this.y)
  }

  length(size?: number) {
    if (typeof size === 'undefined') {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    this.normalize()
    this.x *= size
    this.y *= size
    return this
  }

  normalize() {
    const size = (this.length() as number) || 1

    this.x /= size
    this.y /= size

    return this
  }
}

class Particle {
  position = new PointImpl()
  velocity = new PointImpl()
  acceleration = new PointImpl()
  age = 0

  initialize(x: number, y: number, dx: number, dy: number) {
    this.position.x = x
    this.position.y = y
    this.velocity.x = dx
    this.velocity.y = dy
    this.acceleration.x = dx * -0.7
    this.acceleration.y = dy * -0.7
    this.age = 0
  }

  update(deltaTime: number) {
    this.position.x += this.velocity.x * deltaTime
    this.position.y += this.velocity.y * deltaTime
    this.velocity.x += this.acceleration.x * deltaTime
    this.velocity.y += this.acceleration.y * deltaTime
    this.age += deltaTime
  }

  draw(context: CanvasRenderingContext2D, sprite: HTMLCanvasElement, duration: number) {
    const ease = (t: number) => 1 - (1 - t) ** 3

    const progress = this.age / duration

    const size = sprite.width * ease(progress)

    context.globalAlpha = Math.max(0, 1 - progress)
    context.drawImage(sprite, this.position.x - size / 2, this.position.y - size / 2, size, size)
  }
}

class ParticlePool {
  particles: Particle[]
  firstActive = 0
  firstFree = 0
  duration: number

  constructor(length: number, duration: number) {
    this.duration = duration
    this.particles = Array.from({
      length,
    }, () => new Particle())
  }

  add(x: number, y: number, dx: number, dy: number) {
    this.particles[this.firstFree].initialize(x, y, dx, dy)
    this.firstFree = (this.firstFree + 1) % this.particles.length

    if (this.firstActive === this.firstFree) {
      this.firstActive = (this.firstActive + 1) % this.particles.length
    }
  }

  update(deltaTime: number) {
    const particles = this.particles

    if (this.firstActive < this.firstFree) {
      for (let i = this.firstActive; i < this.firstFree; i++) {
        particles[i].update(deltaTime)
      }
    }

    if (this.firstFree < this.firstActive) {
      for (let i = this.firstActive; i < particles.length; i++) {
        particles[i].update(deltaTime)
      }

      for (let i = 0; i < this.firstFree; i++) {
        particles[i].update(deltaTime)
      }
    }

    while (particles[this.firstActive].age >= this.duration && this.firstActive !== this.firstFree) {
      this.firstActive = (this.firstActive + 1) % particles.length
    }
  }

  draw(context: CanvasRenderingContext2D, sprite: HTMLCanvasElement) {
    const particles = this.particles

    if (this.firstActive < this.firstFree) {
      for (let i = this.firstActive; i < this.firstFree; i++) {
        particles[i].draw(context, sprite, this.duration)
      }
    }

    if (this.firstFree < this.firstActive) {
      for (let i = this.firstActive; i < particles.length; i++) {
        particles[i].draw(context, sprite, this.duration)
      }

      for (let i = 0; i < this.firstFree; i++) {
        particles[i].draw(context, sprite, this.duration)
      }
    }
  }
}

function pointOnHeart(t: number) {
  return new PointImpl(
    120 * Math.sin(t) ** 3,
    96 * Math.cos(t) - 36 * Math.cos(2 * t) - 14 * Math.cos(3 * t) - 6 * Math.cos(4 * t) + 18,
  )
}

function createHeartSprite(size: number) {
  const sprite = document.createElement('canvas')

  const context = sprite.getContext('2d')!

  sprite.width = size
  sprite.height = size

  const to = (t: number) => {
    const point = pointOnHeart(t)

    point.x = size / 2 + point.x * size / 360
    point.y = size / 2 - point.y * size / 360
    return point
  }

  context.beginPath()
  let t = -Math.PI

  let point = to(t)

  context.moveTo(point.x, point.y)

  while (t < Math.PI) {
    t += 0.02
    point = to(t)
    context.lineTo(point.x, point.y)
  }

  context.closePath()
  context.fillStyle = '#ff6b8f'
  context.shadowColor = '#ff8fab'
  context.shadowBlur = 18
  context.fill()

  return sprite
}

function mountHeartScene() {
  const canvas = canvasRef.value

  if (!canvas) {
    return () => {}
  }

  const context = canvas.getContext('2d')

  if (!context) {
    return () => {}
  }

  const particleLength = 420

  const particleDuration = 2.2

  const particleVelocity = 92

  const particlePool = new ParticlePool(particleLength, particleDuration)

  const particleRate = particleLength / particleDuration

  const sprite = createHeartSprite(28)

  let rafId = 0

  let time = 0

  const resize = () => {
    const dpr = window.devicePixelRatio || 1

    const width = canvas.clientWidth

    const height = canvas.clientHeight

    canvas.width = width * dpr
    canvas.height = height * dpr
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const render = () => {
    rafId = window.requestAnimationFrame(render)

    const newTime = Date.now() / 1000

    const deltaTime = newTime - (time || newTime)

    time = newTime

    const width = canvas.clientWidth

    const height = canvas.clientHeight

    context.clearRect(0, 0, width, height)

    const amount = particleRate * deltaTime

    for (let i = 0; i < amount; i++) {
      const point = pointOnHeart(Math.PI - 2 * Math.PI * Math.random())

      const direction = point.clone().length(particleVelocity) as Point

      particlePool.add(
        width / 2 + point.x * 0.68,
        height / 2 - point.y * 0.68,
        direction.x,
        -direction.y,
      )
    }

    particlePool.update(deltaTime)
    particlePool.draw(context, sprite)
  }

  resize()
  render()
  window.addEventListener('resize', resize)

  return () => {
    window.cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
  }
}

onMounted(() => {
  stopHeartScene = mountHeartScene()
  timerId = window.setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  stopHeartScene?.()

  if (timerId !== undefined) {
    window.clearInterval(timerId)
  }
})
</script>

<template>
  <div
    class="love-page"
  >
    <canvas
      ref="canvasRef"
      class="heart-canvas"
    />

    <div
      class="backdrop backdrop-left"
    />

    <div
      class="backdrop backdrop-right"
    />

    <div
      class="grain"
    />

    <div
      v-for="tag in floatingTags"
      :key="tag.text"
      class="floating-tag"
      :style="{
        '--tag-top': tag.top,
        '--tag-left': tag.left,
        '--tag-delay': tag.delay,
        '--tag-rotate': tag.rotate,
      }"
    >
      {{ tag.text }}
    </div>

    <main
      class="love-shell"
    >
      <section
        class="hero-card"
      >
        <div
          class="hero-copy"
        >
          <p
            class="eyebrow"
          >
            {{ pageProfile.badge }}
          </p>

          <h1
            class="hero-title"
          >
            {{ pageProfile.recipient }}，
            <br>
            {{ pageProfile.headlineLead }}
            <span>{{ pageProfile.headlineAccent }}</span>
          </h1>

          <p
            class="hero-desc"
          >
            {{ pageProfile.description }}
          </p>

          <div
            class="hero-actions"
          >
            <button
              class="primary-btn"
              @click="showNextLoveNote"
            >
              打开今日心动
            </button>

            <button
              class="ghost-btn"
              @click="secretOpened = !secretOpened"
            >
              {{ secretOpened ? '先把秘密收好' : '拆开一封小情书' }}
            </button>
          </div>

          <p
            class="hero-footnote"
          >
            {{ anniversaryLabel }} · {{ pageProfile.location }} · {{ pageProfile.signature }}
          </p>
        </div>

        <div
          class="hero-side"
        >
          <div
            class="heart-card"
          >
            <span
              class="heart-card-label"
            >恋爱雷达</span>

            <div
              class="heart-core"
            >
              <div
                class="heart-shape"
              />

              <span
                class="name-badge"
              >{{ nameBadge }}</span>

              <p>
                喜欢你这件事
              </p>

              <strong>持续升温中</strong>
            </div>

            <div
              class="pulse-bar"
            >
              <span
                class="pulse-fill"
                :style="{ width: `${heartRate}%` }"
              />
            </div>
          </div>

          <div
            class="stats-grid"
          >
            <article
              v-for="item in stats"
              :key="item.label"
              class="stat-card"
            >
              <span>{{ item.label }}</span>

              <strong>
                {{ item.value }}
                <em
                  v-if="item.unit"
                >{{ item.unit }}</em>
              </strong>
            </article>
          </div>
        </div>
      </section>

      <section
        class="letter-card"
        :class="{ open: secretOpened }"
      >
        <div
          class="letter-top"
        >
          <span>今日情话</span>

          <button
            class="tiny-btn"
            @click="showNextLoveNote"
          >
            换一句
          </button>
        </div>

        <p
          class="letter-note"
        >
          {{ currentNote }}
        </p>

        <div
          class="letter-timer"
        >
          <span>从 {{ anniversaryLabel }} 到现在</span>

          <strong>{{ elapsed.days }} 天 {{ elapsed.hours }} 小时 {{ elapsed.minutes }} 分</strong>
        </div>
      </section>

      <section
        class="story-grid"
      >
        <article
          class="story-card"
        >
          <p
            class="story-tag"
          >
            想认真做的事
          </p>

          <h2>
            把喜欢变成稳定的偏爱
          </h2>

          <div
            class="promise-list"
          >
            <div
              v-for="item in promises"
              :key="item.title"
              class="promise-item"
            >
              <strong>{{ item.title }}</strong>

              <p>
                {{ item.content }}
              </p>
            </div>
          </div>
        </article>

        <article
          class="story-card"
        >
          <p
            class="story-tag"
          >
            想和你完成
          </p>

          <h2>
            一些闪闪发光的小计划
          </h2>

          <div
            class="wish-list"
          >
            <span
              v-for="item in wishList"
              :key="item"
              class="wish-pill"
            >
              {{ item }}
            </span>
          </div>
        </article>
      </section>

      <section
        class="timeline-card"
      >
        <div
          class="timeline-head"
        >
          <p
            class="story-tag"
          >
            心动档案
          </p>

          <h2>
            把“喜欢你”拆成几个值得纪念的瞬间
          </h2>
        </div>

        <div
          class="timeline-list"
        >
          <article
            v-for="item in memoryCards"
            :key="item.title"
            class="timeline-item"
          >
            <span
              class="timeline-label"
            >{{ item.label }}</span>

            <h3>
              {{ item.title }}
            </h3>

            <p>
              {{ item.description }}
            </p>
          </article>
        </div>
      </section>

      <section
        class="gallery-card"
      >
        <div
          class="timeline-head"
        >
          <p
            class="story-tag"
          >
            照片墙
          </p>

          <h2>
            把以后的很多可爱瞬间留在这里
          </h2>
        </div>

        <div
          class="gallery-grid"
        >
          <article
            v-for="item in galleryPhotos"
            :key="item.title"
            class="gallery-item"
          >
            <div
              v-if="item.image"
              class="gallery-photo"
            >
              <img
                :src="item.image"
                :alt="item.title"
              >
            </div>

            <div
              v-else
              class="gallery-photo"
              :class="`gallery-photo--${item.mood}`"
            >
              <span>{{ pageProfile.recipient }}</span>
            </div>

            <div
              class="gallery-copy"
            >
              <strong>{{ item.title }}</strong>

              <p>
                {{ item.caption }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section
        class="closing-card"
      >
        <p
          class="closing-title"
        >
          To {{ pageProfile.recipient }}
        </p>

        <p
          class="closing-text"
        >
          {{ pageProfile.closingLine }}
        </p>

        <p
          class="closing-sign"
        >
          {{ pageProfile.sender }}
        </p>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.love-page {
  --bg: #160a10;
  --panel: rgba(43, 17, 29, 0.72);
  --panel-strong: rgba(58, 22, 37, 0.88);
  --border: rgba(255, 219, 227, 0.16);
  --text: #fff5f4;
  --muted: rgba(255, 235, 236, 0.72);
  --accent: #ff7b9c;
  --accent-strong: #ffb36c;
  --shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at top, rgba(255, 139, 173, 0.16), transparent 36%),
    radial-gradient(circle at bottom left, rgba(255, 186, 120, 0.14), transparent 32%),
    linear-gradient(180deg, #17090f 0%, #12070d 46%, #1a0c14 100%);
  color: var(--text);
  isolation: isolate;
}

.heart-canvas,
.backdrop,
.grain {
  position: absolute;
  inset: 0;
}

.heart-canvas {
  z-index: 0;
  opacity: 0.72;
}

.backdrop {
  filter: blur(70px);
  opacity: 0.9;
}

.backdrop-left {
  background: radial-gradient(circle, rgba(255, 107, 143, 0.28), transparent 58%);
  transform: translate(-18%, -10%);
}

.backdrop-right {
  background: radial-gradient(circle, rgba(255, 189, 128, 0.22), transparent 62%);
  transform: translate(28%, 6%);
}

.grain {
  z-index: 0;
  opacity: 0.07;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: radial-gradient(circle at center, black 28%, transparent 88%);
}

.floating-tag {
  position: absolute;
  top: var(--tag-top);
  left: var(--tag-left);
  z-index: 1;
  padding: 0.55rem 0.95rem;
  border: 1px solid rgba(255, 228, 233, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  color: rgba(255, 238, 240, 0.78);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  transform: rotate(var(--tag-rotate));
  animation: floatTag 7s ease-in-out infinite;
  animation-delay: var(--tag-delay);
}

.love-shell {
  position: relative;
  z-index: 2;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 72px 0 52px;
}

.hero-card,
.letter-card,
.story-card,
.timeline-card {
  border: 1px solid var(--border);
  background: var(--panel);
  box-shadow: var(--shadow);
  backdrop-filter: blur(24px);
}

.hero-card {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 32px;
  padding: 34px;
  border-radius: 36px;
  animation: riseUp 0.9s ease both;
}

.eyebrow,
.story-tag,
.heart-card-label {
  margin: 0 0 14px;
  color: rgba(255, 220, 181, 0.88);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.hero-title,
.story-card h2,
.timeline-head h2,
.timeline-item h3 {
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', serif;
}

.hero-title {
  margin: 0;
  font-size: clamp(2.6rem, 5vw, 4.8rem);
  line-height: 0.96;
  letter-spacing: -0.05em;
}

.hero-title span {
  display: inline-block;
  background: linear-gradient(120deg, #ffd4a8 0%, #ff8faf 48%, #fff4e4 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.hero-desc {
  max-width: 40rem;
  margin: 24px 0 0;
  color: var(--muted);
  font-size: 1.06rem;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.primary-btn,
.ghost-btn,
.tiny-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    background 0.24s ease;
}

.primary-btn,
.ghost-btn {
  min-height: 48px;
  padding: 0 20px;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 700;
}

.primary-btn {
  background: linear-gradient(135deg, #ff8fad 0%, #ffb86f 100%);
  color: #2d1016;
  box-shadow: 0 18px 35px rgba(255, 126, 160, 0.28);
}

.ghost-btn {
  border: 1px solid rgba(255, 233, 237, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
}

.tiny-btn:hover,
.primary-btn:hover,
.ghost-btn:hover {
  transform: translateY(-2px);
}

.hero-footnote {
  margin: 18px 0 0;
  color: rgba(255, 236, 231, 0.58);
  font-size: 0.92rem;
}

.hero-side {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.heart-card {
  padding: 22px;
  border-radius: 28px;
  background: var(--panel-strong);
  border: 1px solid rgba(255, 240, 240, 0.1);
}

.heart-core {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 240px;
  text-align: center;
  overflow: hidden;
}

.name-badge {
  position: absolute;
  top: 28px;
  right: 28px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  height: 52px;
  padding: 0 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 232, 228, 0.16);
  color: rgba(255, 244, 242, 0.82);
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  backdrop-filter: blur(14px);
}

.heart-shape {
  position: relative;
  width: 112px;
  height: 112px;
  background: linear-gradient(160deg, #ff7f9d 0%, #ffb36c 100%);
  transform: rotate(-45deg);
  border-radius: 18px;
  box-shadow: 0 0 40px rgba(255, 131, 163, 0.35);
  animation: heartbeat 1.8s ease-in-out infinite;
}

.heart-shape::before,
.heart-shape::after {
  content: '';
  position: absolute;
  width: 112px;
  height: 112px;
  background: inherit;
  border-radius: 50%;
}

.heart-shape::before {
  top: -56px;
  left: 0;
}

.heart-shape::after {
  top: 0;
  left: 56px;
}

.heart-core p,
.heart-core strong {
  position: absolute;
  z-index: 1;
}

.heart-core p {
  margin: 0 0 24px;
  transform: translateY(-16px);
  color: rgba(255, 245, 244, 0.7);
  font-size: 0.95rem;
}

.heart-core strong {
  transform: translateY(16px);
  font-size: 1.18rem;
}

.pulse-bar {
  height: 9px;
  margin-top: 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.pulse-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff7f9d 0%, #ffca7f 100%);
  box-shadow: 0 0 20px rgba(255, 134, 165, 0.4);
  transition: width 0.32s ease;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.stat-card {
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(255, 240, 242, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.stat-card span {
  display: block;
  margin-bottom: 12px;
  color: rgba(255, 234, 236, 0.66);
  font-size: 0.84rem;
}

.stat-card strong {
  font-size: 1.55rem;
  line-height: 1;
}

.stat-card em {
  margin-left: 4px;
  color: rgba(255, 218, 177, 0.86);
  font-style: normal;
  font-size: 0.98rem;
}

.letter-card {
  margin-top: 24px;
  padding: 24px 26px;
  border-radius: 28px;
  animation: riseUp 1.05s ease both;
}

.letter-card.open {
  box-shadow: 0 26px 70px rgba(255, 119, 155, 0.16);
}

.letter-top,
.letter-timer,
.timeline-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.letter-top span,
.letter-timer span {
  color: rgba(255, 228, 214, 0.72);
}

.tiny-btn {
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
}

.letter-note {
  margin: 18px 0 20px;
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', serif;
  font-size: clamp(1.35rem, 2vw, 1.8rem);
  line-height: 1.65;
}

.letter-timer {
  padding-top: 16px;
  border-top: 1px dashed rgba(255, 232, 229, 0.12);
}

.letter-timer strong {
  color: #ffd8aa;
  font-size: 1rem;
}

.story-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.story-card,
.timeline-card,
.gallery-card,
.closing-card {
  border-radius: 30px;
  padding: 28px;
  animation: riseUp 1.16s ease both;
}

.story-card h2,
.timeline-head h2 {
  margin: 0 0 20px;
  font-size: clamp(1.6rem, 2.6vw, 2.25rem);
  line-height: 1.08;
}

.promise-list {
  display: grid;
  gap: 16px;
}

.promise-item {
  padding: 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 238, 240, 0.08);
}

.promise-item strong {
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
}

.promise-item p,
.timeline-item p {
  margin: 0;
  color: var(--muted);
  line-height: 1.8;
}

.wish-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.wish-pill {
  padding: 0.8rem 1rem;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(255, 136, 167, 0.18), rgba(255, 198, 132, 0.16)), rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 232, 225, 0.11);
}

.timeline-card {
  margin-top: 24px;
  animation: riseUp 1.26s ease both;
}

.gallery-card {
  margin-top: 24px;
  border: 1px solid var(--border);
  background: var(--panel);
  box-shadow: var(--shadow);
  backdrop-filter: blur(24px);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 24px;
}

.gallery-item {
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(255, 232, 232, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.gallery-photo {
  position: relative;
  display: flex;
  align-items: end;
  justify-content: flex-start;
  min-height: 240px;
  padding: 20px;
  overflow: hidden;
}

.gallery-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-photo span {
  position: relative;
  z-index: 1;
  max-width: 12rem;
  color: rgba(255, 245, 244, 0.92);
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', serif;
  font-size: 1.45rem;
  line-height: 1.1;
}

.gallery-photo::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 52%;
  background: linear-gradient(180deg, transparent, rgba(14, 6, 10, 0.78));
}

.gallery-photo--sunset {
  background:
    radial-gradient(circle at top left, rgba(255, 207, 145, 0.34), transparent 32%),
    linear-gradient(135deg, #6b2336 0%, #ff8f7c 48%, #ffd59e 100%);
}

.gallery-photo--rose {
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.22), transparent 20%),
    linear-gradient(145deg, #4b1730 0%, #b94d7b 50%, #ffb3aa 100%);
}

.gallery-photo--night {
  background:
    radial-gradient(circle at top, rgba(255, 214, 156, 0.22), transparent 18%),
    linear-gradient(145deg, #1f1430 0%, #40307b 46%, #ff8c95 100%);
}

.gallery-copy {
  padding: 18px 18px 20px;
}

.gallery-copy strong {
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
}

.gallery-copy p {
  margin: 0;
  color: var(--muted);
  line-height: 1.75;
}

.closing-card {
  margin-top: 24px;
  border: 1px solid var(--border);
  background: linear-gradient(135deg, rgba(255, 148, 176, 0.12), rgba(255, 198, 132, 0.1)), var(--panel);
  box-shadow: var(--shadow);
  text-align: center;
}

.closing-title {
  margin: 0;
  color: rgba(255, 222, 182, 0.82);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.closing-text {
  max-width: 38rem;
  margin: 18px auto 0;
  font-family: 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', serif;
  font-size: clamp(1.25rem, 2vw, 1.7rem);
  line-height: 1.7;
}

.closing-sign {
  margin: 22px 0 0;
  color: rgba(255, 236, 231, 0.68);
  font-size: 0.96rem;
}

.timeline-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 24px;
}

.timeline-item {
  position: relative;
  padding: 22px 20px 20px;
  border-radius: 24px;
  border: 1px solid rgba(255, 232, 232, 0.1);
  background: rgba(255, 255, 255, 0.04);
}

.timeline-item::before {
  content: '';
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff8dad 0%, #ffcb88 100%);
  opacity: 0.7;
}

.timeline-label {
  display: inline-flex;
  margin-bottom: 14px;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 226, 211, 0.84);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}

.timeline-item h3 {
  margin: 0 0 10px;
  font-size: 1.4rem;
}

@keyframes heartbeat {
  0%,
  100% {
    transform: rotate(-45deg) scale(0.96);
  }
  12% {
    transform: rotate(-45deg) scale(1.04);
  }
  20% {
    transform: rotate(-45deg) scale(0.98);
  }
  32% {
    transform: rotate(-45deg) scale(1.08);
  }
  45% {
    transform: rotate(-45deg) scale(0.98);
  }
}

@keyframes floatTag {
  0%,
  100% {
    transform: translate3d(0, 0, 0) rotate(var(--tag-rotate));
  }
  50% {
    transform: translate3d(0, -10px, 0) rotate(calc(var(--tag-rotate) + 2deg));
  }
}

@keyframes riseUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 960px) {
  .floating-tag {
    display: none;
  }

  .love-shell {
    width: min(100% - 28px, 1180px);
    padding-top: 28px;
    padding-bottom: 40px;
  }

  .hero-card,
  .story-grid,
  .timeline-list,
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .hero-card {
    padding: 22px;
    border-radius: 28px;
  }

  .hero-title {
    font-size: clamp(2.2rem, 9vw, 3.3rem);
  }

  .heart-core {
    min-height: 210px;
  }

  .story-card,
  .timeline-card,
  .letter-card {
    padding: 22px;
    border-radius: 24px;
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions,
  .letter-top,
  .letter-timer,
  .timeline-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .primary-btn,
  .ghost-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
