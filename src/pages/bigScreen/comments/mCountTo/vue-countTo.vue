<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

import { cancelAnimationFrame, requestAnimationFrame } from './requestAnimationFrame'

/**
 * 缓动函数类型定义
 */
type EasingFunction = (t: number, b: number, c: number, d: number) => number

/**
 * 定义 Props
 */
const props = withDefaults(defineProps<Props>(), {
  startVal: 0,
  endVal: 2017,
  duration: 3000,
  autoplay: true,
  decimals: 0,
  decimal: '.',
  separator: ',',
  prefix: '',
  suffix: '',
  useEasing: true,
  easingFn: (t, b, c, d) => {
    return (c * (-(2 ** ((-10 * t) / d)) + 1) * 1024) / 1023 + b
  },
})

/**
 * 定义 Emits
 */
const emit = defineEmits<{

  /** 动画完成回调 */
  callback: []
  /** 组件挂载回调 */
  mountedCallback: []
}>()

/**
 * 组件 Props 类型定义
 */
type Props = {

  /** 起始值 */
  startVal?: number

  /** 结束值 */
  endVal?: number

  /** 动画持续时间（毫秒） */
  duration?: number

  /** 是否自动播放 */
  autoplay?: boolean

  /** 小数位数 */
  decimals?: number

  /** 小数点符号 */
  decimal?: string

  /** 千位分隔符 */
  separator?: string

  /** 前缀 */
  prefix?: string

  /** 后缀 */
  suffix?: string

  /** 是否使用缓动函数 */
  useEasing?: boolean

  /** 缓动函数 */
  easingFn?: EasingFunction
}

/**
 * 响应式数据
 */
const localStartVal = ref(props.startVal)

const displayValue = ref('')

const printVal = ref<number | null>(null)

const paused = ref(false)

const localDuration = ref(props.duration)

const startTime = ref<number | null>(null)

const timestamp = ref<number | null>(null)

const remaining = ref<number | null>(null)

const rAF = ref<number | null>(null)

/**
 * 计算属性
 */
const countDown = computed(() => {
  return props.startVal > props.endVal
})

/**
 * 工具函数：判断是否为数字
 */
function isNumber(val: any): boolean {
  return !Number.isNaN(Number.parseFloat(val))
}

/**
 * 格式化数字
 */
function formatNumber(num: number): string {
  let formattedNum = num.toFixed(props.decimals)

  formattedNum += ''
  const x = formattedNum.split('.')

  let x1 = x[0]

  const x2 = x.length > 1 ? props.decimal + x[1] : ''

  const rgx = /(\d+)(\d{3})/

  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1${props.separator}$2`)
    }
  }

  return props.prefix + x1 + x2 + props.suffix
}

/**
 * 开始动画
 */
function start(): void {
  localStartVal.value = props.startVal
  startTime.value = null
  localDuration.value = props.duration
  paused.value = false
  rAF.value = requestAnimationFrame(count)
}

/**
 * 暂停/恢复动画
 */
function pauseResume(): void {
  if (paused.value) {
    resume()
    paused.value = false
  }
  else {
    pause()
    paused.value = true
  }
}

/**
 * 暂停动画
 */
function pause(): void {
  if (rAF.value) {
    cancelAnimationFrame(rAF.value)
  }
}

/**
 * 恢复动画
 */
function resume(): void {
  startTime.value = null
  localDuration.value = +(remaining.value || 0)
  localStartVal.value = +(printVal.value || 0)
  rAF.value = requestAnimationFrame(count)
}

/**
 * 重置动画
 */
function reset(): void {
  startTime.value = null
  if (rAF.value) {
    cancelAnimationFrame(rAF.value)
  }

  displayValue.value = formatNumber(props.startVal)
}

/**
 * 动画计数函数
 */
function count(currentTimestamp: number): void {
  if (!startTime.value) {
    startTime.value = currentTimestamp
  }

  timestamp.value = currentTimestamp
  const progress = currentTimestamp - startTime.value

  remaining.value = localDuration.value - progress

  if (props.useEasing) {
    if (countDown.value) {
      printVal.value = localStartVal.value - props.easingFn(
        progress,
        0,
        localStartVal.value - props.endVal,
        localDuration.value,
      )
    }
    else {
      printVal.value = props.easingFn(
        progress,
        localStartVal.value,
        props.endVal - localStartVal.value,
        localDuration.value,
      )
    }
  }
  else {
    if (countDown.value) {
      printVal.value = localStartVal.value - (localStartVal.value - props.endVal) * (progress / localDuration.value)
    }
    else {
      printVal.value = localStartVal.value + (props.endVal - localStartVal.value) * (progress / localDuration.value)
    }
  }

  if (countDown.value) {
    printVal.value = printVal.value < props.endVal ? props.endVal : printVal.value
  }
  else {
    printVal.value = printVal.value > props.endVal ? props.endVal : printVal.value
  }

  displayValue.value = formatNumber(printVal.value)

  if (progress < localDuration.value) {
    rAF.value = requestAnimationFrame(count)
  }
  else {
    emit('callback')
  }
}

/**
 * 监听 startVal 变化
 */
watch(() => props.startVal, () => {
  if (props.autoplay) {
    start()
  }
})

/**
 * 监听 endVal 变化
 */
watch(() => props.endVal, () => {
  if (props.autoplay) {
    start()
  }
})

/**
 * 组件挂载
 */
onMounted(() => {
  displayValue.value = formatNumber(props.startVal)

  if (props.autoplay) {
    start()
  }

  emit('mountedCallback')
})

/**
 * 组件卸载
 */
onUnmounted(() => {
  if (rAF.value) {
    cancelAnimationFrame(rAF.value)
  }
})

/**
 * 暴露方法给父组件
 */
defineExpose({
  start,
  pauseResume,
  pause,
  resume,
  reset,
})
</script>

<template>
  <span>
    {{ displayValue }}
  </span>
</template>
