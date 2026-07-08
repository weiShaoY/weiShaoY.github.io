<script lang="ts" setup>
import { onMounted, ref } from 'vue'

/**
 * SVG动画路径组件
 * @description  SVG动画路径组件
 * @property {number} width  svg的宽度
 * @property {number} height  svg的高度
 * @property {string} path  svg的路径值
 * @property {number} duration  路径动画持续时间
 * @property {number} length  路径显示的长度
 * @property {number} begin  路径开始的位置
 * @property {number[]} dir 路径移动方向 [0,1]-正向 [1,0]-反向
 * @property {number} strokeWidth 路径的粗细
 * @property {string} color 路径的颜色
 */
type PropsType = {

  /**
   * svg的宽度
   */
  width?: number

  /**
   * svg的高度
   */
  height?: number

  /**
   * svg的路径值
   */
  path?: string

  /**
   * 路径的颜色
   */
  color?: string

  /**
   * 路径动画持续时间
   */
  duration?: number

  /**
   * 路径显示的长度
   */
  length?: number

  /**
   * 路径开始的位置
   */
  begin?: number

  /**
   * 路径移动方向 [0,1]-正向 [1,0]-反向
   */
  dir?: [number, number]

  /**
   * 路径的粗细
   */
  strokeWidth?: number
}
withDefaults(defineProps<PropsType>(), {
  width: 135,
  height: 150,
  path: 'M0 72.5H682L732 0.5H3082',
  color: '#0091FF',
  duration: 3,
  length: 100,
  begin: 0,
  dir: () => [0, 1],
  strokeWidth: 4,
})

// 生成唯一的ID
const maskId = ref('')

const radialGradientId = ref('')

onMounted(() => {
  const uid = Math.random()
    .toString(36)
    .slice(2, 11)

  maskId.value = `svgline-${uid}`
  radialGradientId.value = `radialGradient-${uid}`
})
</script>

<template>
  <div
    class="svg-line-animation"
  >
    <svg
      width="100%"
      height="100%"
      :viewBox="`0 0 ${width} ${height}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          :id="radialGradientId"
          cx="50%"
          cy="50%"
          fx="100%"
          fy="50%"
          r="50%"
        >
          <stop
            offset="0%"
            stop-color="#fff"
            :stop-opacity="dir[1]"
          />

          <stop
            offset="100%"
            stop-color="#fff"
            :stop-opacity="dir[0]"
          />
        </radialGradient>

        <mask
          :id="maskId"
        >
          <circle
            :r="length"
            cx="0"
            cy="0"
            :fill="`url(#${radialGradientId})`"
          >
            <animateMotion
              :begin="`${begin}s`"
              :dur="`${duration}s`"
              :path="path"
              rotate="auto"
              :keyPoints="`${dir[0]};${dir[1]}`"
              keyTimes="0;1"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>

      <path
        class="path-line"
        :d="path"
        :stroke="color"
        :stroke-width="strokeWidth"
        :mask="`url(#${maskId})`"
      />
    </svg>
  </div>
</template>

<style scoped>
.path-line {
  mix-blend-mode: screen;
}
</style>
