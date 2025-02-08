<script lang="ts" setup>
import type { TimeType } from '@/hooks/use-get-time'

const props = defineProps({
  /**
   *  时间对象
   */
  time: {
    type: Object as PropType<TimeType>,
    required: true,
  },

  /**
   *  颜色
   */
  color: {
    type: String,
    default: '#fff',
  },

  /**
   *  是否24小时制
   */
  is24Hour: {
    type: Boolean,
    default: true,
  },
})

function renderDate(date = new Date()) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const year = date.getFullYear()

  const month = months[date.getMonth()]

  const day = date.getDate()

  return `${month} ${day}, ${year}` // 格式为 "Month Day, Year"
}

const hour = computed(() => {
  return props.is24Hour ? props.time.hour24 : props.time?.hour12
})
</script>

<template>
  <div
    class="max-w-full flex flex-col items-center justify-center"
    :style="{
      color,
      borderColor: color,
    }"
  >
    <div>
      <div
        class="text-3xl font-600 tabular-nums"
      >
        {{ renderDate() }}
      </div>

      <div
        class="text-5xl font-700 tabular-nums"
      >
        {{ hour < 10 ? `0${hour}` : hour }}
        <span>
          :
        </span>

        {{ time?.minute < 10 ? `0${time?.minute}` : time?.minute }}
        <span>
          :
        </span>

        {{ time?.second < 10 ? `0${time?.second}` : time?.second }}

        <span>
          {{ is24Hour ? '' : time?.hour12 >= 12 ? 'PM' : 'AM' }}
        </span>
      </div>
    </div>
  </div>
</template>
