import type { Directive } from 'vue'

import { copyText } from '@/utils'

/**
 * 扩展的元素类型，挂载自定义属性
 */
type ElType = HTMLElement & {
  copyText?: string
  copyMessage?: string
}

/**
 * v-copy 指令参数类型
 */
export type UseCopyParamsType = {

  /**
   * 要复制的文本
   */
  text: string

  /**
   * 复制成功后的提示消息
   */
  message?: string
}

/**
 * 点击事件处理器
 * @param this - 扩展的元素类型
 */
async function handleClick(this: ElType) {
  try {
    if (!this.copyText) {
      return
    }

    copyText(this.copyText, this.copyMessage)
  }
  catch (err) {
    console.error('复制操作不被支持或失败: ', err)
  }
}

/**
 *  点击复制指令
 */
export const copy: Directive<ElType, UseCopyParamsType> = {
  mounted(el, binding) {
    el.copyText = binding.value.text || ''
    el.copyMessage = binding.value?.message || ''
    el.addEventListener('click', handleClick)
  },
  updated(el, binding) {
    el.copyText = binding.value.text || ''
    el.copyMessage = binding.value?.message || ''
  },
  beforeUnmount(el) {
    el.removeEventListener('click', handleClick)
  },
}
