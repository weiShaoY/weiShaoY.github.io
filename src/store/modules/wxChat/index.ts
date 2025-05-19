// src/stores/index.ts
// 2025-04-18---01:20---星期五

import { defineStore } from 'pinia'

import { computed, ref } from 'vue'

import { otherAvatarPng, ownAvatarPng } from '../../../pages/blog/socialEngineering/wxChat/images'

// ==================== 常量定义 ====================

/**
 * 微信聊天模块
 */
export const useWxChatStore = defineStore('wxChat', () => {
  // ==================== 状态管理 ====================
  /**
   *  默认用户
   */
  const DEFAULT_USER: WxChatType.User.UserType = {
    id: 'user-0',
    nickname: '你自己',
    avatar: ownAvatarPng,
    role: 'own',
  }

  /**
   * 用户列表
   */
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

  /**
   * 激活用户id
   */
  const activeUserId = ref(DEFAULT_USER.id)

  // ==================== 计算属性 ====================
  /**
   * 激活用户
   */
  const activeUser = computed(() => {
    const user = userList.value.find((user: WxChatType.User.UserType) => user.id === activeUserId.value)

    return user || DEFAULT_USER
  })

  /**
   * 激活角色
   */
  const activeRole = computed<WxChatType.User.UserRole>(() =>
    activeUserId.value === DEFAULT_USER.id ? 'own' : 'other',
  )

  /**
   * 自己信息
   */
  const ownInfo = computed(() => userList.value[0])

  /**
   *  激活的聊天类型
   */
  const activeChatType = ref<WxChatType.Chat.ChatType>('text')

  // ==================== 方法定义 ====================
  /**
   * 添加用户
   */
  function addUser() {
    userList.value.push({
      id: `user-${Date.now()}`,
      nickname: '微信用户',
      role: 'other',
    })
  }

  /**
   * 删除用户
   */
  function deleteUser(id: string) {
    if (id === activeUserId.value) {
      activeUserId.value = DEFAULT_USER.id
    }

    userList.value = userList.value.filter(user => user.id !== id)
  }

  /**
   * 设置激活用户
   */
  function selectUser(id: string) {
    activeUserId.value = id
  }

  /**
   * 输入文本
   */
  const inputText = ref('')

  // ==================== 返回值 ====================
  return {
    // 状态
    DEFAULT_USER,
    userList,
    activeUserId,

    // 计算属性
    activeUser,
    activeRole,
    ownInfo,
    activeChatType,

    // 方法
    addUser,
    deleteUser,
    selectUser,

    inputText,
  }
})
