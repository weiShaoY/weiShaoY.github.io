/**
 *  外观设置类型
 */
export type AppearanceType = {

  // 手机基本信息
  /**
   *  手机型号
   */
  phoneModel: 'iphone' | 'android'

  /**
   *  是否深色模式
   */
  isDarkMode: boolean

  // 手机状态信息
  /**
   *  手机信号
   */
  phoneSignal: number

  /**
   *  wifi信号
   */
  wifiSignal: number

  /**
   *  手机电量
   */
  phoneBattery: number

  /**
   *  手机充电状态
   */
  isCharging: boolean

  // 时间相关
  /**
   *  手机时间
   */
  phoneTime: string

  /**
   *  是否跟随系统时间
   */
  isFollowSystemTime: boolean

  // 聊天界面设置
  /**
   *  聊天标题
   */
  chatTitle: string

  /**
   *  聊天背景图
   */
  chatBackgroundImage: string

  /**
   *  未读消息数量
   */
  unreadMessageCount: number

  /**
   *  是否显示用户名
   */
  isShowUserName: boolean

  // 音频相关
  /**
   *  是否听筒模式
   */
  isEarpieceMode: boolean

  /**
   *  是否语音模式
   */
  isVoiceMode: boolean
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
