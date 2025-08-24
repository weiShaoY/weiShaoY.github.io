<script setup>
import gsap from 'gsap'

import { watch } from 'vue'

// 定义props
const props = defineProps({
  /**
   * 进度
   */
  progress: {
    type: Number,
    default: 0,
  },

  /**
   * 是否显示
   */
  visible: {
    type: Boolean,
    default: true,
  },
})

// 组件内部状态
const loadingText = ['L', 'O', 'A', 'D', 'I', 'N', 'G']

// 监听visible变化，执行隐藏动画
watch(() => props.visible, (newVal, oldVal) => {
  if (oldVal === true && newVal === false) {
    hideLoading()
  }
})

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
        // emit('hide-complete')
        resolve()
      },
    }, '-=1')
  })
}

// 暴露方法给父组件
defineExpose({
  hideLoading,
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
