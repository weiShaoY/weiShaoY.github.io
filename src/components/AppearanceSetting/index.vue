<script setup lang="ts">
import type { AppearanceSettings } from '@/types/wxChat'

// 使用 defineModel 实现双向绑定
const model = defineModel<AppearanceSettings>()

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

// 获取信号值
function getSignalValue(value: number | undefined): number {
  return value ?? 0
}
</script>

<template>
  <div
    class="appearance-setting"
  >
    <!-- 手机信号 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >手机信号</span>

      <div
        class="signal-bars"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="bar"
          :class="{ active: i <= getSignalValue(model?.phoneSignal) }"
          @click="updateSetting('phoneSignal', i)"
        />
      </div>
    </div>

    <!-- 手机时间 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >手机时间</span>

      <input
        v-model="model.phoneTime"
        type="time"
        @change="updateSetting('phoneTime', model.phoneTime)"
      >
    </div>

    <!-- 手机电量 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >手机电量</span>

      <div
        class="battery-level"
      >
        <div
          v-for="i in 5"
          :key="i"
          class="level"
          :class="{ active: i <= getSignalValue(model?.phoneBattery) }"
          @click="updateSetting('phoneBattery', i)"
        />
      </div>
    </div>

    <!-- 网络信号 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >网络信号</span>

      <div
        class="signal-bars"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="bar"
          :class="{ active: i <= getSignalValue(model?.networkSignal) }"
          @click="updateSetting('networkSignal', i)"
        />
      </div>
    </div>

    <!-- WiFi信号 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >WiFi信号</span>

      <div
        class="signal-bars"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="bar"
          :class="{ active: i <= getSignalValue(model?.wifiSignal) }"
          @click="updateSetting('wifiSignal', i)"
        />
      </div>
    </div>

    <!-- 充电状态 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >充电状态</span>

      <label
        class="switch"
      >
        <input
          v-model="model.isCharging"
          type="checkbox"
          @change="updateSetting('isCharging', model.isCharging)"
        >

        <span
          class="slider"
        />
      </label>
    </div>

    <!-- 听筒模式 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >听筒模式</span>

      <label
        class="switch"
      >
        <input
          v-model="model.isEarpieceMode"
          type="checkbox"
          @change="updateSetting('isEarpieceMode', model.isEarpieceMode)"
        >

        <span
          class="slider"
        />
      </label>
    </div>

    <!-- 语音模式 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >语音模式</span>

      <label
        class="switch"
      >
        <input
          v-model="model.isVoiceMode"
          type="checkbox"
          @change="updateSetting('isVoiceMode', model.isVoiceMode)"
        >

        <span
          class="slider"
        />
      </label>
    </div>

    <!-- 消息数量 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >消息数量</span>

      <input
        v-model.number="model.messageCount"
        type="number"
        @change="updateSetting('messageCount', model.messageCount)"
      >
    </div>

    <!-- 聊天标题 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >聊天标题</span>

      <input
        v-model="model.chatTitle"
        type="text"
        @change="updateSetting('chatTitle', model.chatTitle)"
      >
    </div>

    <!-- 聊天背景图 -->
    <div
      class="setting-item"
    >
      <span
        class="label"
      >聊天背景图</span>

      <input
        v-model="model.chatBackgroundImage"
        type="text"
        @change="updateSetting('chatBackgroundImage', model.chatBackgroundImage)"
      >
    </div>
  </div>
</template>

<style scoped>
.appearance-setting {
  padding: 20px;
}

.setting-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.label {
  width: 100px;
  font-size: 14px;
  color: #333;
}

/* 信号条样式 */
.signal-bars {
  display: flex;
  gap: 2px;
}

.bar {
  width: 20px;
  height: 10px;
  background-color: #ddd;
  cursor: pointer;
}

.bar.active {
  background-color: #07c160;
}

/* 电池电量样式 */
.battery-level {
  display: flex;
  gap: 2px;
}

.level {
  width: 15px;
  height: 20px;
  background-color: #ddd;
  cursor: pointer;
}

.level.active {
  background-color: #07c160;
}

/* 开关样式 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #07c160;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* 输入框样式 */
input[type='text'],
input[type='number'],
input[type='time'] {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input[type='text']:focus,
input[type='number']:focus,
input[type='time']:focus {
  outline: none;
  border-color: #07c160;
}
</style>
