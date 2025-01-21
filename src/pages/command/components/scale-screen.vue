<script lang="ts" setup>
import type { CSSProperties, PropType } from 'vue'

import {
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from 'vue'

const props = defineProps({
  /**
   * 大屏的宽度
   * 可以是字符串或数字类型，默认为 1920
   */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: 1920,
  },

  /**
   * 大屏的高度
   * 可以是字符串或数字类型，默认为 1080
   */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: 1080,
  },

  /**
   * 是否全屏显示
   * 默认为 false
   */
  fullScreen: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  /**
   * 自动缩放设置
   * 可以是一个对象或布尔值，默认为 true
   * 如果为 true，将启用自动缩放功能，具体实现由 IAutoScale 类型定义
   */
  autoScale: {
    type: [Object, Boolean] as PropType<IAutoScale>,
    default: true,
  },

  /**
   * 延迟时间，单位毫秒
   * 控制大屏操作的延迟，默认为 500 毫秒
   */
  delay: {
    type: Number as PropType<number>,
    default: 500,
  },

  /**
   * 外部容器的样式
   * 用于自定义大屏容器的 CSS 样式，默认为空对象
   */
  boxStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({
    }),
  },

  /**
   * 包裹容器的样式
   * 用于自定义包裹大屏的容器的 CSS 样式，默认为空对象
   */
  wrapperStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({
    }),
  },
})

/**
 * 防抖函数
 * @param {Function} fn - 要防抖的函数
 * @param {number} delay - 防抖延迟时间（毫秒）
 * @returns {() => void} - 返回一个防抖后的函数
 */
function debounce(fn: (...args: any[]) => void, delay: number): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (...args: any[]): void {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn(...args)
    }, delay > 0 ? delay : 100)
  }
}

type IState = {
  originalWidth: string | number
  originalHeight: string | number
  width?: string | number
  height?: string | number
  observer: null | MutationObserver
}
  type IAutoScale =
    | boolean
    | {
      x?: boolean
      y?: boolean
    }
const state = reactive<IState>({
  width: 0,
  height: 0,
  originalWidth: 0,
  originalHeight: 0,
  observer: null,
})

const styles: Record<string, CSSProperties> = {
  box: {
    overflow: 'hidden',
    backgroundSize: `100% 100%`,
    background: `#000`,
    width: `100vw`,
    height: `100vh`,
  },
  wrapper: {
    transitionProperty: `all`,
    transitionTimingFunction: `cubic-bezier(0.4, 0, 0.2, 1)`,
    transitionDuration: `500ms`,
    position: `relative`,
    overflow: `hidden`,
    zIndex: 100,
    transformOrigin: `left top`,
  },
}

const screenWrapper = ref<HTMLElement>()

const box = ref<HTMLElement>()

watch(
  () => props.autoScale,
  async (newVal: any) => {
    if (newVal) {
      onResize()
      addListener()
    }
    else {
      clearListener()
      clearScreenWrapperStyle()
    }
  },
)

/**
 * 初始化大屏容器宽高
 */
function initSize() {
  return new Promise<void>((resolve) => {
    box.value!.scrollLeft = 0
    box.value!.scrollTop = 0
    nextTick(() => {
      // region 获取大屏真实尺寸
      if (props.width && props.height) {
        state.width = props.width
        state.height = props.height
      }
      else {
        state.width = screenWrapper.value?.clientWidth
        state.height = screenWrapper.value?.clientHeight
      }

      // endregion

      // region 获取画布尺寸
      if (!state.originalHeight || !state.originalWidth) {
        state.originalWidth = window.screen.width
        state.originalHeight = window.screen.height
      }

      // endregion
      resolve()
    })
  })
}

/**
 * 更新大屏容器宽高
 */
function updateSize() {
  if (state.width && state.height) {
    screenWrapper.value!.style.width = `${state.width}px`
    screenWrapper.value!.style.height = `${state.height}px`
  }
  else {
    screenWrapper.value!.style.width = `${state.originalWidth}px`
    screenWrapper.value!.style.height = `${state.originalHeight}px`
  }
}

function clearScreenWrapperStyle() {
  screenWrapper.value!.style.transform = ''
  screenWrapper.value!.style.margin = ''
}

function autoScale(scale: number) {
  if (!props.autoScale) {
    return
  }

  const domWidth = screenWrapper.value!.clientWidth

  const domHeight = screenWrapper.value!.clientHeight

  const currentWidth = document.body.clientWidth

  const currentHeight = document.body.clientHeight

  screenWrapper.value!.style.transform = `scale(${scale},${scale})`
  let mx = Math.max((currentWidth - domWidth * scale) / 2, 0)

  let my = Math.max((currentHeight - domHeight * scale) / 2, 0)

  if (typeof props.autoScale === 'object') {
    !props.autoScale.x && (mx = 0)
    !props.autoScale.y && (my = 0)
  }

  screenWrapper.value!.style.margin = `${my}px ${mx}px`
}

function updateScale() {
  // 获取真实视口尺寸
  const currentWidth = document.body.clientWidth

  const currentHeight = document.body.clientHeight

  // 获取大屏最终的宽高
  const realWidth = state.width || state.originalWidth

  const realHeight = state.height || state.originalHeight

  // 计算缩放比例
  const widthScale = currentWidth / +realWidth

  const heightScale = currentHeight / +realHeight

  // 若要铺满全屏，则按照各自比例缩放
  if (props.fullScreen) {
    screenWrapper.value!.style.transform = `scale(${widthScale},${heightScale})`
    return false
  }

  // 按照宽高最小比例进行缩放
  const scale = Math.min(widthScale, heightScale)

  autoScale(scale)
}

const onResize = debounce(async () => {
  await initSize()
  updateSize()
  updateScale()
}, props.delay)

function clearListener() {
  window.removeEventListener('resize', onResize)
}

function addListener() {
  window.addEventListener('resize', onResize)
}

onMounted(() => {
  nextTick(async () => {
    await initSize()
    updateSize()
    updateScale()
    addListener()
  })
})
onUnmounted(() => {
  clearListener()
})
</script>

<template>
  <section
    ref="box"
    :style="{ ...styles.box, ...boxStyle }"
    class="v-screen-box"
  >
    <div
      ref="screenWrapper"
      :style="{ ...styles.wrapper, ...wrapperStyle }"
      class="screen-wrapper"
    >
      <slot />
    </div>
  </section>
</template>
