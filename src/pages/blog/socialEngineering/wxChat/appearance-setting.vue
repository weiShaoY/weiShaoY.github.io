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

// 获取模型值
function getModelValue<K extends keyof AppearanceSettings>(key: K): AppearanceSettings[K] {
  return model.value?.[key] as AppearanceSettings[K]
}

// 处理输入事件
function handleInput(e: Event, key: keyof AppearanceSettings) {
  const target = e.target as HTMLInputElement

  if (target.type === 'number') {
    updateSetting(key, Number(target.value))
  }
  else {
    updateSetting(key, target.value as AppearanceSettings[typeof key])
  }
}

// 处理复选框事件
function handleCheckbox(e: Event, key: keyof AppearanceSettings) {
  const target = e.target as HTMLInputElement

  updateSetting(key, target.checked as AppearanceSettings[typeof key])
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
          :class="{ active: i <= getSignalValue(getModelValue('phoneSignal')) }"
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
        :value="getModelValue('phoneTime')"
        type="time"
        @input="handleInput($event, 'phoneTime')"
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
          :class="{ active: i <= getSignalValue(getModelValue('phoneBattery')) }"
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
          :class="{ active: i <= getSignalValue(getModelValue('networkSignal')) }"
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
          :class="{ active: i <= getSignalValue(getModelValue('wifiSignal')) }"
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
          :checked="getModelValue('isCharging')"
          type="checkbox"
          @change="handleCheckbox($event, 'isCharging')"
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
          :checked="getModelValue('isEarpieceMode')"
          type="checkbox"
          @change="handleCheckbox($event, 'isEarpieceMode')"
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
          :checked="getModelValue('isVoiceMode')"
          type="checkbox"
          @change="handleCheckbox($event, 'isVoiceMode')"
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
        :value="getModelValue('messageCount')"
        type="number"
        @input="handleInput($event, 'messageCount')"
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
        :value="getModelValue('chatTitle')"
        type="text"
        @input="handleInput($event, 'chatTitle')"
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
        :value="getModelValue('chatBackgroundImage')"
        type="text"
        @input="handleInput($event, 'chatBackgroundImage')"
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
</style>`
