<script setup lang="ts">
import gsap from 'gsap'

import { homeMittBus } from '@/utils'

// 组件内部状态
const loadingText = ['L', 'O', 'A', 'D', 'I', 'N', 'G']

// 隐藏loading动画
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

const visible = ref(true)

const progress = ref(0)

const timer = ref<NodeJS.Timeout | null>(null)

function startProgress() {
  timer.value = setInterval(() => {
    if (progress.value < 90) {
      progress.value += 1
    }
  }, 500) // 减少间隔, 更平滑 (可选)
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

onMounted(() => {
  startProgress()

  // 页面加载完成时
  window.addEventListener('load', () => {
    setTimeout(() => {
      closeLoading()
    }, 2000)
  })

  // 如果在 mounted 时， 页面已经加载完毕，则主动触发 closeLoading
  if (document.readyState === 'complete') {
    setTimeout(() => {
      closeLoading()
    }, 2000)
  }
})
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }

  window.removeEventListener('load', () => {})
})

</script>

<template>
  <div
    v-if="visible"
    class="loading"
  >
    <div
      class="loading-text"
    >
      <span
        v-for="(letter, index) in loadingText"
        :key="index"
        :style="{ '--index': index + 1 }"
      >
        {{ letter }}
      </span>
    </div>

    <div
      class="loading-progress"
    >
      <span
        class="value"
      >{{ progress }}</span>

      <span
        class="unit"
      >%</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #000;
  pointer-events: none;
  z-index: 99999;
  &-text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #fff;
    font-family: 'D-DIN', Arial, sans-serif;
    letter-spacing: 10px;
    span {
      font-size: 2vw;
      animation: blurAni 1.5s calc(var(--index) / 5 * 1s) alternate infinite;
    }
  }

  &-progress {
    font-size: 2vw;
    color: #fff;
    font-family: 'D-DIN', Arial, sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: center;
    margin-top: -3vw;
    .unit {
      padding-left: 10px;
      font-size: 1vw;
    }
  }
}
@keyframes blurAni {
  to {
    filter: blur(3px);
  }
}
</style>
