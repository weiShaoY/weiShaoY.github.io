<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { gsap } from 'gsap'

import { useGarageStore } from '@/stores'

const garageStore = useGarageStore()

const panelRef = ref<HTMLElement>()

//  监听资源是否加载完成
watchEffect(() => {
  if (garageStore.state.isLoaded) {
    close()
  }
})

function close() {
  if (panelRef.value) {
    gsap.to(panelRef.value, {
      opacity: 0,
      duration: 0.35,
      delay: 1,
      ease: 'none',

      onComplete: () => {
        garageStore.state.isAudioAllowed = true

        garageStore.state.isLoading = false
      },
    })
  }
}

</script>

<template>
  <div
    ref="panelRef"

    class="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black"
  >
    <div
      class="loading relative h-60 w-60 animate-spin rounded-full from-teal-200 via-yellow-300 to-pink-500 bg-gradient-to-r"
    >
      <div
        class="absolute bottom-2.5 left-2.5 right-2.5 top-2.5 z-1 rounded-full bg-black"
      />

      <span
        class="absolute h-full w-full rounded-full from-teal-200 via-yellow-300 to-pink-500 bg-gradient-to-r blur-sm"
      />

      <span
        class="absolute h-full w-full rounded-full from-teal-200 via-yellow-300 to-pink-500 bg-gradient-to-r blur-md"
      />

      <span
        class="absolute h-full w-full rounded-full from-teal-200 via-yellow-300 to-pink-500 bg-gradient-to-r blur-2xl"
      />

      <span
        class="absolute h-full w-full rounded-full from-teal-200 via-yellow-300 to-pink-500 bg-gradient-to-r blur-3xl"
      />
    </div>

    <div
      class="absolute left-1/2 top-1/2 z-10 transform text-lg text-cyan-400 tracking-wide font-sans -translate-x-1/2 -translate-y-1/2"
    >
      <span
        class="animate-fade text-6 font-bold delay-100"
      >
        L
      </span>

      <span
        class="animate-fade text-6 font-bold delay-300"
      >
        O
      </span>

      <span
        class="animate-fade text-6 font-bold delay-500"
      >
        A
      </span>

      <span
        class="animate-fade text-6 font-bold delay-700"
      >
        D
      </span>

      <span
        class="animate-fade text-6 font-bold delay-700"
      >
        I
      </span>

      <span
        class="animate-fade text-6 font-bold delay-700"
      >
        N
      </span>

      <span
        class="animate-fade text-6 font-bold delay-900"
      >
        G
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
@keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fade {
  animation: fade 3s ease-in-out infinite;
}
</style>
