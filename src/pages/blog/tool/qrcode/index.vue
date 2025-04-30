<script lang="ts" setup>

import QrcodeVue from 'qrcode.vue'

const type = ref('code')

const inputText = ref('Hello Word! 代码改变世界！')

const encodedText = ref('')

const qrcodeImageSize = ref(100)

/**
 *  前景色
 */
const qrcodeImageForegroundColor = ref('#E9B354')

/**
 *  背景色
 */
const qrcodeImageBackgroundColor = ref('#ffffff')

/**
 *  二维码填充
 */
const qrcodeImageGradient = ref(false)

/**
 *  二维码边距
 */
const qrcodeImageMargin = ref(5)

const qrcodeContainerRef = ref()

/**
 * 下载二维码 canvas 为图片
 */
async function handleDownload() {
  try {
    const container = qrcodeContainerRef.value

    if (!container) {
      throw new Error('未找到二维码容器')
    }

    const canvas = container.querySelector('canvas') as HTMLCanvasElement | null

    if (!canvas) {
      throw new Error('容器中未找到 canvas 元素')
    }

    const link = document.createElement('a')

    link.download = 'qr-code.png'
    link.href = canvas.toDataURL('image/png')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.$notification?.success({
      title: '下载成功',
      message: '二维码已下载到本地',
    })
  }
  catch (err) {
    window.$notification?.error({
      title: '下载失败',
      message: err instanceof Error ? err.message : String(err),
    })
  }
}

/**
 * 将二维码容器中的 Canvas 内容复制为图片到剪切板
 * @returns {Promise<void>} 复制完成的 Promise
 */
async function handleDownloadCanvas(): Promise<void> {
  try {
    const container = qrcodeContainerRef.value

    if (!container) {
      throw new Error('未找到二维码容器，请确认组件是否正确渲染')
    }

    const canvas = container.querySelector('canvas')

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new TypeError('容器中未找到有效的 Canvas 元素')
    }

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => {
        if (b) {
          resolve(b)
        }
        else {
          reject(new Error('Canvas 转换 Blob 失败'))
        }
      }, 'image/png')
    })

    const clipboardItem = new ClipboardItem({
      'image/png': blob,
    })

    await navigator.clipboard.write([clipboardItem])

    window.$notification?.success({
      title: '复制成功',
      message: '二维码已复制到剪切板，可以直接粘贴使用',
    })
  }
  catch (err) {
    window.$notification?.error({
      title: '复制失败',
      message: err instanceof Error ? err.message : String(err),
    })
  }
}
</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center justify-between"
    >
      <div
        class="flex items-center gap-5"
      >
        <el-radio-group
          v-model="type"
        >
          <el-radio-button
            value="code"
            label="二维码生成"
          />
        </el-radio-group>
      </div>

      <ButtonIcon
        v-if="encodedText.length > 0"
        v-copy="{
          text: encodedText,
          message: `Md5 加密数据 已经复制到剪切板`,
        }"
        :size="40"
        icon="copy"
        tooltip-content="点击复制"
      />
    </div>

    <div
      class="h-[calc(100vh-200px)] flex items-center justify-center gap-15"
    >
      <el-input
        v-model="inputText"
        type="textarea"
        placeholder="请输入要Md5 加密的内容"
        class="!h-full !flex-1"
        :input-style="{ height: '100%' }"
      />

      <div
        class="h-full flex-col flex-1 rounded-2 bg-white !relative"
      >
        <div
          class="flex-col gap-5 p-10"
        >
          <div
            class="flex items-center gap-5"
          >
            <span>二维码填充</span>

            <el-switch
              v-model="qrcodeImageGradient"
              size="large"
              active-text="是"
              inactive-text="否"
              inline-prompt
            />
          </div>

          <div
            class="flex items-center gap-5"
          >
            <span>二维码前景色</span>

            <el-color-picker
              v-model="qrcodeImageForegroundColor"
              :show-alpha="false"
              size="large"
            />
          </div>

          <div
            class="flex items-center gap-5"
          >
            <span>二维码背景色</span>

            <el-color-picker
              v-model="qrcodeImageBackgroundColor"
              :show-alpha="false"
            />
          </div>

          <div
            class="flex items-center gap-5"
          >
            <span>二维码大小</span>

            <el-slider
              v-model="qrcodeImageSize"
              class="!w-1/2"
              size="large"
              :min="100"
              :max="400"
              :format-tooltip="(value) => `${value}px`"
            />
          </div>

          <div
            class="flex items-center gap-5"
          >
            <span>二维码边距</span>

            <el-slider
              v-model="qrcodeImageMargin"
              class="!w-1/2"
              size="large"
              :min="0"
              :max="10"
              :format-tooltip="(value) => `${value}px`"
            />
          </div>

          <el-button
            class="mx-auto w-1/2"
            size="large"
            @click="handleDownload()"
          >
            下载
          </el-button>
        </div>

        <div
          class="flex flex-1 items-center justify-center"
        >
          <div
            ref="qrcodeContainerRef"
            class="cursor-pointer border bg-[#FCF3E9]"
            @click="handleDownloadCanvas"
          >
            <QrcodeVue
              :value="inputText"
              :size="qrcodeImageSize"
              :foreground="qrcodeImageForegroundColor"
              :background="qrcodeImageBackgroundColor"
              :gradient="qrcodeImageGradient"
              :margin="qrcodeImageMargin"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
