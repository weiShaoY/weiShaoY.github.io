/**
 * 通用对话项类型，表示一个聊天记录的基类
 */
type BaseDialog = {

  /** 对话唯一标识符 */
  id: string

  /** 对话类型 */
  type: 'text' | 'notice' | 'transfer' | 'redpacket' | 'voice' | 'image'
}

/**
 * 文本消息类型
 */
type TextDialogType = {
  type: 'text'

  /** 消息内容 */
  content: string

  /** 是否是本人发送 */
  is_me: boolean

  /** 发送者用户ID */
  user_id: string
} & BaseDialog

/**
 * 系统通知类型
 */
type NoticeDialogType = {
  type: 'notice'

  /** 通知内容 */
  content: string
} & BaseDialog

/**
 * 转账消息类型
 */
type TransferDialogType = {
  type: 'transfer'

  /** 金额（字符串格式） */
  money: string

  /** 是否是本人发送（可选） */
  is_me?: boolean

  /** 用户ID */
  user_id: string

  /** 是否已领取 */
  is_get: boolean

  /** 转账备注 */
  remark: string
} & BaseDialog

/**
 * 红包消息类型
 */
type RedPacketDialogType = {
  type: 'redpacket'

  /** 金额（字符串格式） */
  money: string

  /** 是否是本人发送（可选） */
  is_me?: boolean

  /** 用户ID */
  user_id: string

  /** 是否已领取 */
  is_get: boolean

  /** 红包备注 */
  remark: string
} & BaseDialog

/**
 * 语音消息类型
 */
type VoiceDialogType = {
  type: 'voice'

  /** 语音时长（单位：秒） */
  time: number

  /** 是否是本人发送 */
  is_me: boolean

  /** 用户ID */
  user_id: string
} & BaseDialog

type ImageDialogType = {
  type: 'image'

  /** 图片URL */
  image: string

  /** 用户ID */
  user_id: string

} & BaseDialog

/**
 * 所有对话类型的联合类型
 */
export type DialogType =
  | TextDialogType
  | NoticeDialogType
  | TransferDialogType
  | RedPacketDialogType
  | VoiceDialogType
  | ImageDialogType

/**
 * 聊天记录项的统一类型
 */
// type Dialog =
  | {

    /** 对话唯一标识符 */
    id: string

    /** 类型为文本消息 */
    type: 'text'

    /** 消息内容 */
    content: string

    /** 是否是本人发送 */
    is_me: boolean

    /** 用户ID */
    user_id: string
  }
  | {

    /** 对话唯一标识符 */
    id: string

    /** 类型为系统通知 */
    type: 'notice'

    /** 通知内容 */
    content: string
  }
  | {

    /** 对话唯一标识符 */
    id: string

    /** 类型为转账消息 */
    type: 'transfer'

    /** 金额（字符串格式） */
    money: string

    /** 用户ID */
    user_id: string

    /** 是否已领取 */
    is_get: boolean

    /** 转账备注 */
    remark: string

    /** 是否是本人发送（可选） */
    is_me?: boolean
  }
  | {

    /** 对话唯一标识符 */
    id: string

    /** 类型为红包消息 */
    type: 'redpacket'

    /** 金额（字符串格式） */
    money: string

    /** 用户ID */
    user_id: string

    /** 是否已领取 */
    is_get: boolean

    /** 红包备注 */
    remark: string

    /** 是否是本人发送（可选） */
    is_me?: boolean
  }
  | {

    /** 对话唯一标识符 */
    id: string

    /** 类型为语音消息 */
    type: 'voice'

    /** 语音时长（单位：秒） */
    time: number

    /** 是否是本人发送 */
    is_me: boolean

    /** 用户ID */
    user_id: string
  }
