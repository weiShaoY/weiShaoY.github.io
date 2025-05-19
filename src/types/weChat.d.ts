/** 微信聊天生成器类型 */

declare namespace WxChatType {
  namespace User {

    /**
     *  用户角色
     */
    type UserRole = 'own' | 'other'

    /**
     *  用户类型
     */
    type UserType = {
      id: string
      nickname: string
      avatar?: string
      role: UserRole
    }
  }

  namespace Chat {

    /**
     * 聊天记录的类型枚举，根据内容类型（文字、图片、语音、视频等）进行分类
     */
    type ChatType =
      | 'text' // 文本
      | 'image' // 图片
      | 'transferAccounts' // 转账
      | 'redEnvelope' // 红包
      | 'voice' // 语音
      | 'avInvite' // 音视频
      | 'businessCard' // 名片
      | 'takeAPat' // 拍一拍
      | 'time' // 时间
      | 'revoke' // 撤回
      | 'system' // 系统消息
  }
}
