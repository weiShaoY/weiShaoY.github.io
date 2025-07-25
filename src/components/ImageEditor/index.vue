<script setup lang="ts">
import type { UploadFile } from 'element-plus'

import { imageFileToBase64 } from '@/utils'

import {
  Close,
  Plus,
  RefreshRight as Redo,
  RefreshLeft as Undo,
  Upload,
} from '@element-plus/icons-vue'

import { ElMessage } from 'element-plus'

import { ref, watch } from 'vue'

import { Cropper } from 'vue-advanced-cropper'

import 'vue-advanced-cropper/dist/style.css'

import 'vue-advanced-cropper/dist/theme.classic.css'

/**
 * 图片裁剪组件参数类型
 */
type PropsType = {

  /**
   * 裁剪对话框标题
   */
  title?: string

  /**
   * 初始图片信息（包含URL和尺寸）
   */
  imageInfo?: {

    /** 图片URL地址 */
    url: string

    /** 图片显示宽度（像素） */
    width: number

    /** 图片显示高度（像素） */
    height: number
  }

  /**
   * 裁剪宽高比（宽度/高度）
   */
  aspectRatio?: number

  /**
   * 是否显示清除按钮
   */
  allowClear?: boolean

  /**
   * 最大文件大小（MB）
   */
  limitSize?: number

  /**
   * 允许上传的MIME类型
   */
  limitAccept?: string[]

  /**
   * 文件类型不匹配时的错误提示
   */
  limitAcceptText?: string

  /**
   * 上传区域下方的提示文字
   */
  tip?: string

  /**
   * 是否显示下载按钮
   */
  showDownload?: boolean
}
const props = withDefaults(defineProps<PropsType>(), {
  title: '图片裁剪',
  imageInfo: () => ({
    url: '',
    width: 100,
    height: 100,
  }),
  aspectRatio: 1 / 1,
  allowClear: false,
  limitSize: 1,
  limitAccept: () => ['image/jpeg', 'image/png'],
  limitAcceptText: '只可上传JPG或PNG图片！',
  tip: '',
  showDownload: false,
})

const emit = defineEmits(['use'])

/**
 *  裁剪后的图片预览地址
 */
const previewImg = ref('')

/**
 *  是否显示裁剪对话框
 */
const cropperVisible = ref(false)

/**
 *  处理图片裁剪结果
 */
const initImage = ref('')

/**
 *  文件列表
 */
const fileList = ref([])

/**
 *  裁剪组件引用
 */
const cropperRef = ref(null) as any

/**
 *  处理图片裁剪结果
 */
function handleUse(flag = true) {
  cropperVisible.value = false
  emit('use', flag ? previewImg.value : '')
  handleCancel()
}

watch(
  () => cropperVisible.value,
  (newVal) => {
    if (newVal) {
      initImage.value = props.imageInfo.url
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

function handleChange(uploadFile: UploadFile) {
  if (!uploadFile.raw) {
    window.$notification.warning('文件无效，请重新选择')
    return
  }

  imageFileToBase64(uploadFile.raw)
    .then((base64Data) => {
      initImage.value = base64Data as string
    })
    .catch(() => {
      window.$notification.error('文件转换失败')
    })
}

function beforeUpload(file: File) {
  const isAccept
    = props.limitAccept.length === 0
      ? true
      : props.limitAccept.includes(file.type)

  if (!isAccept) {
    ElMessage.warning(props.limitAcceptText)
    return false
  }

  const isLtM = file.size / 1024 / 1024 < props.limitSize

  if (!isLtM) {
    ElMessage.warning(`图片大小需小于${props.limitSize}MB！`)
    return false
  }

  return isAccept && isLtM
}

/**
 *  处理图片旋转
 *
 *  @param angle - 旋转角度
 */
function handleRotate(angle = 90) {
  if (!cropperRef.value) {
    return
  }

  cropperRef.value.rotate(angle)
}

function change({ canvas }: any) {
  previewImg.value = canvas.toDataURL()
}

function handleDownload() {
  const link = document.createElement('a')

  link.href = previewImg.value
  link.download = `裁剪结果.png`
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function handleCancel() {
  initImage.value = ''
  previewImg.value = ''
  cropperVisible.value = false
}
</script>

<template>
  <div
    class="relative flex cursor-pointer items-center justify-center border border-[#d9d9d9] rounded-2xl border-dashed bg-[rgba(0,0,0,0.02)] text-sm text-[#666] transition-colors duration-300 hover:border-primary"
    :style="{ width: `${imageInfo.width}px`, height: `${imageInfo.height}px` }"
    @click="cropperVisible = true"
  >
    <el-icon
      v-if="imageInfo.url && allowClear"
      class="absolute rounded-full bg-white text-[22px] text-[#f05f57] -right-2 -top-2 hover:color-red"
      title="移除聊天背景"
      @click.stop="handleUse(false)"
    >
      <Close />
    </el-icon>

    <img
      v-if="imageInfo.url"
      :src="imageInfo.url"
      class="h-full w-full object-cover"
      alt="图片"
    >

    <div
      v-else
      class="flex flex-col items-center justify-center"
    >
      <el-icon
        class="mb-2 text-[18px]"
      >
        <Plus />
      </el-icon>

      <p
        class="m-0"
      >
        点击上传
      </p>
    </div>
  </div>

  <span
    v-if="tip"
    class="text-3 color-[#999]"
  >
    {{ tip }}
  </span>

  <el-dialog
    v-model="cropperVisible"
    :title="title"
    width="860px"
    @close="handleCancel"
  >
    <el-row
      :gutter="20"
    >
      <el-col
        :span="16"
      >
        <Cropper
          ref="cropperRef"
          :src="initImage"
          class="h-150 bg-[#eee]"
          :min-height="200"
          :min-width="200"
          :stencil-props="{
            aspectRatio,
          }"
          @change="change"
        />

        <div
          style="margin-top: 20px"
        >
          <el-space>
            <el-upload
              v-model:file-list="fileList"
              :show-file-list="false"
              :limit="1"
              :on-change="handleChange"
              :before-upload="beforeUpload"
              accept="image/*"
            >
              <el-button
                type="primary"
              >
                <el-icon>
                  <Upload />
                </el-icon>
                {{ initImage ? "重新选择" : "选择图片" }}
              </el-button>
            </el-upload>

            <el-tooltip
              content="逆时针旋转"
            >
              <el-button
                type="primary"
                :disabled="!initImage"
                circle
                :icon="Undo"
                @click="handleRotate(-90)"
              />
            </el-tooltip>

            <el-tooltip
              content="顺时针旋转"
            >
              <el-button
                type="primary"
                :disabled="!initImage"
                circle
                :icon="Redo"
                @click="handleRotate(90)"
              />
            </el-tooltip>
          </el-space>
        </div>
      </el-col>

      <el-col
        :span="8"
      >
        <div
          class="flex flex-col items-center gap-3"
        >
          <div>
            预览
          </div>

          <img
            :src="previewImg"
            :width="200"
            alt=""
          >

          <el-space>
            <el-button
              :disabled="!previewImg"
              type="primary"
              @click="handleUse"
            >
              使用
            </el-button>

            <el-button
              v-if="showDownload"
              :disabled="!previewImg"
              @click="handleDownload"
            >
              下载到本地
            </el-button>
          </el-space>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<style lang="less" scoped>

.vue-advanced-cropper__background,
.vue-advanced-cropper__foreground {
  background-color: #f0f0f0;
}
</style>
