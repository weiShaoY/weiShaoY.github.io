<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useGarageStore } from '@/store'

import { gsap } from 'gsap'

import { useRouter } from 'vue-router'

import b1 from './images/b1.webp'

import b2 from './images/b2.webp'

import b3 from './images/b3.webp'

import b4 from './images/b4.webp'

import b5 from './images/b5.webp'

import b6 from './images/b6.webp'

import b7 from './images/b7.webp'

import b8 from './images/b8.webp'

import b9 from './images/b9.webp'

const router = useRouter()

const res = [
  {
    src: b1,
    color: '#26d6e9',
  },
  {
    src: b2,
    color: '#444c3c',
  },
  {
    src: b3,
    color: '#5d5d5d',
  },
  {
    src: b4,
    color: '#8a8a8a',
  },
  {
    src: b5,
    color: '#3e3543',
  },
  {
    src: b6,
    color: '#822817',
  },
  {
    src: b7,
    color: '#354860',
  },
  {
    src: b8,
    color: '#273647',
  },
  {
    src: b9,
    color: '#121117',
  },
]

const garageStore = useGarageStore()

const controlRef = ref<HTMLDivElement>()

const aniDone = ref(false)

const activeIndex = ref(0)

function handleClick(index: number, color: string) {
  if (!aniDone.value) {
    return
  }

  activeIndex.value = index
  garageStore.ui.bar.bodyColor = color
}

// 使用 onMounted 钩子来设置动画和交互存储
onMounted(() => {
  if (controlRef.value) {
    gsap.set(controlRef.value, {
      opacity: 0,
    })
    gsap.to(controlRef.value, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        aniDone.value = true
      },
    })

    garageStore.interact.controlDom = controlRef.value
  }
})

</script>

<template>
  <div
    class="h-full w-full"
  >
    <div
      id="controlRef"
      ref="controlRef"
      class="control !h-full !w-full"
      @pointerdown="() => garageStore.interact.touch = true"
      @pointerup="() => garageStore.interact.touch = false"
    />

    <div
      class="absolute bottom-5 left-1/2 flex transform items-center gap-6 rounded-5 bg-[#ccc3] p-4 -translate-x-1/2"
    >
      <button
        class="flex transform cursor-pointer items-center justify-center whitespace-nowrap rounded-2 bg-[#D9D9D9] p-1 text-sm font-bold transition-transform duration-500 hover:scale-110"
        @click="router.push('/')"
      >
        返回首页
      </button>

      <div
        v-for="(item, index) in res"
        :key="index"
        class="h-8 w-8 cursor-pointer rounded-1/2 bg-[100%_100%] bg-cover transition-transform duration-500 hover:scale-110"
        :class="{ 'color-item': activeIndex === index }"
        :style="{
          backgroundImage: `url(${item.src})`,
        }"
        @click="handleClick(index, item.color)"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.color-item::after {
  content: '';
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid #fff;
}
</style>
