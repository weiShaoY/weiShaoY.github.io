// 聊天信息类型
export type ChatInfo = {
  id: string
  name: string
  avatar: string
  status: string
}

// 消息类型
export type Message = {
  id: string
  content: string
  timestamp: number
  isSelf: boolean
  type: 'text' | 'image'
  imageUrl?: string
  status?: 'sending' | 'sent' | 'failed'
}

// 外观设置类型
export type AppearanceSettings = {
  phoneSignal: number
  phoneTime: string
  phoneBattery: number
  networkSignal: number
  wifiSignal: number
  isCharging: boolean
  isEarpieceMode: boolean
  isVoiceMode: boolean
  messageCount: number
  chatTitle: string
  chatBackgroundImage: string
}

// 对话设置类型
export type DialogueSettings = {
  userList: ChatInfo[]
  dialogueContent: string
  redPacketOrTransferAmount: number
  addChatTime: string
  voiceTime: number
  isRead: boolean
  redPacketRemark: string
  transferRemark: string
}

// 总设置类型
export type SettingType = {
  appearance: AppearanceSettings
  dialogue: DialogueSettings
}

// 组件 Props 类型
export type WxChatProps = {
  chatInfo: ChatInfo
  userAvatar: string
  userName: string
  messages: Message[]
}

// 组件 Emits 类型
export type WxChatEmits = {
  (e: 'send', message: Message): void
  (e: 'upload-image', file: File): Promise<string>
}
