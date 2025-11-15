<script setup lang="ts">
import Pickr from '@simonwep/pickr'

import {
  computed,
  onMounted,
  ref,
} from 'vue'

import '@simonwep/pickr/dist/themes/classic.min.css' // Import Pickr theme CSS

const activeTab = ref('single-color')

const colorPreview = ref('#000000')

const hexValue = ref('#000000')

const rgbValue = ref('rgb(0, 0, 0)')

const hslValue = ref('hsl(0, 0%, 0%)')

const light100 = ref('#ffffff')

const light200 = ref('#ffffff')

const light300 = ref('#ffffff')

const light400 = ref('#ffffff')

const light500 = ref('#ffffff')

const dark100 = ref('#000000')

const dark200 = ref('#000000')

const dark300 = ref('#000000')

const dark400 = ref('#000000')

const dark500 = ref('#000000')

const gradientDirection = ref('90deg')

const gradientColor1 = ref('#000000')

const gradientColor2 = ref('#000000')

const palette1Code = ref('background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f43f5e, #f97316);')

const palette2Code = ref('background: linear-gradient(90deg, #06b6d4, #0ea5e9, #3b82f6, #6366f1, #8b5cf6);')

const palette3Code = ref('background: linear-gradient(90deg, #10b981, #22c55e, #84cc16, #eab308, #f97316);')

const linearGradientPreviewStyle = computed(() => `linear-gradient(${gradientDirection.value}, ${gradientColor1.value}, ${gradientColor2.value})`)

const radialGradientPreviewStyle = computed(() => `radial-gradient(circle, ${gradientColor1.value}, ${gradientColor2.value})`)

const conicGradientPreviewStyle = computed(() => `conic-gradient(${gradientColor1.value}, ${gradientColor2.value})`)

const linearGradientCode = computed(() => `background: linear-gradient(${gradientDirection.value}, ${gradientColor1.value}, ${gradientColor2.value});`)

const radialGradientCode = computed(() => `background: radial-gradient(circle, ${gradientColor1.value}, ${gradientColor2.value});`)

const conicGradientCode = computed(() => `background: conic-gradient(${gradientColor1.value}, ${gradientColor2.value});`)

let singleColorPickrInstance: Pickr | null = null

let gradientColor1PickrInstance: Pickr | null = null

let gradientColor2PickrInstance: Pickr | null = null

function setActiveTab(tab: string) {
  activeTab.value = tab
}

function updateColorValues(color: string) {
  colorPreview.value = color

  if (singleColorPickrInstance) {
    const pickrColor = singleColorPickrInstance.getColor()

    const rgba = pickrColor.toRGBA()

    const hsla = pickrColor.toHSLA()

    hexValue.value = pickrColor.toHEXA().toString()

    const r = Math.round(rgba[0])

    const g = Math.round(rgba[1])

    const b = Math.round(rgba[2])

    const a = rgba[3].toFixed(2)

    rgbValue.value = `rgba(${r}, ${g}, ${b}, ${a})`

    const h = Math.round(hsla[0])

    const s = Math.round(hsla[1] * 100)

    const l = Math.round(hsla[2] * 100)

    const hslaAlpha = hsla[3].toFixed(2)

    hslValue.value = `hsla(${h}, ${s}%, ${l}%, ${hslaAlpha})`

    updateColorVariations(`rgb(${r}, ${g}, ${b})`)
  }
}

function lightenDarkenColor(col: string, amt: number): string {
  if (col.startsWith('rgba')) {
    const colArray = col.replace('rgba(', '').replace(')', '').split(',')

    const r = Number.parseInt(colArray[0].trim())

    const g = Number.parseInt(colArray[1].trim())

    const b = Number.parseInt(colArray[2].trim())

    return `rgb(${lightenDarken(r, amt)}, ${lightenDarken(g, amt)}, ${lightenDarken(b, amt)})`
  }
  else if (col.startsWith('rgb')) {
    const colArray = col.replace('rgb(', '').replace(')', '').split(',')

    const r = Number.parseInt(colArray[0].trim())

    const g = Number.parseInt(colArray[1].trim())

    const b = Number.parseInt(colArray[2].trim())

    return `rgb(${lightenDarken(r, amt)}, ${lightenDarken(g, amt)}, ${lightenDarken(b, amt)})`
  }
  else if (col.startsWith('#')) {
    let usePound = true

    let currentCol = col

    if (currentCol[0] === '#') {
      currentCol = currentCol.slice(1)
      usePound = true
    }

    const num = Number.parseInt(currentCol, 16)

    let r = (num >> 16) + amt

    if (r > 255) { r = 255 }
    else if (r < 0) { r = 0 }

    let b = ((num >> 8) & 0x00FF) + amt

    if (b > 255) { b = 255 }
    else if (b < 0) { b = 0 }

    let g = (num & 0x0000FF) + amt

    if (g > 255) { g = 255 }
    else if (g < 0) { g = 0 }

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')
  }

  return col
}

