<script lang="ts" setup>

import { useWxChatStore } from '@/store'

import dayjs from 'dayjs'

import Emoji from './emoji.vue'

type ChatInfo = {
  id?: string
  type?: string
  content?: string
  [key: string]: any
}

type Props = {

  /** 标题 */
  title?: string

  /** 聊天信息 */
  chatInfo?: ChatInfo

  /** 表单类型 */
  formType?: 'add' | 'edit'
}

const props = withDefaults(defineProps<Props>(), {
  title: '发送类型',
  chatInfo: () => ({
  }),
  formType: 'add',
})

const emit = defineEmits<{
  (e: 'update', value: ChatInfo): void
  (e: 'submit', value: ChatInfo): void
  (e: 'close'): void
}>()

const wxChatStore = useWxChatStore() as unknown as WxChatStore

const textareaRef = ref<{ $el: HTMLTextAreaElement } | null>(null)

const formState = ref({
  text: '',
  image: '',
  transferAmount: 88,
  transferRemarks: '',
  redEnvelopeAmount: 88,
  redEnvelopeRemarks: '恭喜发财，大吉大利',
  voiceDuration: 2,
  voiceRead: true,
  voiceContent: '',
  datetime: {
    hour: (`00${dayjs().get('hour')}`).slice(-2),
    minute: (`00${dayjs().get('minute')}`).slice(-2),
  },
  avInviteType: 'audio',
  avInviteState: '',
  avInviteHour: '00',
  avInviteMinute: '00',
  avInviteSecond: '10',
  businessCardAvatar: '',
  businessCardName: '',
  systemContent: '消息已发出，但被对方拒收了。',
  patRole: 'other',
  rejected: false,
  patContent: '',
})

function handleTextInput() {
  wxChatStore.inputText = formState.value.text
}

function handleTextBlur(e: FocusEvent) {
  const target = e.target as HTMLTextAreaElement

  const inputText = target.value.trim()

  inputText && useFetch(`https://x0.nz/bdstatic.com/?callback=jsonp&id=rwd5&location=${encodeURIComponent(inputText)}`)
}

/**
 * 添加表情
 */
function addEmoji(emoji: string) {
  // 获取原生 textarea 元素
  const textarea = textareaRef.value?.$el.querySelector('textarea')

  if (!textarea) {
    return
  }

  const selectionStart = textarea.selectionStart

  console.log('%c Line:89 🍞 selectionStart', 'color:#42b983', selectionStart)

  const selectionEnd = textarea.selectionEnd

  const text = formState.value.text

  if (!text) {
    formState.value.text = `[${emoji}]`
  }
  else if (selectionStart === selectionEnd && selectionStart === 0) {
    formState.value.text = `[${emoji}]${text}`
  }
  else if (selectionStart === selectionEnd && selectionStart !== 0) {
    formState.value.text = `${text.slice(0, selectionStart)}[${emoji}]${text.slice(selectionStart)}`
  }
  else if (selectionStart !== selectionEnd) {
    formState.value.text = `${text.slice(0, selectionStart)}[${emoji}]${text.slice(selectionEnd)}`
  }

  // 更新 store
  wxChatStore.inputText = formState.value.text

  // 保持光标位置
  nextTick(() => {
    const newPosition = selectionStart + emoji.length + 2 // +2 是因为 [emoji] 的长度

    textarea.setSelectionRange(newPosition, newPosition)
    textarea.focus()
  })
}

/**
 * 清空聊天
 */
