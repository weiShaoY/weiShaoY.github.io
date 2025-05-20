// 用户角色类型
export type UserRole = 'own' | 'other'

// 聊天类型
export type ChatType = 'text' | 'image' | 'voice' | 'transferAccounts' | 'redEnvelope' | 'avInvite' | 'businessCard' | 'takeAPat' | 'time' | 'system' | 'revoke'

// 用户类型
export type UserType = {
  id: string
  nickname: string
  avatar?: string
  role: UserRole
}

// 聊天信息类型
export type ChatInfoType = {
  id: string
  type: ChatType
  role: UserRole
  user: UserType
  content?: string
  rejected?: boolean
  money?: number
  duration?: number | string
  received?: boolean
  invateType?: string
  state?: string
  image?: string
  patBold?: boolean
}
