<script lang="ts" setup>
import type { TimeType } from '@/hooks/get-time'

defineProps({
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
</script>

<template>
  <div
    class="max-w-full flex flex-col items-center justify-center"
    :style="{
      color,
    }"
  >
    <!-- 时分秒 -->
    <div
      class="w-70 flex items-center text-18 font-bold"
    >
      <div
        v-if="is24Hour"
      >
        {{
          time.hour24 < 10 ? `0${time.hour24}` : time.hour24

        }}
      </div>

      <div
        v-else
      >
        {{
          time.hour12 < 10 ? `0${time.hour12}` : time.hour12
        }}
      </div>

      <span>
        :
      </span>

      <div>
        {{
          time.minute < 10 ? `0${time.minute}` : time.minute
        }}
      </div>

      <span>
        :
      </span>

      <div>
        {{
          time.second < 10 ? `0${time.second}` : time.second
        }}
      </div>
    </div>

    <a-space>
      <!-- 年月日 -->
      <div
        class="m-r-2"
      >
        <span>
          {{ time.year }}
        </span>

        <span>
          年
        </span>

        <span>
          {{ time.month }}
        </span>

        <span>
          月
        </span>

        <span>
          {{ time.day }}
        </span>

        <span>
          日
        </span>
      </div>

      <!-- 星期 -->
      <div
        class="m-r-2"
      >
        星期{{ time.week }}
      </div>

      <!-- 农历 -->
      <div>
        {{ time.lunarMonth }}月{{ time.lunarDay }}
      </div>
    </a-space>
  </div>
</template>