function lightenDarken(value: number, amt: number): number {
  let newValue = value + amt

  if (newValue > 255) { return 255 }

  if (newValue < 0) { return 0 }

  return newValue
}

function updateColorVariations(baseColor: string) {
  for (let i = 1; i <= 5; i++) {
    const lightColor = lightenDarkenColor(baseColor, i * 40);

    (light100.value as string) = lightColor;
    (light200.value as string) = lightColor;
    (light300.value as string) = lightColor;
    (light400.value as string) = lightColor;
    (light500.value as string) = lightColor

    // document.getElementById(`light-${i}00`).style.backgroundColor = lightColor;
    // document.getElementById(`light-${i}00`).nextElementSibling.value = lightColor;
  }

  for (let i = 1; i <= 5; i++) {
    const darkColor = lightenDarkenColor(baseColor, -i * 30)

    dark100.value = darkColor
    dark200.value = darkColor
    dark300.value = darkColor
    dark400.value = darkColor
    dark500.value = darkColor

    // document.getElementById(`dark-${i}00`).style.backgroundColor = darkColor;
    // document.getElementById(`dark-${i}00`).nextElementSibling.value = darkColor;
  }
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    // Consider adding visual feedback here
    console.log('Copied to clipboard:', text)
  })
}

onMounted(() => {
  // Initialize Pickr for single color
  singleColorPickrInstance = Pickr.create({
    el: '#single-color-picker-container',
    theme: 'classic',
    default: '#000000',
    swatches: [
      '#3b82f6',
      '#ef4444',
      '#10b981',
      '#f59e0b',
      '#6366f1',
      '#ec4899',
      '#14b8a6',
      '#f97316',
      '#8b5cf6',
      '#d946ef',
    ],
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        input: true,
        save: true,
      },
    },
  })
    .on('change', (color) => {
      updateColorValues(color.toHEXA().toString())
    })
    .on('save', (color) => {
      updateColorValues(color.toHEXA().toString())
    })

  // Initialize Pickr for gradient color 1
  gradientColor1PickrInstance = Pickr.create({
    el: '#gradient-color-1-container',
    theme: 'classic',
    default: '#000000',
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        input: true,
        save: true,
      },
    },
  })
    .on('change', (color) => {
      gradientColor1.value = color.toHEXA().toString()
    })

  // Initialize Pickr for gradient color 2
  gradientColor2PickrInstance = Pickr.create({
    el: '#gradient-color-2-container',
    theme: 'classic',
    default: '#000000',
    components: {
      preview: true,
      opacity: true,
      hue: true,
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        input: true,
        save: true,
      },
    },
  })
    .on('change', (color) => {
      gradientColor2.value = color.toHEXA().toString()
    })

  updateColorValues('#000000')
})
</script>

