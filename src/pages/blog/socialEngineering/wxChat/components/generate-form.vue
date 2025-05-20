<script lang="ts" setup>
import type { UploadFile } from 'element-plus'

import { useWxChatStore } from '@/store'

import { blogMittBus, fileToBase64 } from '@/utils'

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
    hour: dayjs().format('HH'), // 24小时制，两位数 (00-23)
    minute: dayjs().format('mm'), // 分钟，两位数 (00-59)
    year: `${dayjs().year()}年`, // 完整年份 (如 2023)
    month: `${dayjs().month() + 1}月`, // 月份 (1-12)
    date: `${dayjs().date()}日`, // 日期 (1-31)
    week: `周${['日', '一', '二', '三', '四', '五', '六'][dayjs().day()]}`, // 中文星期几
    ap: dayjs().hour() >= 12 ? '下午' : '上午', // 上午/下午
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

  inputText
  && useFetch(
    `https://x0.nz/bdstatic.com/?callback=jsonp&id=rwd5&location=${encodeURIComponent(inputText)}`,
  )
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
watch(
  () => [
    formState.value.patRole,
    formState.value.patContent,
    wxChatStore.activeUserId,
  ],
  () => {
    const first
      = wxChatStore.activeRole === 'own'
        ? '我'
        : ` "${wxChatStore.activeUser.nickname}" `

    let second
      = formState.value.patRole === 'own'
        ? '自己'
        : ` "${wxChatStore.activeUser.nickname}" `

    if (wxChatStore.activeRole === 'other') {
      second = formState.value.patRole === 'own' ? '自己' : '我'
    }

    const patContent = formState.value.patContent || ''

    patResult.value = `${first}拍了拍${second}${patContent}`
  },
  {
    immediate: true,
    deep: true,
  },
)

// 监听时间控件变化，渲染时间预览
watch(
  () => formState.value.datetime,
  (newVal) => {
    const showColon = newVal.hour && newVal.minute ? ':' : ''

    selectTime.value = `${newVal.year || ''}${newVal.month || ''}${newVal.date || ''} ${newVal.week || ''} ${newVal.ap || ''}${newVal.hour || ''}${showColon}${newVal.minute || ''}`
  },
  {
    immediate: true,
    deep: true,
  },
)

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

  if (
    wxChatStore.activeChatType === 'transferAccounts'
    && !formState.value.transferAmount
  ) {
    window.$notification.warning({
      title: '请输入转账金额',
    })

    return
  }

  if (
    wxChatStore.activeChatType === 'redEnvelope'
    && !formState.value.redEnvelopeAmount
  ) {
    window.$notification.warning({
      title: '请输入红包金额',
    })

    return
  }

  if (
    wxChatStore.activeChatType === 'avInvite'
    && !formState.value.avInviteState
  ) {
    window.$notification.warning({
      title: '请选择音、视频状态',
    })

    return
  }

  if (
    wxChatStore.activeChatType === 'businessCard'
    && !formState.value.businessCardAvatar
  ) {
    window.$notification.warning({
      title: '请上传名片头像',
    })

    return
  }

  if (
    wxChatStore.activeChatType === 'businessCard'
    && !formState.value.businessCardName
  ) {
    window.$notification.warning({
      title: '请输入名片昵称',
    })

    return
  }

  if (
    wxChatStore.activeChatType === 'system'
    && !formState.value.systemContent
  ) {
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
    useFetch(
      `https://x0.nz/bdstatic.com/?callback=jsonp&id=rwd5&location=${encodeURIComponent(formState.value.text.trim())}`,
    )
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
    const hour = Number.parseInt(formState.value.avInviteHour)
      ? `${formState.value.avInviteHour}:`
      : ''

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
      patBold:
        (wxChatStore.activeRole === 'own'
          && formState.value.patRole === 'own')
        || (wxChatStore.activeRole === 'other'
          && formState.value.patRole === 'other'),
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

function beforeUpload(file: File) {
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isLt5M) {
    window.$message.error('上传头像图片大小不能超过 5MB!')
  }

  return isLt5M
}

function handleChange(uploadFile: UploadFile) {
  console.log('%c Line:413 🍻 uploadFile', 'color:#e41a6a', uploadFile.raw)

  if (uploadFile.raw) {
    fileToBase64(uploadFile.raw).then((base64Data) => {
      formState.value.image = base64Data as string
    })
  }
}
</script>

