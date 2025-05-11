<script setup lang="ts">
import type { AppearanceSettings } from '@/types/wxChat'

import type { UploadFile } from 'element-plus'

import { computed, watch } from 'vue'

// 使用 defineModel 实现双向绑定
const model = defineModel<AppearanceSettings>()

// 创建计算属性的工厂函数
function createComputed<K extends keyof AppearanceSettings>(key: K) {
  return computed({
    get: () => getModelValue(key),
    set: value => updateSetting(key, value),
  })
}

// 计算属性
const phoneSignal = createComputed('phoneSignal')

const networkSignal = createComputed('networkSignal')

const wifiSignal = createComputed('wifiSignal')

const phoneTime = createComputed('phoneTime')

const phoneBattery = createComputed('phoneBattery')

const isEarpieceMode = createComputed('isEarpieceMode')

const isCharging = createComputed('isCharging')

const isVoiceMode = createComputed('isVoiceMode')

const messageCount = createComputed('messageCount')

const chatTitle = createComputed('chatTitle')

const chatBackgroundImage = createComputed('chatBackgroundImage')

// 更新单个属性
function updateSetting<K extends keyof AppearanceSettings>(key: K, value: AppearanceSettings[K]) {
  if (!model.value) {
    return
  }

  model.value = {
    ...model.value,
    [key]: value,
  }
}

// 获取模型值
function getModelValue<K extends keyof AppearanceSettings>(key: K): AppearanceSettings[K] {
  return model.value?.[key] as AppearanceSettings[K]
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
</script>

<template>
  <div
    class="appearance-setting p-5"
  >
    <el-form
      label-width="auto"
      style="width: 100%"
    >
      <el-form-item
        label="手机信号"
      >
        <el-slider
          v-model="phoneSignal"
          :step="1"
          :min="1"
          :max="4"
          show-stops
          :format-tooltip="value => `${value}格`"
          :marks="{
            1: '1格',
            2: '2格',
            3: '3格',
            4: '4格',
          }"
        />
      </el-form-item>

      <el-form-item
        label="网络信号"
      >
        <el-select
          v-model="networkSignal"
          size="small"
        >
          <el-option
            label="WiFi"
            :value="1"
          />

          <el-option
            label="3G"
            :value="2"
          />

          <el-option
            label="4G"
            :value="3"
          />

          <el-option
            label="5G"
            :value="4"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="WiFi信号"
      >
        <el-select
          v-model="wifiSignal"
          size="small"
        >
          <el-option
            label="1格"
            :value="1"
          />

          <el-option
            label="2格"
            :value="2"
          />

          <el-option
            label="3格"
            :value="3"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="手机时间"
      >
        <el-time-picker
          v-model="phoneTime"
          format="HH:mm"
          value-format="HH:mm"
          :picker-options="{ showConfirm: false }"
        />
      </el-form-item>

      <el-form-item
        label="手机电量"
      >
        <el-slider
          v-model="phoneBattery"
          :min="0"
          :max="100"
          :step="1"
          :show-stops="true"
          :format-tooltip="value => `${value}%`"
        />
      </el-form-item>

      <el-form-item
        label="充电状态"
      >
        <el-switch
          v-model="isCharging"
          inline-prompt
          active-text="充电中"
          inactive-text="未充电"
        />
      </el-form-item>

      <el-form-item
        label="听筒模式"
      >
        <el-switch
          v-model="isEarpieceMode"
          inline-prompt
          active-text="听筒模式"
          inactive-text="扬声器模式"
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
        label="消息数量"
      >
        <el-input
          v-model="messageCount"
          type="number"
          :min="0"
        />
      </el-form-item>

      <el-form-item
        label="聊天标题"
      >
        <el-input
          v-model.trim="chatTitle"
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
    </el-form>
  </div>
</template>

<style lang="scss" scoped>

</style>