<template>
  <div
    class="min-h-screen"
  >
    <div
      class="container mx-auto px-4 py-12"
    >
      <div
        class="mx-auto max-w-4xl"
      >
        <div
          class="mb-12 text-center"
        >
          <h1
            class="mb-4 text-3xl text-gray-800 font-bold md:text-4xl"
          >
            前端开发取色板工具
          </h1>

          <p
            class="text-lg text-gray-600"
          >
            轻松获取颜色代码和CSS渐变方案
          </p>
        </div>

        <div
          class="mb-8 overflow-hidden rounded-xl bg-white shadow-lg"
        >
          <div
            class="flex border-b border-gray-200"
          >
            <button
              class="tab-btn border-b-2 border-transparent px-6 py-4 text-gray-700 font-medium transition-colors hover:text-indigo-600"
              :class="{ active: activeTab === 'single-color' }"
              @click="setActiveTab('single-color')"
            >
              单色取色
            </button>

            <button
              class="tab-btn border-b-2 border-transparent px-6 py-4 text-gray-700 font-medium transition-colors hover:text-indigo-600"
              :class="{ active: activeTab === 'gradient' }"
              @click="setActiveTab('gradient')"
            >
              渐变色方案
            </button>
          </div>

          <div
            class="p-6"
          >
            <!-- 单色取色面板 -->
            <div
              id="single-color"
              class="tab-content"
              :class="{ active: activeTab === 'single-color' }"
            >
              <div
                class="mb-6"
              >
                <label
                  class="mb-2 block text-sm text-gray-700 font-medium"
                >选择颜色</label>

                <div
                  id="single-color-picker-container"
                  class="pickr-container"
                >
                  <!-- Pickr将在这里初始化 -->
                </div>
              </div>

              <div
                class="grid grid-cols-1 gap-6 md:grid-cols-3"
              >
                <div
                  class="color-card rounded-lg bg-white p-4 shadow-sm"
                >
                  <div
                    id="color-preview"
                    class="mb-3 h-24 w-full rounded-lg"
                    :style="{ backgroundColor: colorPreview }"
                  />

                  <div
                    class="space-y-2"
                  >
                    <div>
                      <span
                        class="text-xs text-gray-500"
                      >HEX</span>

                      <div
                        class="flex items-center"
                      >
                        <input
                          id="hex-value"
                          type="text"
                          class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                          :value="hexValue"
                          readonly
                        >

                        <button
                          class="copy-hex ml-2 rounded-md bg-gray-100 px-3 py-2 text-sm transition-colors hover:bg-gray-200"
                          @click="copyToClipboard(hexValue)"
                        >
                          <i
                            class="far fa-copy"
                          />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span
                        class="text-xs text-gray-500"
                      >RGB</span>

                      <div
                        class="flex items-center"
                      >
                        <input
                          id="rgb-value"
                          type="text"
                          class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                          :value="rgbValue"
                          readonly
                        >

                        <button
                          class="copy-rgb ml-2 rounded-md bg-gray-100 px-3 py-2 text-sm transition-colors hover:bg-gray-200"
                          @click="copyToClipboard(rgbValue)"
                        >
                          <i
                            class="far fa-copy"
                          />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span
                        class="text-xs text-gray-500"
                      >HSL</span>

                      <div
                        class="flex items-center"
                      >
                        <input
                          id="hsl-value"
                          type="text"
                          class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                          :value="hslValue"
                          readonly
                        >

                        <button
                          class="copy-hsl ml-2 rounded-md bg-gray-100 px-3 py-2 text-sm transition-colors hover:bg-gray-200"
                          @click="copyToClipboard(hslValue)"
                        >
                          <i
                            class="far fa-copy"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="color-card rounded-lg bg-white p-4 shadow-sm"
                >
                  <h3
                    class="mb-3 text-gray-700 font-medium"
                  >
                    明度变化
                  </h3>

                  <div
                    class="space-y-2"
                  >
                    <div
                      class="flex items-center"
                    >
                      <div
                        class="mr-2 h-8 w-8 rounded"
                        :style="{ backgroundColor: light100 }"
                      />

                      <input
                        type="text"
                        class="flex-1 border border-gray-200 rounded px-2 py-1 text-xs"
                        :value="light100"
                        readonly
                      >
                    </div>

                    <div
                      class="flex items-center"
                    >
                      <div
                        class="mr-2 h-8 w-8 rounded"
                        :style="{ backgroundColor: light200 }"
                      />

                      <input
                        type="text"
                        class="flex-1 border border-gray-200 rounded px-2 py-1 text-xs"
                        :value="light200"
                        readonly
                      >
                    </div>

                    <div
                      class="flex items-center"
                    >
                      <div
                        class="mr-2 h-8 w-8 rounded"
                        :style="{ backgroundColor: light300 }"
                      />

                      <input
                        type="text"
                        class="flex-1 border border-gray-200 rounded px-2 py-1 text-xs"
                        :value="light300"
                        readonly
                      >
                    </div>

                    <div
                      class="flex items-center"
                    >
                      <div
                        class="mr-2 h-8 w-8 rounded"
                        :style="{ backgroundColor: light400 }"
                      />

                      <input
                        type="text"
                        class="flex-1 border border-gray-200 rounded px-2 py-1 text-xs"
                        :value="light400"
                        readonly
                      >
                    </div>

                    <div
                      class="flex items-center"
                    >
                      <div
                        class="mr-2 h-8 w-8 rounded"
                        :style="{ backgroundColor: light500 }"
                      />

                      <input
                        type="text"
                        class="flex-1 border border-gray-200 rounded px-2 py-1 text-xs"
                        :value="light500"
                        readonly
                      >
                    </div>
                  </div>
                </div>

                <div
                  class="color-card rounded-lg bg-white p-4 shadow-sm"
                >
                  <h3
                    class="mb-3 text-gray-700 font-medium"
                  >
                    暗度变化
                  </h3>

                  <div
                    class="space-y-2"
                  >
                    <div
                      class="flex items-center"
                    >
                      <div
                        class="mr-2 h-8 w-8 rounded"
                        :style="{ backgroundColor: dark100 }"
                      />

                      <input
                        type="text"
                        class="flex-1 border border-gray-200 rounded px-2 py-1 text-xs"
                        :value="dark100"
                        readonly
                      >
                    </div>

                    <div
                      class="flex items-center"
                    >
                      <div
                        class="mr-2 h-8 w-8 rounded"
                        :style="{ backgroundColor: dark200 }"
                      />

                      <input
                        type="text"
                        class="flex-1 border border-gray-200 rounded px-2 py-1 text-xs"
                        :value="dark200"
                        readonly
                      >
                    </div>

                    <div
                      class="flex items-center"
                    >
                      <div
                        class="mr-2 h-8 w-8 rounded"
                        :style="{ backgroundColor: dark300 }"
                      />

                      <input
                        type="text"
                        class="flex-1 border border-gray-200 rounded px-2 py-1 text-xs"
                        :value="dark300"
                        readonly
                      >
                    </div>

                    <div
                      class="flex items-center"
                    >
                      <div
                        class="mr-2 h-8 w-8 rounded"
                        :style="{ backgroundColor: dark400 }"
                      />

                      <input
                        type="text"
                        class="flex-1 border border-gray-200 rounded px-2 py-1 text-xs"
                        :value="dark400"
                        readonly
                      >
                    </div>

                    <div
                      class="flex items-center"
                    >
                      <div
                        class="mr-2 h-8 w-8 rounded"
                        :style="{ backgroundColor: dark500 }"
                      />

                      <input
                        type="text"
                        class="flex-1 border border-gray-200 rounded px-2 py-1 text-xs"
                        :value="dark500"
                        readonly
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 渐变色面板 -->
            <div
              id="gradient"
              class="tab-content"
              :class="{ active: activeTab === 'gradient' }"
            >
              <div
                class="grid grid-cols-1 mb-6 gap-6 md:grid-cols-2"
              >
                <div>
                  <label
                    class="mb-2 block text-sm text-gray-700 font-medium"
                  >颜色1</label>

                  <div
                    id="gradient-color-1-container"
                    class="pickr-container"
                  >
                    <!-- Pickr将在这里初始化 -->
                  </div>
                </div>

                <div>
                  <label
                    class="mb-2 block text-sm text-gray-700 font-medium"
                  >颜色2</label>

                  <div
                    id="gradient-color-2-container"
                    class="pickr-container"
                  >
                    <!-- Pickr将在这里初始化 -->
                  </div>
                </div>
              </div>

              <div
                class="grid grid-cols-1 mb-6 gap-6 md:grid-cols-3"
              >
                <div>
                  <div
                    id="linear-gradient-preview"
                    class="gradient-preview mb-3"
                    :style="{ background: linearGradientPreviewStyle }"
                  />

                  <div
                    class="code-block"
                  >
                    <button
                      class="copy-btn"
                      @click="copyToClipboard(linearGradientCode)"
                    >
                      <i
                        class="far fa-copy"
                      />
                    </button>

                    <code
                      id="linear-gradient-code"
                    >{{ linearGradientCode }}</code>
                  </div>
                </div>

                <div>
                  <div
                    id="radial-gradient-preview"
                    class="gradient-preview mb-3"
                    :style="{ background: radialGradientPreviewStyle }"
                  />

                  <div
                    class="code-block"
                  >
                    <button
                      class="copy-btn"
                      @click="copyToClipboard(radialGradientCode)"
                    >
                      <i
                        class="far fa-copy"
                      />
                    </button>

                    <code
                      id="radial-gradient-code"
                    >{{ radialGradientCode }}</code>
                  </div>
                </div>

                <div>
                  <div
                    id="conic-gradient-preview"
                    class="gradient-preview mb-3"
                    :style="{ background: conicGradientPreviewStyle }"
                  />

                  <div
                    class="code-block"
                  >
                    <button
                      class="copy-btn"
                      @click="copyToClipboard(conicGradientCode)"
                    >
                      <i
                        class="far fa-copy"
                      />
                    </button>

                    <code
                      id="conic-gradient-code"
                    >{{ conicGradientCode }}</code>
                  </div>
                </div>
              </div>

              <div
                class="grid grid-cols-1 gap-6 md:grid-cols-2"
              >
                <div>
                  <label
                    class="mb-2 block text-sm text-gray-700 font-medium"
                  >线性渐变方向</label>

                  <select
                    id="gradient-direction"
                    v-model="gradientDirection"
                    class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                  >
                    <option
                      value="90deg"
                    >
                      水平 (→)
                    </option>

                    <option
                      value="180deg"
                    >
                      垂直 (↓)
                    </option>

                    <option
                      value="45deg"
                    >
                      对角线 (↗)
                    </option>

                    <option
                      value="135deg"
                    >
                      对角线 (↘)
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="rounded-xl bg-white p-6 shadow-lg"
        >
          <h2
            class="mb-4 text-xl text-gray-800 font-bold"
          >
            常用配色方案
          </h2>

          <div
            class="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2"
          >
            <div
              class="border border-gray-100 rounded-lg p-4"
            >
              <div
                class="mb-2 flex"
              >
                <div
                  class="h-8 w-1/5 rounded-l"
                  style="background-color: #6366f1;"
                />

                <div
                  class="h-8 w-1/5"
                  style="background-color: #8b5cf6;"
                />

                <div
                  class="h-8 w-1/5"
                  style="background-color: #ec4899;"
                />

                <div
                  class="h-8 w-1/5"
                  style="background-color: #f43f5e;"
                />

                <div
                  class="h-8 w-1/5 rounded-r"
                  style="background-color: #f97316;"
                />
              </div>

              <div
                class="text-sm text-gray-600"
              >
                紫色系渐变
              </div>

              <div
                class="code-block mt-2 text-xs"
              >
                <button
                  class="copy-btn"
                  @click="copyToClipboard(palette1Code)"
                >
                  <i
                    class="far fa-copy"
                  />
                </button>

                <code
                  id="palette-1-code"
                >{{ palette1Code }}</code>
              </div>
            </div>

            <div
              class="border border-gray-100 rounded-lg p-4"
            >
              <div
                class="mb-2 flex"
              >
                <div
                  class="h-8 w-1/5 rounded-l"
                  style="background-color: #06b6d4;"
                />

                <div
                  class="h-8 w-1/5"
                  style="background-color: #0ea5e9;"
                />

                <div
                  class="h-8 w-1/5"
                  style="background-color: #3b82f6;"
                />

                <div
                  class="h-8 w-1/5"
                  style="background-color: #6366f1;"
                />

                <div
                  class="h-8 w-1/5 rounded-r"
                  style="background-color: #8b5cf6;"
                />
              </div>

              <div
                class="text-sm text-gray-600"
              >
                蓝色系渐变
              </div>

              <div
                class="code-block mt-2 text-xs"
              >
                <button
                  class="copy-btn"
                  @click="copyToClipboard(palette2Code)"
                >
                  <i
                    class="far fa-copy"
                  />
                </button>

                <code
                  id="palette-2-code"
                >{{ palette2Code }}</code>
              </div>
            </div>

            <div
              class="border border-gray-100 rounded-lg p-4"
            >
              <div
                class="mb-2 flex"
              >
                <div
                  class="h-8 w-1/5 rounded-l"
                  style="background-color: #10b981;"
                />

                <div
                  class="h-8 w-1/5"
                  style="background-color: #22c55e;"
                />

                <div
                  class="h-8 w-1/5"
                  style="background-color: #84cc16;"
                />

                <div
                  class="h-8 w-1/5"
                  style="background-color: #eab308;"
                />

                <div
                  class="h-8 w-1/5 rounded-r"
                  style="background-color: #f97316;"
                />
              </div>

              <div
                class="text-sm text-gray-600"
              >
                自然系渐变
              </div>

              <div
                class="code-block mt-2 text-xs"
              >
                <button
                  class="copy-btn"
                  @click="copyToClipboard(palette3Code)"
                >
                  <i
                    class="far fa-copy"
                  />
                </button>

                <code
                  id="palette-3-code"
                >{{ palette3Code }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Existing styles */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
}

.gradient-preview {
  height: 120px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.gradient-preview:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.code-block {
  font-family: 'Fira Code', monospace;
  background-color: #1e293b;
  color: #f8fafc;
  border-radius: 8px;
  padding: 12px;
  position: relative;
}

.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #334155;
  color: #f8fafc;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background-color: #475569;
}

.color-card {
  transition: all 0.3s ease;
}

.color-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* Pickr容器样式 */
.pickr-container {
  width: 100%;
  margin-bottom: 1rem;
}

.pickr .pcr-button {
  width: 100% !important;
  height: 40px !important;
  border-radius: 8px !important;
  border: 2px solid #e2e8f0 !important;
}

/* 颜色预览方块 */
.color-preview {
  width: 100%;
  height: 24px;
  border-radius: 4px;
  margin-top: 8px;
}

.tab-btn.active {
  border-color: #6366f1; /* Indigo-600 */
  color: #6366f1;
}
</style>
