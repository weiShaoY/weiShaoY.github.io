/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */

import type { Directive, DirectiveBinding } from 'vue'

type ElType = {
  copyData: string | number
} & HTMLElement

async function handleClick(this: any) {
  try {
    if (!this.copyData) {
      return
    }

    await navigator.clipboard.writeText(this.copyData)

    window.$notification?.success({
      message: '复制成功',
    })
  }
  catch (err) {
    console.error('复制操作不被支持或失败: ', err)
  }
}

/**
 *  复制的文本
 */
export type UseCopyParamsType = string | number

const useCopy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding<UseCopyParamsType>) {
    el.copyData = binding.value
    el.addEventListener('click', handleClick)
  },
  updated(el: ElType, binding: DirectiveBinding<UseCopyParamsType>) {
    el.copyData = binding.value
  },

  beforeUnmount(el: ElType) {
    el.removeEventListener('click', handleClick)
  },
}

export default useCopy