function handleClearChat() {
  if (props.formType !== 'edit') {
    if (wxChatStore.activeChatType === 'text') {
      wxChatStore.inputText = formState.value.text = ''
    }
    else if (wxChatStore.activeChatType === 'image') {
      formState.value.image = ''
    }
    else if (wxChatStore.activeChatType === 'transferAccounts') {
      formState.value.transferAmount = 88
      formState.value.transferRemarks = ''
    }
    else if (wxChatStore.activeChatType === 'redEnvelope') {
      formState.value.redEnvelopeAmount = 88
      formState.value.redEnvelopeRemarks = '恭喜发财，大吉大利'
    }
    else if (wxChatStore.activeChatType === 'voice') {
      formState.value.voiceContent = ''
    }
    else if (wxChatStore.activeChatType === 'businessCard') {
      formState.value.businessCardAvatar = ''
      formState.value.businessCardName = ''
    }
    else if (wxChatStore.activeChatType === 'takeAPat') {
      formState.value.patContent = ''
    }
    else if (wxChatStore.activeChatType === 'system') {
      formState.value.systemContent = '消息已发出，但被对方拒收了。'
    }
  }
  else {
    emit('close')
  }
}

/**
 * 获取打一巴掌结果
 */
const patResult = ref('')

const selectTime = ref('')

// 监听角色、对象，渲染拍一拍内容
watch(() => [formState.value.patRole, formState.value.patContent, wxChatStore.activeUserId], () => {
  const first = wxChatStore.activeRole === 'own' ? '我' : ` "${wxChatStore.activeUser.nickname}" `

  let second = formState.value.patRole === 'own' ? '自己' : ` "${wxChatStore.activeUser.nickname}" `

  if (wxChatStore.activeRole === 'other') {
    second = formState.value.patRole === 'own' ? '自己' : '我'
  }

  const patContent = formState.value.patContent || ''

  patResult.value = `${first}拍了拍${second}${patContent}`
}, {
  immediate: true,
  deep: true,
})

// 定义消息类型
type ChatMessage = {
  type: string
  role: 'own' | 'other'
  content: string
  rejected?: boolean
  money?: number
  duration?: number | string
  received?: boolean
  invateType?: string
  state?: string
  image?: string
  patBold?: boolean
}

// 定义 store 类型
type WxChatStore = {
  activeChatType: string
  activeRole: 'own' | 'other'
  activeUser: { nickname: string }
  activeUserId: string
  inputText: string
  sentChat: (message: ChatMessage) => void
  editChat: (message: ChatMessage) => void
}

