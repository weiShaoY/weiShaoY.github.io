<!------------------------------------  微信对话生成器  ------------------------------------------------->
<script lang="ts" setup>

import AppearanceSetting from './appearance-setting.vue'

import DialogueSetting from './dialogue-setting.vue'

import Phone from './phone.vue'

const activeTabsName = ref('外观设置')

/**
 *  外观设置类型
 */
export type AppearanceType = {

  /**
   *  手机信号
   */
  phoneSignal: number

  /**
   *  手机时间
   */
  phoneTime: string

  /**
   *  手机电量
   */
  phoneBattery: number

  /**
   *  wifi信号
   */
  wifiSignal: number

  /**
   *  是否充电中
   */
  isCharging: boolean

  /**
   *  是否听筒模式
   */
  isEarpieceMode: boolean

  /**
   *  是否语音模式
   */
  isVoiceMode: boolean

  /**
   *  消息数量
   */
  messageCount: number

  /**
   *  聊天标题
   */
  chatTitle: string

  /**
   *  聊天背景图
   */
  chatBackgroundImage: string
}

/**
 *  对话设置类型
 */
export type DialogueType = {

  /**
   *  用户列表
   */
  userList: []

  /**
   *  对话内容
   */
  dialogueContent: string

  /**
   *  红包或转账金额
   */
  redPacketOrTransferAmount: number

  /**
   *  添加聊天时间
   */
  addChatTime: string

  /**
   *  语音时间时长
   */
  voiceTime: number

  /**
   *  是否已读
   */
  isRead: boolean

  /**
   *  红包备注
   */
  redPacketRemark: string

  /**
   *  转账备注
   */
  transferRemark: string
}

export type SettingType = {

  /**
   *  外观设置
   */
  appearance: AppearanceType

  /**
   *  对话设置
   */
  dialogue: DialogueType
}

const setting = ref<SettingType>({
  /**
   *  外观设置
   */
  appearance: {
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
     *  消息数量
     */
    messageCount: 1,

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
  dialogue: {
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
          />
        </el-tab-pane>

        <el-tab-pane
          label="对话设置"
          name="对话设置"
        >
          <DialogueSetting
            :dialogue="setting.dialogue"
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
