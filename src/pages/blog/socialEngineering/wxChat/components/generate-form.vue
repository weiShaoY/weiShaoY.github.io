<script lang="ts" setup>
import type { Ref } from 'vue'

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
}>()

const wxChatStore = useWxChatStore()

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
})

function handleTextInput() {
  wxChatStore.inputText = formState.value.text
}

function handleTextBlur(e: FocusEvent) {
  const target = e.target as HTMLTextAreaElement

  const inputText = target.value.trim()

  inputText && useFetch(`https://x0.nz/bdstatic.com/?callback=jsonp&id=rwd5&location=${encodeURIComponent(inputText)}`)
}

function addEmoji(emoji: string) {
  const inputEl = textareaRef.value?.$el

  if (!inputEl) {
    return
  }

  const { selectionStart, selectionEnd } = inputEl

  const text = formState.value.text

  if (!text) {
    formState.value.text = `[${emoji}]`
  }
  else if (selectionStart === selectionEnd) {
    formState.value.text = selectionStart === 0
      ? `[${emoji}]${text}`
      : `${text.slice(0, selectionStart)}[${emoji}]${text.slice(selectionStart)}`
  }
  else {
    formState.value.text = `${text.slice(0, selectionStart)}[${emoji}]${text.slice(selectionEnd)}`
  }

  wxChatStore.inputText = formState.value.text
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
    </el-form>
  </el-card>
</template>
