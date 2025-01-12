<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import bgmAudioSrc from '@/assets/music/garage-bgm.mp3'

import changeAudioSrc from '@/assets/music/garage-change.mp3'

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

const bgmAudio = ref<HTMLAudioElement | null>(null)

const garageStore = useGarageStore()

const controlRef = ref<HTMLDivElement>()

const aniDone = ref(false)

const activeIndex = ref(0)

function handleClick(index: number, color: string) {
  if (!aniDone.value) {
    return
  }

  activeIndex.value = index

  garageStore.state.carColor = color

  if (garageStore.state.isMute) {
    const audio = new Audio(changeAudioSrc)

    audio.play()
  }
}

// 使用 onMounted 钩子来设置动画和交互存储
onMounted(() => {
  if (controlRef.value) {
    gsap.set(controlRef.value, {
      opacity: 0,
    })
    gsap.to(controlRef.value, {
      opacity: 1,
      duration: 2,
      ease: 'power2.in',
      onComplete: () => {
        aniDone.value = true
      },
    })
  }

  if (bgmAudio.value) {
    if (garageStore.state.isMute) {
      bgmAudio.value.muted = false // 确保取消静音
      bgmAudio.value
        .play()
    }
  }
})

// 监听静音状态
watch(() => garageStore.state.isMute, (isMute) => {
  if (bgmAudio.value) {
    if (isMute) {
      bgmAudio.value.muted = false // 确保取消静音
      bgmAudio.value
        .play()
    }
    else {
      bgmAudio.value.muted = true // 确保设置静音
      bgmAudio.value.pause()
    }
  }
})
</script>

<template>
  <div
    class=""
  >
    <!-- 隐藏播放器 -->
    <audio
      id="bgmAudio"
      ref="bgmAudio"
      :src="bgmAudioSrc"
      loop
    />

    <button
      class="absolute right-10 top-10 cursor-pointer duration-500 hover:scale-110"
      @click="garageStore.state.isMute = !garageStore.state.isMute"
    >
      <SvgIcon
        :icon="garageStore.state.isMute ? 'garage-music-play' : 'garage-music-stop'"
        :size="40"
      />
    </button>
  </div>

  <div
    ref="controlRef"
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
