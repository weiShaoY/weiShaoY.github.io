<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  onMounted,
  ref,
} from 'vue'

import svg_card_content_bottom_left_arrow from '@/assets/svgs/bigScreen/card-content-bottom-left-arrow.svg'

import svg_card_content_bottom_right_arrow from '@/assets/svgs/bigScreen/card-content-bottom-right-arrow.svg'

import svg_card_content_middle_line from '@/assets/svgs/bigScreen/card-content-middle-line.svg'

import svg_card_saoguang from '@/assets/svgs/bigScreen/card-saoguang.svg'

import svg_card_title_zs1 from '@/assets/svgs/bigScreen/card-title-zs1.svg'

type PropsType = {

  /**
   * 宽度
   */
  width?: number

  /**
   * 高度
   */
  height?: number

  /**
   * 标题
   */
  title?: string
}
const props = withDefaults(defineProps<PropsType>(), {
  width: 398,
  height: 200,
  title: '标题',
})

/**
 * 唯一id
 */
const componentsUID = ref('1')

/**
 * svg的路径计算
 */
const titleStorke = computed(() => {
  const width = props.width

  return `M165 0.5
  L165.707 -0.207107
  L165.414 -0.5
  H165
  V0.5Z
  M10 0.5
  V-0.5
  H9.58579
  L9.29289 -0.207107
  L10 0.5Z
  M175 10.5
  L174.293 11.2071
  L174.586 11.5
  H175
  V10.5Z
  M${width} 10.5
  H${width + 1}
  V9.5
  H${width}
  V10.5Z
  M${width} 34.5
  V35.5
  H${width + 1}
  V34.5
  H${width}Z
  M0 34.5
  H-1
  V35.5
  H0
  V34.5Z
  M0 10.5
  L-0.707107 9.79289
  L-1 10.0858
  V10.5
  H0Z
  M165 -0.5
  H10
  V1.5
  H165
  V-0.5Z
  M175.707 9.79289
  L165.707 -0.207107
  L164.293 1.20711
  L174.293 11.2071
  L175.707 9.79289Z
  M${width} 9.5
  H175
  V11.5
  H${width}
  V9.5Z
  M${width + 1} 34.5
  V10.5
  H397
  V34.5
  H${width + 1}Z
  M0 35.5
  H${width}
  V33.5
  H0
  V35.5Z
  M-1 10.5
  V34.5
  H1
  V10.5
  H-1Z
  M9.29289 -0.207107
  L-0.707107 9.79289
  L0.707107 11.2071
  L10.7071 1.20711
  L9.29289 -0.207107Z`
})

/**
 * bd的路径
 */
const bdPath = computed(() => {
  const minHeight = 156

  const diff = props.height - minHeight

  const width = props.width

  // if (diff < minHeight) diff = 0
  return `M3.485 ${46.0565 + diff / 2}
  V${45.8735 + diff / 2}
  L3.36682 ${45.7337 + diff / 2}
  L0.5 ${42.343 + diff / 2}
  V1
  H${width - 0.5}
  V${42.3431 + diff / 2}
  L${width - 3.367} ${45.7337 + diff / 2}
  L${width - 3.485} ${45.8735 + diff / 2}
  V${46.0565 + diff / 2}
  L${width - 3.367} ${88.745 + diff / 2}
  L${width - 0.5} ${92.135 + diff / 2}
  V${155 + diff}
  H0.5
  V${92.135 + diff / 2}
  L3.36682 ${88.745 + diff / 2}
  L3.485 ${88.605 + diff / 2}
  V${88.422 + diff / 2}
  V${46.0565 + diff / 2}Z`
})

const calcWidthHeightStyle = computed(() => {
  return `width:${props.width}px;height:${props.height}px;`
})

onMounted(() => {
  componentsUID.value = `__${getCurrentInstance()?.uid}` as string
})
</script>

