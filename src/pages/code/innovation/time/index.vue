<!------------------------------------  时间  ------------------------------------------------->
<script lang="ts" setup>
import { useGetTime } from '@/hooks'

import TimeFour from './components/time_four/index.vue'

import TimeOne from './components/time_one/index.vue'

import TimeThree from './components/time_three/index.vue'

import TimeTwo from './components/time_two/index.vue'

const componentsList = [

  {
    key: 0,
    component: TimeOne,
  },

  {
    key: 1,
    component: TimeTwo,
  },

  {
    key: 2,
    component: TimeThree,
  },
  {
    key: 3,
    component: TimeFour,
  },
]

const time = useGetTime()

/**
 *  颜色
 */
const color = ref('#ffffff')

/**
 *  是否24小时制
 */
const is24Hour = ref(true)
</script>

<template>
  <div
    class="grid grid-cols-2 h-full w-full bg-[radial-gradient(ellipse_at_center,#969696_0%,#595959_100%)]"
  >
    <template
      v-for="item in componentsList"
      :key="item.key"
    >
      <component
        :is="item.component"
        :time="time"
        :color="color"
        :is24-hour="is24Hour"
      />
    </template>
  </div>
</template>
