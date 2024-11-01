<script setup lang="ts">
import ScreensaverItem from './screensaver-item.vue'

/**
 *  获取当前时间数组
 */
function getTimeArr(now = new Date()) {
  const h = now.getHours()

  const m = now.getMinutes()

  const s = now.getSeconds()

  function toArr(n: number) {
    return n >= 10 ? `${n}`.split('').map(item => Number(item)) : [0, n]
  }

  return [...toArr(h), ...toArr(m), ...toArr(s)]
}

/**
 *  当前时间数组
 */
const timeArr = ref(getTimeArr())

let timer: ReturnType<typeof setTimeout> | null = null

function startTimer() {
  stopTimer()
  timer = setTimeout(() => {
    timeArr.value = getTimeArr()
    startTimer()
  }, 1000)
}

function stopTimer() {
  if (timer) {
    clearTimeout(timer)
  }
}

onMounted(() => {
  startTimer()
})
onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <div
    class="wrap"
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
      class="colon"
    />

    <ScreensaverItem
      :total="5"
      :current="timeArr[2]"
    />

    <ScreensaverItem
      :total="9"
      :current="timeArr[3]"
    />

    <div
      class="colon"
    />

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
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(ellipse at center, #969696 0%, #595959 100%);
  height: 100%;
  width: 100%;
}
.colon {
  height: 50px;
  padding: 0 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  &::after,
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
  }
}
</style>
