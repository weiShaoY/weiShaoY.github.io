import copy from 'copy-text-to-clipboard'

/**
 *  复制文本
 *  @param text 要复制的文本
 */
export function copyText(text: string) {
  copy(text)
}
