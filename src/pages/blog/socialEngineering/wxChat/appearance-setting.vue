<script setup lang="ts">
import type { UploadFile } from 'element-plus'

import type { AppearanceType } from './type'

import { computed, watch } from 'vue'

// 定义 emit
const emit = defineEmits<{
  (e: 'reset'): void
}>()

// 使用 defineModel 实现双向绑定
const model = defineModel<AppearanceType>()

// 创建计算属性的工厂函数
function createComputed<K extends keyof AppearanceType>(key: K) {
  return computed({
    get: () => getModelValue(key),
    set: value => updateSetting(key, value),
  })
}

// 计算属性
const phoneModel = createComputed('phoneModel')

const phoneSignal = createComputed('phoneSignal')

const wifiSignal = createComputed('wifiSignal')

const phoneTime = createComputed('phoneTime')

const phoneBattery = createComputed('phoneBattery')

const isFollowSystemTime = createComputed('isFollowSystemTime')

const isEarpieceMode = createComputed('isEarpieceMode')

const isCharging = createComputed('isCharging')

const isVoiceMode = createComputed('isVoiceMode')

const isShowUserName = createComputed('isShowUserName')

const isDarkMode = createComputed('isDarkMode')

const unreadMessageCount = createComputed('unreadMessageCount')

const chatTitle = createComputed('chatTitle')

const chatBackgroundImage = createComputed('chatBackgroundImage')

// 更新单个属性
function updateSetting<K extends keyof AppearanceType>(key: K, value: AppearanceType[K]) {
  if (!model.value) {
    return
  }

  model.value = {
    ...model.value,
    [key]: value,
  }
}

// 获取模型值
function getModelValue<K extends keyof AppearanceType>(key: K): AppearanceType[K] {
  return model.value?.[key] as AppearanceType[K]
}

// 处理图片变化
function handleChange(uploadFile: UploadFile) {
  if (!uploadFile.raw) {
    return false
  }

  const localUrl = URL.createObjectURL(uploadFile.raw)

  chatBackgroundImage.value = localUrl

  return false
}

// 监听手机时间变化
watch(chatBackgroundImage, (value) => {
  console.log('手机时间更新:', value)
})

// 重置系统
function reset() {
  console.log('重置系统')
  emit('reset')
}
</script>

<template>
  <div
    class="p-5"
  >
    <el-form
      label-width="auto"
      style="width: 100%"
      label-position="left"
    >
      <el-form-item
        label="手机型号"
      >
        <el-select
          v-model="phoneModel"
          class="!w-60"
          disabled
        />
      </el-form-item>

      <el-form-item
        label="深色模式"
      >
        <el-switch
          v-model="isDarkMode"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        />
      </el-form-item>

      <el-form-item
        label="手机信号"
      >
        <el-select
          v-model="phoneSignal"
          class="!w-60"
        >
          <el-option
            v-for="item in 4"
            :key="item"
            :label="`${item}格`"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="WiFi信号"
      >
        <el-select
          v-model="wifiSignal"
          class="!w-60"
        >
          <el-option
            v-for="item in 3"
            :key="item"
            :label="`${item}格`"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="手机电量"
      >
        <el-slider
          v-model="phoneBattery"
          :min="0"
          :max="100"
          :step="1"
          :format-tooltip="value => `${value}%`"
          class="!w-60"
        />

        <el-input-number
          v-model="phoneBattery"
          class="ml-5"
          :min="0"
          :max="100"
          :step="1"
          controls-position="right"
        />
      </el-form-item>

      <el-form-item
        label="手机充电状态"
      >
        <el-switch
          v-model="isCharging"
          inline-prompt
          active-text="充电中"
          inactive-text="未充电"
        />
      </el-form-item>

      <el-form-item
        label="手机时间"
      >
        <el-time-picker
          v-model="phoneTime"
          format="HH:mm"
          value-format="HH:mm"
          :picker-options="{ showConfirm: false }"
          class="!w-60"
        />

        <el-switch
          v-model="isFollowSystemTime"
          inline-prompt
          active-text="跟随系统"
          inactive-text="自定义"
          class="ml-5"
          size="large"
        />
      </el-form-item>

      <el-form-item
        label="未读消息数"
      >
        <el-input-number
          v-model="unreadMessageCount"
          type="number"
          :min="0"
          class="w-60"
        />
      </el-form-item>

      <el-form-item
        label="显示用户名"
      >
        <el-switch
          v-model="isShowUserName"
          inline-prompt
          active-text="显示"
          inactive-text="隐藏"
        />
      </el-form-item>

      <el-form-item
        label="听筒模式"
      >
        <el-switch
          v-model="isEarpieceMode"
          inline-prompt
          active-text="听筒模式"
          inactive-text="扬声器"
        />
      </el-form-item>

      <el-form-item
        label="语音模式"
      >
        <el-switch
          v-model="isVoiceMode"
          inline-prompt
          active-text="语音模式"
          inactive-text="文字模式"
        />
      </el-form-item>

      <el-form-item
        label="聊天标题"
      >
        <el-input
          v-model.trim="chatTitle"
          class="!w-60"
          clearable
        />
      </el-form-item>

      <el-form-item
        label="聊天背景图"
      >
        <el-upload
          class=""
          :show-file-list="false"
          :auto-upload="false"
          accept="image/*"
          :on-change="handleChange"
        >
          <img
            v-if="chatBackgroundImage"
            :src="chatBackgroundImage"
            class="h-40 w-30 flex items-center justify-center border border-gray-300 rounded-md border-dashed text-8 font-bold"
          >

          <div
            v-else
            class="h-40 w-30 flex items-center justify-center border border-gray-300 rounded-md border-dashed text-8 font-bold"
          >
            +
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item
        label="重置"
      >
        <el-button
          type="primary"
          size="large"
          @click="reset"
        >
          重置系统
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>

</style>
