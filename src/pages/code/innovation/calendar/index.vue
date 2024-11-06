<!------------------------------------  日历  ------------------------------------------------->
<script lang="ts" setup>
import type { StateType } from './calendarUtils'

import CalendarUtils from './calendarUtils'

import Left from './left.vue'

import Right from './right.vue'

/**
 *  存储日历的状态，如年份、月份等
 */
const state = ref<StateType>(CalendarUtils.init())

onMounted(() => {
  CalendarUtils.render(state.value)
})
</script>

<template>
  <div
    class="h-full w-full flex items-center justify-center"
  >
    <div
      class="h-full w-full flex items-center justify-between bg-white p-3"
    >
      <Left
        v-model="state"
      />

      <Right
        v-model="state"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
