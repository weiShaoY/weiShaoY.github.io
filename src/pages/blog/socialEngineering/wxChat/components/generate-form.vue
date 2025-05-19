<script lang="ts" setup>
import dayjs from 'dayjs'

type ChatInfo = {
  id?: string
  type?: string
  content?: string
  [key: string]: any
}

type Props = {

  /**
   * 标题
   */
  title?: string

  /**
   * 聊天信息
   */
  chatInfo?: ChatInfo

  /**
   * 表单类型
   */
  formType?: 'add' | 'edit'
}

const props = withDefaults(defineProps<Props>(), {
  title: '发送类型',
  chatInfo: () => ({
  }),
  formType: 'add',
})

// 如果需要 emit 事件，可以这样定义
const emit = defineEmits<{
  (e: 'update', value: ChatInfo): void
  (e: 'submit', value: ChatInfo): void
}>()

const formModel = ref({
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

</script>

<template>
  <el-card
    :header="title"
  >
    <el-form
      :model="formModel"
    >
      <el-form-item
        prop="string"
        label="string"
      />
    </el-form>
  </el-card>
</template>
