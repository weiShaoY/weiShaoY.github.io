<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import ScreensaverItem from './screensaver-item.vue'

/**
 * 获取当前时间数组
 * @param now 当前时间
 * @returns 当前时间的数字数组
 */
function getTimeArr(now: Date) {
  const h = String(now.getHours())
    .padStart(2, '0')
    .split('')
    .map(Number)

  const m = String(now.getMinutes())
    .padStart(2, '0')
    .split('')
    .map(Number)

  const s = String(now.getSeconds())
    .padStart(2, '0')
    .split('')
    .map(Number)

  return [...h, ...m, ...s]
}

/**
 * 当前时间数组
 */
const timeArr = ref(getTimeArr(new Date()))

let timer: ReturnType<typeof setTimeout> | null = null

function startTimer() {
  stopTimer()
  timer = setTimeout(() => {
    timeArr.value = getTimeArr(new Date())
    startTimer()
  }, 1000)
}

function stopTimer() {
  if (timer) {
    clearTimeout(timer)
  }
}

onMounted(startTimer)
onBeforeUnmount(stopTimer)
</script>

<template>
  <div
    class="h-full w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,#969696_0%,#595959_100%)]"
  >
    <ScreensaverItem
      :total="2"
      :current="timeArr[0]"
    />

    <ScreensaverItem
      :total="9"
      :current="timeArr[1]"
    />

    <div
      class="h-12 flex flex-col justify-around px-2"
    >
      <span
        class="h-2.5 w-2.5 rounded-full bg-black"
      />

      <span
        class="h-2.5 w-2.5 rounded-full bg-black"
      />
    </div>

    <ScreensaverItem
      :total="5"
      :current="timeArr[2]"
    />

    <ScreensaverItem
      :total="9"
      :current="timeArr[3]"
    />

    <div
      class="h-12 flex flex-col justify-around px-2"
    >
      <span
        class="h-2.5 w-2.5 rounded-full bg-black"
      />

      <span
        class="h-2.5 w-2.5 rounded-full bg-black"
      />
    </div>

    <ScreensaverItem
      :total="5"
      :current="timeArr[4]"
    />

    <ScreensaverItem
      :total="9"
      :current="timeArr[5]"
    />
  </div>
</template>

<style lang="less" scoped>

</style>
