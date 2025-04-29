/**
 * 复制文本到剪贴板，并根据需要显示通知
 *
 * @param  text 要复制的文本
 * @param  isShowNotification 是否显示复制成功/失败的通知
 */
export async function copyText(text: string, isShowNotification = true): Promise<void> {
  try {
    const { copy } = useClipboard()

    // 支持异步 copy
    await copy(text)

    if (isShowNotification) {
      window.$notification?.success({
        title: '复制成功',
        message: text,
      })
    }
  }
  catch (err) {
    console.error('复制操作不被支持或失败: ', err)

    if (isShowNotification) {
      window.$notification?.error({
        title: '复制失败',
        message: '复制操作不被支持或失败',
      })
    }
  }
}
