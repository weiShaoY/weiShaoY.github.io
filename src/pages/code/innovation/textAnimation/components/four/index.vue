<script setup lang="ts">
import { ref } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)

const pRef = ref<HTMLParagraphElement | null>(null)

function onceAgain() {
  if (pRef.value) {
    Array.prototype.forEach.call(
      pRef.value.children,
      (span: HTMLSpanElement) => {
        let className = 'span1'

        if (span.className === 'span1') {
          className = 'span2'
        }

        span.className = className
      },
    )
  }

  videoRef.value?.load()
}
</script>

<template>
  <div
    class="h-full w-full flex cursor-pointer items-center justify-center"
    @click="onceAgain"
  >
    <div
      class="relative h-full flex items-center justify-center bg-black container"
    >
      <video
        ref="videoRef"
        class="h-auto w-full object-cover"

        preload="true"
        x5-video-player-fullscreen="true"
        x5-playsinline="true"
        autoplay
        muted
        playsinline
        webkit-playsinline="true"
      >
        <source
          src="./smoke.mp4"
        >
      </video>

      <p
        ref="pRef"
        class="absolute top-1/2 w-full transform text-center text-[80px] text-[#ddd] font-medium tracking-widest -translate-y-1/2"
      >
        <span
          class="span1"
        >
          w
        </span>

        <span
          class="span1"
        >e</span>

        <span
          class="span1"
        >
          i
        </span>

        <span
          class="span1"
        >
          S
        </span>

        <span
          class="span1"
        >
          h
        </span>

        <span
          class="span1"
        >
          a
        </span>

        <span
          class="span1"
        >
          o
        </span>

        <span
          class="span1"
        >
          Y
        </span>

      </p>

      <!-- <a-button
        type="primary"
        class="btn absolute bottom-2 left-0 right-0 mx-auto w-[100px]"
        @click="onceAgain"
      >
        Once Again
      </a-button> -->
    </div>
  </div>
</template>

<style scoped>
.container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #f00, #f00, #0f0, #0ff, #ff0, #0ff);
  mix-blend-mode: color;
  pointer-events: none;
}

@layer utilities {
  @keyframes textAnimation1 {
    0% {
      opacity: 0;
      transform: rotateY(90deg);
      filter: blur(10px);
    }
    100% {
      opacity: 1;
      transform: rotateY(0deg);
      filter: blur(0);
    }
  }

  @keyframes textAnimation2 {
    0% {
      opacity: 0;
      transform: rotateY(90deg);
      filter: blur(10px);
    }
    100% {
      opacity: 1;
      transform: rotateY(0deg);
      filter: blur(0);
    }
  }

  .span1 {
    opacity: 0;
    display: inline-block;
    animation: textAnimation1 1s linear forwards;
  }

  .span2 {
    opacity: 0;
    display: inline-block;
    animation: textAnimation2 1s linear forwards;
  }
}
</style>
