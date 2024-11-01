<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { DayType, StateType } from './calendarUtils'

import CalendarUtils from './calendarUtils'

const elementRef = ref(null)

const state = defineModel<StateType>({
  required: true,
})

/**
 *  当前月份,用来给月份选择器绑定
 */
const monthPicker = ref(new Date())

/**
 *  选择日期
 */
function handleSelectDay(day: DayType): void {
  state.value.selectedDay = day

  CalendarUtils.render(state.value)
}

/**
 *  重置为当前日期
 */
function handleToday(): void {
  state.value = CalendarUtils.init()
  CalendarUtils.render(state.value)
}

// 设置监听器，当年份、月份、选中的日期或关注的节日月份变化时调用渲染函数
watchEffect(() => {
  monthPicker.value = new Date(state.value.year, state.value.month - 1, 1)
  CalendarUtils.render(state.value)
})

/**
 *  监听鼠标滚动
 */
useEventListener(elementRef, 'wheel', (event) => {
  if (event.deltaY < 0) {
    CalendarUtils.toPrevMonth(state.value)
  }
  else {
    CalendarUtils.toNextMonth(state.value)
  }
})

watch(() => state.value.holidayMonth, (newVal) => {
  const month = Number.parseInt(`${newVal}`, 10)

  if (month > 0) {
    state.value.month = month
    CalendarUtils.render(state.value)
  }
})

/**
 *  月份选择器变化
 */
function handleMonthPickerChange(value: Date): void {
  state.value.year = value.getFullYear()
  state.value.month = value.getMonth() + 1
}

/**
 *  跳转到上一个月
 */
function handlePreviousMonth(): void {
  CalendarUtils.toPrevMonth(state.value)
}

/**
 *  跳转到下一个月
 */
function handleNextMonth(): void {
  CalendarUtils.toNextMonth(state.value)
}
</script>

<template>
  <!-- 左边 -->
  <div
    class="h-full w2/3 flex flex-col p-5"
  >

    <!-- 日期选择和按钮行  -->
    <div
      class="h10 flex items-center"
    >

      <a-month-picker
        v-model="monthPicker"
        class="m-l-3 w-30"
        size="mini"
        value-format="Date"
        @change="handleMonthPickerChange"
      />

      <a-button
        class="m-l-3"
        size="mini"
        @click="handlePreviousMonth"
      >
        <template
          #icon
        >
          <SvgIcon
            icon="zuoJianTou"
          />
        </template>
      </a-button>

      <a-button
        class="m-l-3"
        size="mini"
        @click="handleNextMonth"
      >
        <template
          #icon
        >
          <SvgIcon
            icon="youJianTou"
          />
        </template>
      </a-button>

      <a-button
        v-if="state.isShowBackToday"
        class="m-l-3 !bg-primary !color-white"
        size="mini"
        @click="handleToday"
      >
        <template
          #icon
        >
          <SvgIcon
            icon="dingWei"
          />
        </template>
      </a-button>
    </div>

    <!-- 日历的星期数组 (日、一、二、三、四、五、六) -->
    <div
      class="m-l-10 flex items-center justify-around"
    >
      <div
        v-for="weekTitle in state.monthData.weekTitleArray"
        :key="weekTitle"
        :class="[
          {
            'text-red': weekTitle === '六' || weekTitle === '日',
          },
        ]"
        class="m-x-1 text-center text-6"
      >
        {{ weekTitle }}
      </div>
    </div>

    <div
      ref="elementRef"
      class="relative flex flex-col flex-1"
    >
      <!-- 背景 -->
      <div
        class="absolute left-0 top-0 h-full w-full flex items-center justify-center text-80 text-[#999] opacity-10"
      >
        {{ state.month }}
      </div>

      <div
        v-for="(week) in state.monthData.weeks"
        :key="week.weekIndex"
        class="m-y-1 h-full w-full flex items-center justify-around"
      >
        <div
          class="w-15 flex items-center justify-start text-5"
          :class="{
            'text-primary': week.isTodayWeek,
          }"
        >
          <span
            class="font-700"
          >

            {{ week.weekIndex }}

          </span>

          <span>周</span>
        </div>

        <div
          v-for="(day, dayIndex) in week.dayArray"
          :key="dayIndex"
          :class="[
            day.isSelected ? 'border-4 border-primary' : '',
            day.isRestDay ? 'bg-#FBDFDF' : '',
            dayIndex >= 5 ? 'bg-#FBDFDF' : '',
            day.isToday ? '!bg-primary' : '',
          ]"
          class="relative m-x-1 h-full flex flex-col flex-1 cursor-pointer items-center justify-center border-4 border-#D1D3D7 rounded-4 hover:border-primary"
          @click="handleSelectDay(day)"
        >
          <!-- 日期 -->
          <div
            class="date text-6 font-700"
            :class="[
              day.isRestDay ? 'text-red' : '',
              dayIndex >= 5 ? 'text-red' : '',
              day.isToday ? '!text-white' : '',
            ]"
          >
            {{ day.day }}
          </div>

          <!-- 文字 -->
          <div
            class="desc text-center text-4 font-700 leading-4"
            :class="[
              day.isFestival ? 'text-violet' : '',
              day.isToday ? '!text-white' : '',
            ]"
          >
            {{ day.desc }}
          </div>

          <!-- 标记 -->
          <div
            v-if="day.isHoliday"
            :class="day.isRestDay ? 'bg-red' : 'bg-[#333]'"
            class="sign red absolute right-1 top-1 h-4 w-4 flex items-center justify-center rounded-1 text-3 text-white"
          >
            {{ day.isRestDay ? '休' : '班' }}
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<style lang="less" scoped>
//  选中的
.today {
  background-color: #7777ff !important;

  .date {
    color: white;
  }

  .desc {
    color: white;
  }
}

//  选中
.selected {
  border: 3px solid #7777ff;
}

// 为节假日
.festival {
  .desc {
    color: #7777ff;
  }
}

// 为休息日
.rest {
  background-color: #fef5f5;

  .date {
    color: red;
  }
}

// 周末
.weekend {
  background-color: #fef5f5;

  .date {
    color: red;
  }
}

// 其他
.other {
  opacity: 0.3;
}
</style>
