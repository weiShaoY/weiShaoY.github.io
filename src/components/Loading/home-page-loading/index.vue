<script setup lang="ts">
import gsap from 'gsap'

import { homeMittBus } from '@/utils'

// 组件内部状态
const loadingText = ['L', 'O', 'A', 'D', 'I', 'N', 'G']

const welcomeMessage = ['欢', '迎', '来', '到', '我', '的', '网', '站']

/**
 * 隐藏loading动画
 */
function hideLoading() {
  return new Promise((resolve) => {
    const tl = gsap.timeline()

    // 1. 文字动画：向上移动并淡出
    tl.to('.loading-text span', {
      y: '200%',
      opacity: 0,
      ease: 'power4.inOut',
      duration: 2,
      stagger: 0.2,
    })

    // 2. 进度条淡出
    tl.to('.loading-progress', {
      opacity: 0,
      ease: 'power4.inOut',
      duration: 2,
    }, '<')

    // 3. 整个loading容器淡出
    tl.to('.loading', {
      opacity: 0,
      ease: 'power4.inOut',
      onComplete: () => {
        resolve(true)
      },
    }, '-=1')
  })
}

const visible = ref(false)

const progress = ref(0)

const timer = ref<NodeJS.Timeout | null>(null)

function startLoading(durationSeconds = 0) {
  visible.value = true
  progress.value = 0

  // 清除之前的定时器
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }

  // 如果传入了时长，使用传入的时长
  if (durationSeconds > 0) {
    // 使用传入的时长作为总时长，计算进度条更新间隔
    const interval = Math.max(50, durationSeconds * 10) // 最小50ms间隔，确保平滑

    timer.value = setInterval(() => {
      if (progress.value < 90) {
        progress.value += 1
      }
    }, interval)

    // 设置自动关闭定时器
    setTimeout(() => {
      closeLoading()
    }, durationSeconds * 1000)
  }
  else {
    // 没有传入时长，默认5秒
    const defaultDuration = 5000

    const interval = 50 // 50ms间隔，5秒内更新到90%

    timer.value = setInterval(() => {
      if (progress.value < 90) {
        progress.value += 1
      }
    }, interval)

    // 5秒后自动关闭
    setTimeout(() => {
      closeLoading()
    }, defaultDuration)
  }
}

// 关闭 loading 的函数
function closeLoading() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }

  progress.value = 100
  setTimeout(() => {
    hideLoading().then(() => {
      visible.value = false
    })
  }, 500) // 确保视觉效果平滑过渡
}

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})

homeMittBus.on('startLoading', (durationSeconds) => {
  // alert(durationSeconds)
  console.log('%c Line:119 🌰 durationSeconds', 'color:#fca650', durationSeconds)
  startLoading(durationSeconds as number)
})

homeMittBus.on('closeLoading', () => {
  closeLoading()
})

onBeforeUnmount(() => {
  homeMittBus.off('startLoading')
  homeMittBus.off('closeLoading')
})
</script>

<template>
  <div
    v-if="visible"
    class="loading pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[99999] bg-black"
  >
    <div
      class="h-full w-full flex flex-col items-center justify-center text-white tracking-3"
    >

      <div
        class="loading-text"
      >
        <span
          v-for="(letter, index) in loadingText"
          :key="index"
          :style="{
            '--index': index + 1,
          }"
          class="text-[2vw] max-sm:text-[7vw]"
        >
          {{ letter }}
        </span>
      </div>

      <div
        class="loading-text"
      >
        <span
          v-for="(letter, index) in welcomeMessage"
          :key="index"
          :style="{ '--index': index + 1 }"
          class="text-[2vw] max-sm:text-[7vw]"
        >
          {{ letter }}
        </span>
      </div>

    </div>

    <div
      class="loading-progress absolute left-1/2 top-1/2 mt-[-5vw] flex origin-center translate-x--1/2 translate-y--1/2 items-center text-white max-sm:mt-[-20vw]"
    >
      <div
        class="text-[2vw] max-sm:text-9"
      >
        {{ progress }}
      </div>

      <div
        class="pl-3 text-[1vw] max-sm:text-7"
      >
        %
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
span {
  // font-size: 2vw;
  animation: blurAni 1.5s calc(var(--index) / 5 * 1s) alternate infinite;
}

@keyframes blurAni {
  to {
    filter: blur(3px);
  }
}
</style>
