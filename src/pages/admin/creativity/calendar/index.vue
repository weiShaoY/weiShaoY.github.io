<!------  2025-04-05---05:04---星期六  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { StateType } from './utils'

import Left from './left.vue'

import Right from './right.vue'

import CalendarUtils from './utils'

/**
 *  存储日历的状态，如年份、月份等
 */
const state = ref<StateType>(CalendarUtils.init())

onMounted(() => {
  CalendarUtils.render(state.value)
})
</script>

<template>
  <ElSpace
    direction="vertical"
    fill
    class="pb-0"
    :size="16"
  >

    <ElRow
      :gutter="16"
    >
      <ElCol
        :lg="16"
        :sm="24"
        class="mb-[16px]"
      >
        <Left
          v-model="state"
        />

      </ElCol>

      <ElCol
        :lg="8"
        :sm="24"
        class="mb-[16px]"
      >
        <Right
          v-model="state"
        />
      </ElCol>
    </ElRow>
  </ElSpace>
</template>