<template>
  <div
    class="m-card relative"
    :style="calcWidthHeightStyle"
  >
    <div
      class="m-card-hd absolute left-0 top-0 z-2 w-full"
    >
      <div
        class="m-card-hd-bg absolute left-0 top-0"
      >
        <svg
          :width="width"
          height="36"
          :viewBox="`0 0 ${width} 36`"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            :clip-path="`url(#clip0_70_69244${componentsUID})`"
          >
            <rect
              y="34.5"
              :width="width"
              height="1"
              fill="url(#paint0_linear_70_69244)"
            />

            <mask
              :id="`path-2-inside-1_70_69244${componentsUID}`"
              fill="white"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                :d="`M10 0.5H165L175 10.5H${width}V34.5H0V10.5L10 0.5Z`"
              />
            </mask>

            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              :d="`M10 0.5H165L175 10.5H${width}V34.5H0V10.5L10 0.5Z`"
              :fill="`url(#paint1_linear_70_69244${componentsUID})`"
            />

            <path
              :d="titleStorke"
              :fill="`url(#paint2_linear_70_69244${componentsUID})`"
              :mask="`url(#path-2-inside-1_70_69244${componentsUID})`"
            />

            <g
              opacity="0.5"
            >
              <mask
                id="mask0_70_69244"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="12"
                y="-12"
                width="165"
                height="29"
              >
                <g
                  style="mix-blend-mode: plus-lighter"
                  opacity="0.8"
                >
                  <path
                    d="M177 2.5C177 -4.22 139.531 -11.5 93.9677 -11.5C48.4043 -11.5 12 -5.23199 12 2.5C12 10.232 48.4043 16.5 93.9677 16.5C139.531 16.5 177 9.22 177 2.5Z"
                    fill="url(#paint3_diamond_70_69244)"
                  />
                </g>
              </mask>

              <g
                mask="url(#mask0_70_69244)"
              >
                <g
                  style="mix-blend-mode: plus-lighter"
                  opacity="0.8"
                >
                  <path
                    d="M177 0.999998C177 -6 137.934 -11.5 92.371 -11.5C46.8075 -11.5 12 -5.90356 12 0.999998C12 7.90356 46.8075 13.5 92.371 13.5C137.934 13.5 177 8 177 0.999998Z"
                    fill="url(#paint4_diamond_70_69244)"
                  />
                </g>
              </g>
            </g>

            <g
              style="mix-blend-mode: plus-lighter"
              opacity="0.1"
            >
              <ellipse
                cx="81.5264"
                cy="12.5"
                rx="81.5264"
                ry="12.5"
                transform="matrix(1 0 0 -1 12 13.5)"
                fill="url(#paint5_radial_70_69244)"
              />
            </g>

            <path
              d="M0 0.5H6L0 6.5V0.5Z"
              fill="#30DCFF"
            />

            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M170 0.5H398V7.5H177L170 0.5Z"
              fill="url(#paint6_linear_70_69244)"
            />

            <g
              style="mix-blend-mode: plus-lighter"
              :clip-path="`url(#clip1_70_69244${componentsUID})`"
            >
              <g
                style="mix-blend-mode: plus-lighter"
                opacity="0.8"
              >
                <ellipse
                  cx="65"
                  cy="2.16667"
                  rx="65"
                  ry="2.16667"
                  transform="matrix(1 1.64302e-07 0.0495776 0.99877 27.6855 -1.82568)"
                  fill="url(#paint7_radial_70_69244)"
                />
              </g>

              <g
                style="mix-blend-mode: plus-lighter"
                opacity="0.5"
              >
                <ellipse
                  cx="28.7857"
                  cy="4.16667"
                  rx="28.7857"
                  ry="4.16667"
                  transform="matrix(1 1.64302e-07 0.0495776 0.99877 63.8008 -3.82324)"
                  fill="url(#paint8_radial_70_69244)"
                />
              </g>

              <g
                style="mix-blend-mode: plus-lighter"
                opacity="0.54"
              >
                <ellipse
                  cx="23.2143"
                  cy="2.16667"
                  rx="23.2143"
                  ry="2.16667"
                  transform="matrix(1 1.64302e-07 0.0495776 0.99877 69.4727 -1.82568)"
                  fill="url(#paint9_radial_70_69244)"
                />
              </g>

              <g
                style="mix-blend-mode: plus-lighter"
                opacity="0.8"
              >
                <ellipse
                  cx="9.28571"
                  cy="2.16667"
                  rx="9.28571"
                  ry="2.16667"
                  transform="matrix(1 1.64302e-07 0.0495776 0.99877 83.4004 -1.82568)"
                  fill="url(#paint10_radial_70_69244)"
                />
              </g>
            </g>
          </g>

          <defs>
            <linearGradient
              id="paint0_linear_70_69244"
              :x1="width"
              y1="35.5021"
              x2="0"
              y2="35.5021"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                stop-color="#35A8EB"
                stop-opacity="0.1"
              />

              <stop
                offset="1"
                stop-color="#30DCFF"
              />
            </linearGradient>

            <linearGradient
              :id="`paint1_linear_70_69244${componentsUID}`"
              :x1="width"
              y1="17.5"
              x2="7.94819"
              y2="17.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0.0364889"
                stop-color="#35A8EB"
                stop-opacity="0.11"
              />

              <stop
                offset="1"
                stop-color="#30C1FF"
                stop-opacity="0.27"
              />
            </linearGradient>

            <linearGradient
              :id="`paint2_linear_70_69244${componentsUID}`"
              x1="40.8948"
              y1="13.5"
              x2="40.895"
              y2="-6.50005"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                stop-color="#35A8EB"
                stop-opacity="0"
              />

              <stop
                offset="1"
                stop-color="#30DCFF"
              />
            </linearGradient>

            <radialGradient
              id="paint3_diamond_70_69244"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(94.5 3.62) rotate(-90) scale(41.1199 76.576)"
            >
              <stop
                stop-color="#B7EEFF"
              />

              <stop
                offset="0.302515"
                stop-color="#9BE2FF"
                stop-opacity="0.76"
              />

              <stop
                offset="1"
                stop-color="#6BD4FF"
                stop-opacity="0"
              />
            </radialGradient>

            <radialGradient
              id="paint4_diamond_70_69244"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(84.3871 2.00005) rotate(-90) scale(14.0001 188.259)"
            >
              <stop
                stop-color="#B7EEFF"
              />

              <stop
                offset="0.302515"
                stop-color="#9BE2FF"
                stop-opacity="0.76"
              />

              <stop
                offset="1"
                stop-color="#6BD4FF"
                stop-opacity="0"
              />
            </radialGradient>

            <radialGradient
              id="paint5_radial_70_69244"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(80.7192 12.5) rotate(90) scale(12.5 73.8747)"
            >
              <stop
                stop-color="#00B1E9"
              />

              <stop
                offset="1"
                stop-color="#6BD4FF"
                stop-opacity="0"
              />
            </radialGradient>

            <linearGradient
              id="paint6_linear_70_69244"
              x1="567.258"
              y1="5.49999"
              x2="177.933"
              y2="5.49993"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0.429792"
                stop-color="#35A8EB"
                stop-opacity="0"
              />

              <stop
                offset="1"
                stop-color="#30C1FF"
                stop-opacity="0.27"
              />
            </linearGradient>

            <radialGradient
              id="paint7_radial_70_69244"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(64.3564 2.16667) rotate(90.0001) scale(2.16667 64.3564)"
            >
              <stop
                stop-color="#B7EEFF"
              />

              <stop
                offset="0.302515"
                stop-color="#9BE2FF"
                stop-opacity="0.76"
              />

              <stop
                offset="1"
                stop-color="#6BD4FF"
                stop-opacity="0"
              />
            </radialGradient>

            <radialGradient
              id="paint8_radial_70_69244"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(28.5007 4.16667) rotate(90) scale(4.16667 28.5007)"
            >
              <stop
                stop-color="#B7EEFF"
              />

              <stop
                offset="1"
                stop-color="#6BD4FF"
                stop-opacity="0"
              />
            </radialGradient>

            <radialGradient
              id="paint9_radial_70_69244"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(22.9844 2.16667) rotate(90) scale(2.16667 22.9844)"
            >
              <stop
                stop-color="#B7EEFF"
              />

              <stop
                offset="0.302515"
                stop-color="#9BE2FF"
                stop-opacity="0.76"
              />

              <stop
                offset="1"
                stop-color="#6BD4FF"
                stop-opacity="0"
              />
            </radialGradient>

            <radialGradient
              id="paint10_radial_70_69244"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(9.19377 2.16667) rotate(90) scale(2.16667 9.19377)"
            >
              <stop
                stop-color="#B7EEFF"
              />

              <stop
                offset="0.302515"
                stop-color="#9BE2FF"
                stop-opacity="0.76"
              />

              <stop
                offset="1"
                stop-color="#6BD4FF"
                stop-opacity="0"
              />
            </radialGradient>

            <clipPath
              :id="`clip0_70_69244${componentsUID}`"
            >
              <rect
                :width="width"
                height="35"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>

            <clipPath
              :id="`clip1_70_69244${componentsUID}`"
            >
              <rect
                width="130"
                height="4"
                fill="white"
                transform="matrix(1 1.64302e-07 -0.0495776 -0.99877 28 4.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <img
        class="m-card-hd-zs1 absolute right-3 top-3 h-3 w-30"
        :src="svg_card_title_zs1"
        alt=""
      >

      <div
        class="saoguang pointer-events-none absolute left-0 top-0 h-6 w-full overflow-hidden"
      >
        <img
          :src="svg_card_saoguang"
          alt=""
          class="h-9 w-23"
          :style="{
            animation: 'saoguangMove 6s linear infinite',
          }"
        >
      </div>

      <div
        class="m-card-hd-title absolute left-[22px] h-[36px] from-[rgba(117,232,255,1)] to-[rgba(255,255,255,1)] bg-gradient-to-b bg-clip-text text-base text-transparent font-semibold leading-[32px] tracking-[1.6px] font-['PingFangSc']"
      >
        {{ title }}
      </div>
    </div>

    <div
      class="m-card-bd absolute left-0 top-0 z-1"
      :style="calcWidthHeightStyle"
    >
      <div
        class="m-card-bd-bg absolute left-0 top-0"
        :style="calcWidthHeightStyle"
      >
        <svg
          :width="width"
          :height="height"
          :viewBox="`0 0 ${width} ${height}`"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            class="opacity-60"
          >
            <path
              :d="bdPath"
              fill="rgba(26, 57, 77,1)"
            />

            <path
              :d="bdPath"
              stroke="url(#paint1_linear_70_69585)"
            />
          </g>

          <defs>
            <linearGradient
              id="paint1_linear_70_69585"
              x1="199"
              y1="203.499"
              x2="199"
              y2="0.499359"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                stop-color="#4FC5DD"
              />

              <stop
                offset="1"
                stop-color="#05839D"
                stop-opacity="0"
              />
            </linearGradient>
          </defs>
        </svg>

        <!-- 底部左边小箭头 -->
        <img
          class="m-card-bd-bottom-left-arrow absolute bottom-1 left-1"
          :src="svg_card_content_bottom_left_arrow"
          alt=""
        >

        <!-- 底部右边小箭头 -->
        <img
          class="m-card-bd-bottom-right-arrow absolute bottom-1 right-1"
          :src="svg_card_content_bottom_right_arrow"
          alt=""
        >

        <img
          class="m-card-bd-middle-left-line absolute left-0 top-1/2 mt-[-35px]"
          :src="svg_card_content_middle_line"
          alt=""
        >

        <img
          class="m-card-bd-middle-right-line absolute right-0 top-1/2 mt-[-35px]"
          :src="svg_card_content_middle_line"
          alt=""
        >
      </div>

      <div
        class="m-card-bd-content pointer-events-auto absolute bottom-0 left-0 right-0 top-9 overflow-hidden"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">

@keyframes saoguangMove {
  from {
    transform: translateX(-160px);
  }
  to {
    transform: translateX(2000px);
  }
}
</style>
