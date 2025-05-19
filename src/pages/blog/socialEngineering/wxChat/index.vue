<!------------------------------------  微信对话生成器  ------------------------------------------------->
<script lang="ts" setup>

import type { SettingType } from './type'

import AppearanceSetting from './appearance-setting.vue'

import ChatSetting from './chat-setting.vue'

import Phone from './phone.vue'

const activeTabsName = ref('对话设置')

const setting = ref<SettingType>({
  /**
   *  外观设置
   */
  appearance: {
    /**
     *  手机型号
     */
    phoneModel: 'iphone',

    /**
     *  手机信号
     */
    phoneSignal: 3,

    /**
     *  手机时间
     */
    phoneTime: '10:00',

    /**
     *  手机电量
     */
    phoneBattery: 3,

    /**
     *  wifi信号
     */
    wifiSignal: 3,

    /**
     *  是否跟随系统时间
     */
    isFollowSystemTime: false,

    /**
     *  是否充电中
     */
    isCharging: false,

    /**
     *  是否听筒模式
     */
    isEarpieceMode: false,

    /**
     *  是否语音模式
     */
    isVoiceMode: false,

    /**
     *  是否显示用户名
     */
    isShowUserName: true,

    /**
     *  是否深色模式
     */
    isDarkMode: false,

    /**
     *  消息数量
     */
    unreadMessageCount: 1,

    /**
     *  聊天标题
     */
    chatTitle: '微信对话',

    /**
     *  聊天背景图
     */
    chatBackgroundImage: '',

  },

  /**
   *  对话设置
   */
  chat: {
    /**
     *  用户列表
     */
    userList: [],

    /**
     *  对话内容
     */
    dialogueContent: '',

    /**
     *  红包或转账金额
     */
    redPacketOrTransferAmount: 88,

    /**
     *  添加聊天时间
     */
    addChatTime: '2025-05-09 10:00:00',

    /**
     *  语音时间时长
     */
    voiceTime: 10,

    /**
     *  是否已读
     */
    isRead: false,

    /**
     *  红包备注
     */
    redPacketRemark: '恭喜发财，大吉大利',

    /**
     *  转账备注
     */
    transferRemark: '转账备注',
  },
})

watchEffect(() => {
  console.log(setting.value.appearance)
})

function reset() {
  setting.value = {
    ...setting.value,
    appearance: {
      ...setting.value.appearance,
    },
  }
}
</script>

<template>
  <div
    class="h-full w-full flex gap-5 overflow-hidden"
  >
    <!-- 左侧 -->
    <div
      class="h-full w-1/2"
    >
      <el-tabs
        v-model="activeTabsName"
        class="demo-tabs"
      >
        <el-tab-pane
          label="外观设置"
          name="外观设置"
        >
          <AppearanceSetting
            v-model="setting.appearance"
            @reset="reset"
          />
        </el-tab-pane>

        <el-tab-pane
          label="对话设置"
          name="对话设置"
        >
          <ChatSetting
            :dialogue="setting.chat"
          />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 右侧 -->
    <div
      class="h-full w-1/2 flex items-center justify-center"
    >
      <Phone
        :setting="setting"
      />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
