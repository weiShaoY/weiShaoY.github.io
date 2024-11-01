<!------------------------------------  日历  ------------------------------------------------->
<script lang="ts" setup>
import type { DayType, StateType } from './calendarUtils'

import CalendarUtils from './calendarUtils'

/**
 *  存储日历的状态，如年份、月份等
 */
const state = ref<StateType>(CalendarUtils.init())

onMounted(() => {
  CalendarUtils.render(state.value)
})

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

/**
 *  重置为当前日期
 */
function handleToday(): void {
  state.value = CalendarUtils.init()
  CalendarUtils.render(state.value)
}

/**
 *  选择日期
 */
function handleSelectDay(day: DayType): void {
  state.value.selectedMonth = day
  CalendarUtils.render(state.value)
}

const elementRef = ref(null)

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

/**
 *  当前月份,用来给月份选择器绑定
 */
const monthPicker = ref(new Date())

// 设置监听器，当年份、月份、选中的日期或关注的节日月份变化时调用渲染函数
watchEffect(() => {
  monthPicker.value = new Date(state.value.year, state.value.month - 1, 1)
  CalendarUtils.render(state.value)
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
</script>

<template>
  <div
    class="h-full w-full flex items-center justify-center"
  >
    <div
      class="h-full w-full flex items-center justify-between bg-white p-3"
    >
      <!-- 左边 -->
      <div
        class="h-full w2/3 flex flex-col p5"
      >

        <!-- 日期选择和按钮行  -->
        <div
          class="m-t-5 h10 flex items-center"
        >

          <a-month-picker
            v-model="monthPicker"
            class="m-l-3 w30"
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

        <!-- 日历的星期数组 -->
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
            class="m-x-1 text-center text-4"
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
              class="w10 text-3"
            >
              {{ week.weekIndex }}
              <span>周</span>
            </div>

            <div
              v-for="(day, dayIndex) in week.dayArray"
              :key="dayIndex"
              :class=" {
                today: day.isToday,
                selected: day.isSelected,
                festival: day.isFestival,
                other: day.month !== state.month,
                rest: day.isRestDay,
                weekend: dayIndex >= 5,
              }"
              class="relative m-x-1 h-full flex flex-col flex-1 cursor-pointer items-center justify-center border-3 rounded-3 hover:border-primary"
              @click="handleSelectDay(day)"
            >
              <!-- 日期 -->
              <div
                class="date text-5 font-bold"
              >
                {{ day.day }}
              </div>

              <!-- 文字 -->
              <div
                class="desc text-center text-3 leading-4"
              >
                {{ day.desc }}
              </div>

              <!-- 标记 -->
              <div
                v-if="day.isHoliday"
                :class="day.isRestDay ? 'bg-red' : 'bg-[#333]'"
                class="sign red absolute right-1 top-1 h4 w4 flex items-center justify-center rounded-1 text-3 text-white"
              >
                {{ day.isRestDay ? '休' : '班' }}
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- 右边 -->
      <div
        class="flex-1 bg-[#F5F5F5] p-x-5 p-y-6 text-center"
      >

        <div
          class="m-x-auto h20 w20 flex items-center justify-center rounded-3 bg-primary text-12 color-white"
        >
          {{ state.selectedMonth.day }}
        </div>

        <div
          class=""
        >
          <span>
            {{ state.selectedMonth.ymd }}
          </span>

          <span
            class=""
          >
            周{{ state.selectedMonth.dayOfWeek }}
          </span>

        </div>

        <div>
          <span>
            {{ state.selectedMonth.lunarMonth }}月
          </span>

          <span>
            {{ state.selectedMonth.lunarDay }}
          </span>
        </div>

        <!-- 生肖 -->
        <div>
          <span>
            {{ state.selectedMonth.yearGanZhi }}年
          </span>

          <span>
            {{ state.selectedMonth.shengXiao }}
          </span>
        </div>

        <div>
          <span>
            {{ state.selectedMonth.monthGanZhi }}月
          </span>

          <span>
            {{ state.selectedMonth.dayGanZhi }}日
          </span>
        </div>

        <div>
          <span>
            本年第{{ state.selectedMonth.weekOfYear }}周
          </span>

          <span
            class="m-l-3"
          >
            第{{ state.selectedMonth.dayOfYear }}天
          </span>
        </div>

        <template
          v-if="!state.selectedMonth.isToday"
        >
          <a-divider
            :margin="10"
          />

          <div
            class="flex"
          >
            距离
            {{
              state.selectedMonth.festivalArray[0] ? state.selectedMonth.festivalArray[0] : `${state.selectedMonth.year}年${state.selectedMonth.month}月${state.selectedMonth.day}日`
            }}

            <span>
              {{ state.selectedMonth.dayFromToday > 0 ? '还有' : '已经过去' }}
            </span>

            <!-- 如果为负数则取反 -->
            <span>
              {{ Math.abs(state.selectedMonth.dayFromToday) }}
            </span>

            天
          </div>

        </template>

        <a-divider
          :margin="10"
        />

        <div
          class="flex items-center"
        >
          <div
            class="m-r-3 min-w-10 rounded-1 bg-red text-white"
          >
            生肖
          </div>

          <div>
            {{ state.selectedMonth.shengXiao }}
          </div>
        </div>

        <a-divider
          :margin="10"
        />

        <div
          class="flex items-center"
        >
          <div
            class="m-r-3 min-w-10 rounded-1 bg-[#EB7DAC] text-white"
          >
            星座
          </div>

          <div>
            {{ state.selectedMonth.xingZuo }}座
          </div>
        </div>

        <a-divider
          :margin="10"
        />

        <template
          v-if="state.selectedMonth.festivalArray.length"
        >
          <div
            class="flex items-center"
          >
            <div
              class="m-r-3 min-w-10 rounded-1 bg-primary text-white"
            >
              节日
            </div>

            <div
              class="flex items-center"
            >
              <span
                v-for="festival in state.selectedMonth.festivalArray"
                :key="festival"
                class="m-r-1"
              >
                {{ festival }}
              </span>
            </div>

          </div>

          <a-divider
            :margin="10"
          />
        </template>

        <div
          class="flex items-center"
        >
          <div
            class="m-r-3 w10 rounded-1 bg-green text-white"
          >
            宜
          </div>

          <div
            class="grid grid-cols-5 max-h20 w-full overflow-y-auto text-left"
          >
            <span
              v-for="(item, index) in state.selectedMonth.yiArray"
              :key="index"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <a-divider
          :margin="10"
        />

        <div
          class="flex items-center"
        >
          <div
            class="m-r-3 w10 rounded-1 bg-red text-white"
          >
            忌
          </div>

          <div
            class="grid grid-cols-5 w-full text-left"
          >
            <span
              v-for="(item, index) in state.selectedMonth.jiArray"
              :key="index"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <a-divider
          :margin="10"
        />

        <div
          class="grid grid-cols-2 w-full gap3"
        >
          <div
            class="m-r-10 flex"
          >
            <div
              class="bg-grey m-r-3 w10 rounded-1 text-white"
            >
              月相
            </div>

            <div>
              {{ state.selectedMonth.yueXiang }}
            </div>
          </div>

          <div
            class="flex"
          >
            <div
              class="bg-grey m-r-3 w10 rounded-1 text-white"
            >
              物候
            </div>

            <div>
              {{ state.selectedMonth.wuHou }}
            </div>
          </div>

          <div
            class="m-r-10 flex"
          >
            <div
              class="bg-grey m-r-3 w10 rounded-1 text-white"
            >
              福神
            </div>

            <div>
              {{ state.selectedMonth.fuShen }}
            </div>
          </div>

          <div
            class="m-r-10 flex"
          >
            <div
              class="bg-grey m-r-3 w10 rounded-1 text-white"
            >
              财神
            </div>

            <div>
              {{ state.selectedMonth.caiShen }}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 为今天
.today {
  background-color: #7777ff;

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
