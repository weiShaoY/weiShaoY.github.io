import { defineStore } from 'pinia'

import { computed, ref } from 'vue'

import { otherAvatarPng, ownAvatarPng } from '../../../pages/blog/socialEngineering/wxChat/images'

// ==================== 常量定义 ====================
const DEFAULT_USER: WxChatType.User.UserType = {
  id: 'user-0',
  nickname: '你自己',
  avatar: ownAvatarPng,
  role: 'own',
} as const

const DEFAULT_GENERATE_CONFIG = {
  minInterval: 1500,
  maxInterval: 3000,
} as const

// ==================== Store 定义 ====================
export const useWxChatStore = defineStore('wxChat', () => {
  // ==================== 状态管理 ====================
  /** 用户列表 */
  const userList = ref<WxChatType.User.UserType[]>([
    DEFAULT_USER,
    {
      id: `user-${Date.now()}`,
      nickname: '小甜甜',
      avatar: otherAvatarPng,
      role: 'other',
    },
    {
      id: `user-${Date.now()}-1`,
      nickname: 'test',
      avatar: otherAvatarPng,
      role: 'other',
    },
  ])

  /** 激活用户ID */
  const activeUserId = ref(DEFAULT_USER.id)

  /** 输入文本 */
  const inputText = ref('')

  /** 激活的聊天类型 */
  const activeChatType = ref<WxChatType.Chat.ChatType>('text')

  /** 聊天列表 */
  const chatList = ref<WxChatType.Chat.ChatInfoType[]>([])

  /** 生成配置 */
  const generateConfig = ref(DEFAULT_GENERATE_CONFIG)

  // ==================== 计算属性 ====================
  /** 激活用户 */
  const activeUser = computed(() =>
    userList.value.find(user => user.id === activeUserId.value) || DEFAULT_USER,
  )

  /** 激活角色 */
  const activeRole = computed<WxChatType.User.UserRole>(() =>
    activeUserId.value === DEFAULT_USER.id ? 'own' : 'other',
  )

  /** 自己信息 */
  const ownInfo = computed(() => userList.value[0])

  /** 已发送消息列表 */
  const sendList = computed(() =>
    chatList.value
      .filter((chat: WxChatType.Chat.ChatInfoType) => chat.role === activeRole.value)
      .map((chat: WxChatType.Chat.ChatInfoType) => ({
        label: chat.content || '',
        value: chat.id,
        disabled: chat.received,
      })),
  )

  // ==================== 方法定义 ====================
  /** 添加用户 */
  function addUser() {
    userList.value.push({
      id: `user-${Date.now()}`,
      nickname: '微信用户',
      role: 'other',
    })
  }

  /** 删除用户 */
  function deleteUser(id: string) {
    if (id === activeUserId.value) {
      activeUserId.value = DEFAULT_USER.id
    }

    userList.value = userList.value.filter(user => user.id !== id)
  }

  /** 设置激活用户 */
  function selectUser(id: string) {
    activeUserId.value = id
  }

  /** 将某条消息置为已接收 */
  function receiveChat(chatId: string) {
    const chat = chatList.value.find((chat: ChatInfoType) => chat.id === chatId)

    if (chat) {
      chat.received = true
    }
  }

  /** 发送消息 */
  function sentChat(chatInfo: Omit<WxChatType.Chat.ChatInfoType, 'id' | 'user'>) {
    chatList.value.push({
      id: `chat-${Date.now()}`,
      user: activeUser.value,
      ...chatInfo,
    })
  }

  /** 修改消息 */
  function editChat(chatInfo: WxChatType.Chat.ChatInfoType) {
    const index = chatList.value.findIndex((chat: WxChatType.Chat.ChatInfoType) => chat.id === chatInfo.id)

    if (index !== -1) {
      chatList.value[index] = chatInfo
    }
  }

  // ==================== 返回值 ====================
  return {
    // 常量
    DEFAULT_USER,

    // 状态
    userList,
    activeUserId,
    inputText,
    activeChatType,
    chatList,
    generateConfig,

    // 计算属性
    activeUser,
    activeRole,
    ownInfo,
    sendList,

    // 方法
    addUser,
    deleteUser,
    selectUser,
    receiveChat,
    sentChat,
    editChat,
  }
})
