import { useClipboard } from '@vueuse/core'

/**
 *  复制文本
 *  @param text 要复制的文本
 */
export function copyText(text: string) {
  try {
    const { copy } = useClipboard()

    copy(text)

    window.$notification?.success({
      title: '复制成功',
      message: text,
    })
  }
  catch (err) {
    console.error('复制操作不被支持或失败: ', err)
    window.$notification?.error({
      message: '复制操作不被支持或失败',
    })
  }
}