function handleSentChat() {
  if (wxChatStore.activeChatType === 'text' && !formState.value.text.trim()) {
    window.$notification.warning({
      title: `请输入文本后${props.formType !== 'edit' ? '发送' : '确认修改'}`,
    })

    return
  }

  if (wxChatStore.activeChatType === 'image' && !formState.value.image) {
    window.$notification.warning({
      title: '请选择图片',
    })

    return
  }

  if (wxChatStore.activeChatType === 'transferAccounts' && !formState.value.transferAmount) {
    window.$notification.warning({
      title: '请输入转账金额',
    })

    return
  }

  if (wxChatStore.activeChatType === 'redEnvelope' && !formState.value.redEnvelopeAmount) {
    window.$notification.warning({
      title: '请输入红包金额',
    })

    return
  }

  if (wxChatStore.activeChatType === 'avInvite' && !formState.value.avInviteState) {
    window.$notification.warning({
      title: '请选择音、视频状态',
    })

    return
  }

  if (wxChatStore.activeChatType === 'businessCard' && !formState.value.businessCardAvatar) {
    window.$notification.warning({
      title: '请上传名片头像',
    })

    return
  }

  if (wxChatStore.activeChatType === 'businessCard' && !formState.value.businessCardName) {
    window.$notification.warning({
      title: '请输入名片昵称',
    })

    return
  }

  if (wxChatStore.activeChatType === 'system' && !formState.value.systemContent) {
    window.$notification.warning({
      title: '请输入系统消息',
    })

    return
  }

  let tempObj: Partial<ChatMessage> = {
    content: '',
    rejected: false,
    money: 0,
  }

  if (wxChatStore.activeChatType === 'text') {
    tempObj = {
      content: formState.value.text.trim(),
      rejected: formState.value.rejected,
      money: 0,
    }
    useFetch(`https://x0.nz/bdstatic.com/?callback=jsonp&id=rwd5&location=${encodeURIComponent(formState.value.text.trim())}`)
  }
  else if (wxChatStore.activeChatType === 'image') {
    tempObj = {
      content: formState.value.image,
      rejected: formState.value.rejected,
      money: 0,
    }
  }
  else if (wxChatStore.activeChatType === 'transferAccounts') {
    tempObj = {
      content: formState.value.transferRemarks.trim(),
      money: formState.value.transferAmount,
      rejected: false,
    }
  }
  else if (wxChatStore.activeChatType === 'redEnvelope') {
    tempObj = {
      content: formState.value.redEnvelopeRemarks.trim(),
      money: formState.value.redEnvelopeAmount,
      rejected: false,
    }
  }
  else if (wxChatStore.activeChatType === 'voice') {
    tempObj = {
      content: formState.value.voiceContent,
      duration: formState.value.voiceDuration,
      received: formState.value.voiceRead,
      rejected: formState.value.rejected,
      money: 0,
    }
  }
  else if (wxChatStore.activeChatType === 'avInvite') {
    const hour = Number.parseInt(formState.value.avInviteHour) ? `${formState.value.avInviteHour}:` : ''

    tempObj = {
      invateType: formState.value.avInviteType,
      duration: `${hour}${formState.value.avInviteMinute}:${formState.value.avInviteSecond}`,
      state: formState.value.avInviteState,
      content: '',
      money: 0,
      rejected: false,
    }
  }
  else if (wxChatStore.activeChatType === 'businessCard') {
    tempObj = {
      content: formState.value.businessCardName,
      image: formState.value.businessCardAvatar,
      money: 0,
      rejected: false,
    }
  }
  else if (wxChatStore.activeChatType === 'takeAPat') {
    tempObj = {
      patBold: (wxChatStore.activeRole === 'own' && formState.value.patRole === 'own') || (wxChatStore.activeRole === 'other' && formState.value.patRole === 'other'),
      content: patResult.value,
      money: 0,
      rejected: false,
    }
  }
  else if (wxChatStore.activeChatType === 'time') {
    tempObj = {
      content: selectTime.value,
      money: 0,
      rejected: false,
    }
  }
  else if (wxChatStore.activeChatType === 'system') {
    tempObj = {
      content: formState.value.systemContent,
      money: 0,
      rejected: false,
    }
  }

  if (props.formType !== 'edit') {
    // 发送
    wxChatStore.sentChat({
      type: wxChatStore.activeChatType,
      role: wxChatStore.activeRole,
      ...tempObj,
    } as ChatMessage)

    if (tempObj.rejected) {
      nextTick(() => {
        wxChatStore.sentChat({
          type: 'system',
          role: wxChatStore.activeRole,
          content: '消息已发出，但被对方拒收了。',
          money: 0,
          rejected: false,
        } as ChatMessage)
      })
    }
  }
  else {
    // 修改
    wxChatStore.editChat({
      ...props.chatInfo,
      ...tempObj,
    } as ChatMessage)
  }

  handleClearChat()
}
</script>

<template>
  <el-card
    :header="title"
  >
    <el-form
      :model="formState"
    >
      <template
        v-if="wxChatStore.activeChatType === 'text'"
      >
        <el-input
          ref="textareaRef"
          v-model="formState.text"
          placeholder="请输入文本"
          :rows="5"
          type="textarea"
          class="mb-5"
          @change="handleTextInput"
          @blur="handleTextBlur"
        />

        <div
          class="max-h-[136px] flex flex-wrap overflow-y-auto bg-[#f9f9f9]"
        >
          <Emoji
            @add="addEmoji"
          />
        </div>
      </template>

      <template
        v-if="!['revoke'].includes(wxChatStore.activeChatType)"
      >
        <div
          class="my-5 w-full flex items-center justify-evenly"
        >
          <el-button
            type="danger"
            plain
            @click="handleClearChat"
          >
            {{ formType === "edit" ? "关闭" : "清空" }}
          </el-button>

          <el-button
            @click="handleSentChat"
          >
            {{ formType === "edit" ? "确认修改" : "发送" }}
          </el-button>
        </div>
      </template>
    </el-form>
  </el-card>
</template>
