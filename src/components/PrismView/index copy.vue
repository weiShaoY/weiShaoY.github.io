<script setup lang='ts'>

/**
 * @Description prismjs 预览 代码
 * @Author llj
 * @Date 2024-08-07 14:24:35
 */
import Prism from 'prismjs'

import { onMounted, ref } from 'vue'

import 'prismjs/themes/prism.css'

import 'prismjs/components/prism-javascript'

import 'prismjs/plugins/line-numbers/prism-line-numbers.js'

import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

defineProps({
  /**
   * 代码内容
   */
  code: {
    type: String,
    default: '',
  },

  /**
   * 代码语言
   */
  language: {
    type: String,
    default: 'javascript',
  },
})

onMounted(() => {
  Prism.highlightAll()
})
onUpdated(() => {
  Prism.highlightAll()
})

const codeBlock = ref()

onMounted(() => {
  Prism.highlightElement(codeBlock.value)
})
</script>

<template>
  <pre
    v-pre
    class="language-javascript line-numbers"
  >
    <code
      ref="codeBlock"
    >
    {{ code }}
    </code>
  </pre>
</template>
