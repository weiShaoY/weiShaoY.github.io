<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useGetTime } from '@/hooks'

const time = useGetTime()

const hourHandStyle = computed(() => {
  const degrees = (time.value.hour24 % 12) * 30 + time.value.minute * 0.5

  return `transform: rotate(${degrees}deg)`
})

const minuteHandStyle = computed(() => {
  const degrees = time.value.minute * 6 + time.value.second * 0.1

  return `transform: rotate(${degrees}deg)`
})

const secondHandStyle = computed(() => {
  const degrees = time.value.second * 6

  return `transform: rotate(${degrees}deg)`
})

watchEffect(async () => {
  console.log('%c Line:28 🥐 time', 'color:#42b983', time.value)
})

</script>

<template>
  <div
    class="h-full w-full flex items-center justify-center"
  >
    <div
      class="h-full w-full flex justify-center justify-between bg-#1e1f26"
    >

      <div
        class="relative aspect-square h-full flex items-center justify-center bg-#1e1f26"
      >
        <div
          class="clock"
        >
          <div
            :style="hourHandStyle"
            class="absolute left-1/2 top-3/10 z-0 h-1/5 w-[4px] origin-bottom transform transform rounded-full bg-[#FFF] -ml-1px"
          />

          <div
            :style="minuteHandStyle"
            class="absolute top-1/4 z-1 h-1/4 w-3px origin-bottom transform rounded-full bg-[#FFF]"
          />

          <div
            :style="secondHandStyle"
            class="absolute left-1/2 top-1/6 h-1/3 w-2px origin-bottom transform rounded-full bg-#FF0000"
          />
        </div>
      </div>

      <div
        class="flex flex-col flex-1 items-center justify-center text-white"
      >
        <div>
          星期{{ time.week }}
        </div>

        <div>
          {{ time.year }} 年 {{ time.month }} 月 {{ time.day }}日
        </div>

        <div
          class=""
        >
          {{ time.hour24 }} : {{ time.minute }} : {{ time.second }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.clock {
  background-image: url('./image/clock.png');
  background-color: #1e1f26;
  background-size: cover;
  background-position: center center;
  height: 80%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 4px solid #1e1f26;
  box-shadow:
    0 -1.5vmin 1.5vmin rgba(255, 255, 255, 0.05),
    inset 0 -1.5vmin 1.5vmin rgba(255, 255, 255, 0.05),
    0 1.5vmin 1.5vmin rgba(0, 0, 0, 0.3),
    inset 0 1.5vmin 1.5vmin rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  &:before {
    content: '';
    height: 8px;
    width: 8px;
    background-color: #ccc;
    border: 0.2vmin solid #1e1f26;
    position: absolute;
    border-radius: 50%;
    z-index: 1000;
    transition: all ease 0.2s;
  }
}
</style>
