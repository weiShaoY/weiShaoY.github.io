import {
  Lunar,
  Solar,
  SolarWeek,
} from 'lunar-typescript'

import { ref } from 'vue'

/**
 *  当前时间对象的类型
 */
export type TimeType = {

  /**
   * 当前年
   */
  year: number

  /**
   * 当前月
   */
  month: number

  /**
   *  当前日
   */
  day: number

  /**
   *  当前时  12小时制
   */
  hour12: number

  /**
   *  当前时 24小时制
   */
  hour24: number

  /**
   *  当前分
   */
  minute: number

  /**
   *  当前秒
   */
  second: number

  /**
   *  当前星期 (在 本年 中的第几周)
   */
  currentWeekInYear: number

  /**
   *  当前是周几
   */
  week: string

  /**
   *  农历的日
   */
  lunarDay: string

  /**
   *  农历的月
   */
  lunarMonth: string

  /**
   *  农历的年
   */
  lunarYear: string

  /**
   *  农历的时辰
   */
  lunarHour: string

}

const solar = ref<Solar | undefined>(undefined)

const lunar = ref<Lunar | undefined>(undefined)

/**
 *  获取当前时间
 */
function getTime(time: TimeType) {
  solar.value = Solar.fromDate(new Date())
  lunar.value = Lunar.fromDate(new Date())

  time.year = solar.value.getYear()

  time.month = solar.value.getMonth()

  time.day = solar.value.getDay()

  time.hour24 = solar.value.getHour()

  time.hour12 = solar.value.getHour() % 12 === 0 ? 12 : solar.value.getHour() % 12

  time.minute = solar.value.getMinute()

  time.second = solar.value.getSecond()

  time.currentWeekInYear = SolarWeek.fromDate(new Date(), 1).getIndexInYear()

  time.week = solar.value.getWeekInChinese()

  time.lunarDay = lunar.value.getDayInChinese()

  time.lunarMonth = lunar.value.getMonthInChinese()

  time.lunarYear = lunar.value.getYearInChinese()

  time.lunarHour = lunar.value.getTimeZhi() // 地支
}

/**
 * @description 获取本地时间
 */
export default function useGetTime() {
  /**
   *  当前时间对象
   */
  const time = ref<TimeType>(
    {
      year: 0,
      month: 0,
      day: 0,
      hour12: 0,
      hour24: 0,
      minute: 0,
      second: 0,
      currentWeekInYear: 0,
      week: '',
      lunarDay: '',
      lunarMonth: '',
      lunarYear: '',
      lunarHour: '',
    },
  )

  const updateTime = () => getTime(time.value)

  // 启动定时器
  const intervalId = setInterval(updateTime, 1000)

  // 在组件卸载时清除定时器
  onUnmounted(() => clearInterval(intervalId))

  // 在组件挂载时初始化时间
  onMounted(updateTime)

  return time
}
