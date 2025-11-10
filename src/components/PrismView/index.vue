<script setup lang="ts">

/**
 * @Description prismjs 预览 代码
 * @Author llj
 * @Date 2024-08-07 14:24:35
 */
import Prism from 'prismjs'

import {
  computed,
  onMounted,
  onUpdated,
  ref,
} from 'vue'

import 'prismjs/themes/prism.css'

import 'prismjs/components/prism-javascript'

import 'prismjs/plugins/line-numbers/prism-line-numbers.js'

import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import 'prismjs/components/prism-typescript'

import 'prismjs/components/prism-markup'

import 'prismjs/components/prism-css'

const props = defineProps({
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
    default: 'html',
  },
})

// 动态引入高亮语言包（除默认javascript外）
async function loadLanguage(lang: string) {
  if (lang && lang !== 'javascript') {
    try {
      await import(`prismjs/components/prism-${lang}`)
    }
    catch {
      window.$notification?.error({
        title: '代码高亮错误',
      })
    }
  }
}

const codeBlock = ref<HTMLElement | null>(null)

const languageClass = computed(() => `language-${props.language} line-numbers`)

const highlightedCode = computed(() =>
  Prism.highlight(props.code, Prism.languages[props.language] || Prism.languages.javascript, props.language),
)

async function highlightNow() {
  await loadLanguage(props.language)
  if (codeBlock.value) {
    Prism.highlightElement(codeBlock.value)
  }
}

onMounted(highlightNow)
onUpdated(highlightNow)
</script>

<template>
  <pre
    :class="languageClass"
  >
    <code
      ref="codeBlock"
      :class="`language-${props.language}`"
      v-html="highlightedCode"
    />
  </pre>
</template>