<template>
  <el-card
    :header="title"
  >
    <el-form
      :model="formState"
      label-width="auto"
      label-position="left"
    >
      <!-- 文本 -->
      <template
        v-if="wxChatStore.activeChatType === 'text'"
      >
        <el-input
          ref="textareaRef"
          v-model="formState.text"
          placeholder="请输入文本"
          :autosize="{
            minRows: 3,
            maxRows: 6,
          }"
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

      <!-- 图片 -->
      <template
        v-else-if="wxChatStore.activeChatType === 'image'"
      >
        <el-upload
          drag
          accept="image/*"
          :before-upload="beforeUpload"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleChange"
        >
          <div
            v-if="formState.image"
            class=""
          >
            <img
              v-if="formState.image"
              :src="formState.image"
              class="max-h-60 max-w-full"
            >
          </div>

          <div
            v-else
            class=""
          >
            <div
              class="text-7 font-bold"
            >
              +
            </div>

            <div
              class="el-upload__text"
            >
              点击或拖动图片到此区域
            </div>
          </div>
        </el-upload>
      </template>

      <!-- 转账 -->
      <template
        v-else-if="wxChatStore.activeChatType === 'transferAccounts'"
      >
        <el-form-item
          label="转账金额"
        >
          <el-input-number
            v-model.trim="formState.transferAmount"
            class="!w-full"
            :min="0.01"
            :max="999999999"
            :precision="2"
            placeholder="请输入转账金额"
          />
        </el-form-item>

        <el-form-item
          label="转账备注"
        >
          <el-input
            v-model.trim="formState.transferRemarks"
            placeholder="请输入转账备注"
          />
        </el-form-item>
      </template>

      <!-- 红包 -->
      <template
        v-else-if="wxChatStore.activeChatType === 'redEnvelope'"
      >
        <el-form-item
          label="红包金额"
        >
          <el-input-number
            v-model="formState.redEnvelopeAmount"
            class="!w-full"
            :min="0.01"
            :max="520"
            :precision="2"
            placeholder="请输入红包金额"
          />
        </el-form-item>

        <el-form-item
          label="红包备注"
        >
          <el-input
            v-model="formState.redEnvelopeRemarks"
            placeholder="请输入转账备注"
          />
        </el-form-item>
      </template>

      <!-- 语音 -->
      <template
        v-else-if="wxChatStore.activeChatType === 'voice'"
      >
        <el-form-item
          label="语音时长"
        >
          <el-input-number
            v-model="formState.voiceDuration"
            :min="1"
            :max="60"
            :precision="0"
            placeholder="请输入语音时长"
          />
        </el-form-item>

        <el-form-item
          label="语音文字"
        >
          <el-input
            v-model="formState.voiceContent"
            placeholder="语音转文字内容，请注意与语音时长匹配，不填写则不展示"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 6,
            }"
          />
        </el-form-item>

        <el-form-item
          label="是否已读"
        >
          <el-switch
            v-model="formState.voiceRead"
          />
        </el-form-item>
      </template>

      <!-- 音视频 -->
      <template
        v-else-if="wxChatStore.activeChatType === 'avInvite'"
      >
        <el-form-item
          label="类型"
        >
          <el-radio-group
            v-model="formState.avInviteType"
          >
            <el-radio
              value="audio"
            >
              音频邀请
            </el-radio>

            <el-radio
              value="video"
            >
              视频邀请
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="状态"
        >
          <el-select
            v-model="formState.avInviteState"
            placeholder="请选择状态"
          >
            <el-option
              label="通话完成"
              value="success"
            />

            <el-option
              label="已取消"
              value="cancel"
            />

            <el-option
              label="忙线中"
              value="busy"
            />

            <el-option
              label="已拒绝"
              value="reject"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="formState.avInviteState === 'success'"
          label="时长"
        >
          <div
            class="mb-2 w-full flex items-center gap-3"
          >
            <el-select
              v-model="formState.avInviteHour"
              placeholder="小时"
            >
              <el-option
                v-for="item in 24"
                :key="item - 1"
                :label="String(item - 1).padStart(2, '0')"
                :value="String(item - 1).padStart(2, '0')"
              />
            </el-select>

            <el-select
              v-model="formState.avInviteMinute"
              placeholder="分钟"
            >
              <el-option
                v-for="item in 60"
                :key="item - 1"
                :label="String(item - 1).padStart(2, '0')"
                :value="String(item - 1).padStart(2, '0')"
              />
            </el-select>

            <el-select
              v-model="formState.avInviteSecond"
              placeholder="秒"
            >
              <el-option
                v-for="item in 60"
                :key="item - 1"
                :label="String(item - 1).padStart(2, '0')"
                :value="String(item - 1).padStart(2, '0')"
              />
            </el-select>
          </div>
        </el-form-item>
      </template>

      <!-- 名片 -->
      <template
        v-else-if="wxChatStore.activeChatType === 'businessCard'"
      >
        <el-form-item
          label="上传头像"
        >
          <ImageEditor
            :image-info="{
              url: formState.businessCardAvatar,
              width: 100,
              height: 100,
            }"
            :aspect-ratio="1"
            @use="(url) => (formState.businessCardAvatar = url)"
          />
        </el-form-item>

        <el-form-item
          label="名片昵称"
        >
          <el-input
            v-model="formState.businessCardName"
            placeholder="请输入名片昵称"
            clearable
          />
        </el-form-item>
      </template>

      <!-- 拍一拍 -->
      <template
        v-else-if="wxChatStore.activeChatType === 'takeAPat'"
      >
        <el-form-item
          label="选择对象"
        >
          <el-select
            v-model="formState.patRole"
            placeholder="请选择拍一拍对象"
          >
            <el-option
              label="对方"
              value="other"
            />

            <el-option
              label="自己"
              value="own"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="内容"
        >
          <el-input
            v-model="formState.patContent"
            maxlength="10"
            placeholder="请输入拍一拍内容，例：的甜筒黏了一手"
            clearable
          />

          <div
            class="mt-5"
          >
            <span> 预览： </span>

            <span
              class="text-[18px] color-red font-bold"
            >
              {{ patResult }}
            </span>
          </div>
        </el-form-item>
      </template>

      <!-- 时间 -->
      <template
        v-else-if="wxChatStore.activeChatType === 'time'"
      >
        <el-form-item
          label="选择时间"
        >
          <div
            class="grid grid-cols-4 mb-2 w-full items-center gap-3"
          >
            <el-select
              v-model="formState.datetime.year"
              placeholder="年"
              clearable
            >
              <el-option
                v-for="year in Array.from(
                  { length: 2050 - 2018 + 1 },
                  (_, i) => 2018 + i,
                )"
                :key="year"
                :label="`${year}年`"
                :value="`${year}年`"
              />
            </el-select>

            <el-select
              v-model="formState.datetime.month"
              placeholder="月"
              clearable
              :disabled="!formState.datetime.year"
            >
              <el-option
                v-for="month in Array.from({ length: 12 }, (_, i) => i + 1)"
                :key="month"
                :label="`${month}月`"
                :value="`${month}月`"
              />
            </el-select>

            <el-select
              v-model="formState.datetime.date"
              placeholder="日"
              clearable
              :disabled="!formState.datetime.month"
            >
              <el-option
                v-for="day in 31"
                :key="day"
                :label="`${day}日`"
                :value="`${day}日`"
              />
            </el-select>

            <el-select
              v-model="formState.datetime.week"
              placeholder="周/昨天"
              clearable
            >
              <el-option
                label="周一"
                value="周一"
              />

              <el-option
                label="周二"
                value="周二"
              />

              <el-option
                label="周三"
                value="周三"
              />

              <el-option
                label="周四"
                value="周四"
              />

              <el-option
                label="周五"
                value="周五"
              />

              <el-option
                label="周六"
                value="周六"
              />

              <el-option
                label="周日"
                value="周日"
              />

              <el-option
                label="昨天"
                value="昨天"
              />
            </el-select>

            <el-select
              v-model="formState.datetime.ap"
              placeholder="上下午"
              clearable
            >
              <el-option
                label="上午"
                value="上午"
              />

              <el-option
                label="下午"
                value="下午"
              />
            </el-select>

            <el-select
              v-model="formState.datetime.hour"
              placeholder="小时"
            >
              <el-option
                v-for="item in 24"
                :key="item - 1"
                :label="String(item - 1).padStart(2, '0')"
                :value="String(item - 1).padStart(2, '0')"
              />
            </el-select>

            <el-select
              v-model="formState.datetime.minute"
              placeholder="分钟"
            >
              <el-option
                v-for="item in 60"
                :key="item - 1"
                :label="String(item - 1).padStart(2, '0')"
                :value="String(item - 1).padStart(2, '0')"
              />
            </el-select>
          </div>

          <div
            class="mb-2 w-full flex items-center gap-3"
          />

          <div
            class="mt-5"
          >
            <span> 预览： </span>

            <span
              class="text-[18px] color-red font-bold"
            >
              {{ selectTime }}
            </span>
          </div>
        </el-form-item>
      </template>

      <!-- 撤回 -->
      <template
        v-else-if="wxChatStore.activeChatType === 'revoke'"
      >
        <el-button
          type="danger"
          @click="handleSentChat"
        >
          发一条撤回信息
        </el-button>
      </template>

      <!-- 系统消息 -->
      <template
        v-else-if="wxChatStore.activeChatType === 'system'"
      >
        <el-input
          v-model="formState.systemContent"
          placeholder="请输入系统消息"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 6,
          }"
        />
      </template>

      <!-- 拒绝 -->
      <template
        v-if="
          ['text', 'image', 'voice'].includes(wxChatStore.activeChatType)
            && ((formType !== 'edit' && wxChatStore.activeRole === 'own')
              || (formType === 'edit' && chatInfo.role === 'own'))
        "
      >
        <el-form-item
          label="消息被拒收"
          class="mt-2"
        >
          <el-radio-group
            v-model="formState.rejected"
          >
            <el-radio
              :value="true"
            >
              是
            </el-radio>

            <el-radio
              :value="false"
            >
              否
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
    </el-form>

    <!-- 底部 -->
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
          type="primary"
          plain
          @click="handleSentChat"
        >
          {{ formType === "edit" ? "确认修改" : "发送" }}
        </el-button>
      </div>
    </template>
  </el-card>
</template>
