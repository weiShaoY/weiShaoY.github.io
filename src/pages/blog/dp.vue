<script setup lang="ts">
import type { Highlighter, ThemeInput } from 'shiki'

import katex from 'katex'

import { defaultLanguages, registerHighlight } from 'stream-markdown'

import { getMarkdown } from 'stream-markdown-parser'

type PropsType = {
  fileObj: {
    name: string
    content: string
  }
}

const props = withDefaults(defineProps<PropsType>(), {
})

// 直接使用响应式内容，不需要额外的流式逻辑
const content = ref<string>('')

// 监听文件内容变化，重置并重新开始流式输出
watch(() => props.fileObj.content, (newContent) => {
  console.log('%c Line:42 🥃 newContent', 'color:#ea7e5c', newContent)
  content.value = '' // 重置内容

  // 使用定时器模拟流式输出内容
  const intervalId = setInterval(() => {
    const cur = content.value.length

    if (cur >= newContent.length) {
      clearInterval(intervalId)
      return
    }

    content.value += newContent.charAt(cur)
  }, 16)
}, {
  immediate: true,
})

// 语言名称映射表
const languageMap: Record<string, string> = {
  'js': 'JavaScript',
  'ts': 'TypeScript',
  'jsx': 'JSX',
  'tsx': 'TSX',
  'html': 'HTML',
  'css': 'CSS',
  'scss': 'SCSS',
  'json': 'JSON',
  'py': 'Python',
  'python': 'Python',
  'rb': 'Ruby',
  'go': 'Go',
  'java': 'Java',
  'c': 'C',
  'cpp': 'C++',
  'cs': 'C#',
  'php': 'PHP',
  'sh': 'Shell',
  'bash': 'Bash',
  'sql': 'SQL',
  'yaml': 'YAML',
  'md': 'Markdown',
  '': 'Plain Text',
  'plain': 'Plain Text',
}

// 代码高亮器实例
const highlighter = ref<Highlighter | null>(null)

// 当前选中的主题
const selectedTheme = ref('vitesse-dark')

// 初始化markdown解析器
const md = getMarkdown('hi', {
  markdownItOptions: {
    highlight: (str: string, lang: string) => {
      const _lang = lang.split(':')[0] || 'plaintext'

      if (!(_lang in languageMap)) {
        lang = 'plaintext'
      }

      if (highlighter.value) {
        return highlighter.value.codeToHtml(str, {
          lang: _lang,
          theme: selectedTheme.value,
        })
      }

      return str
    },
  },
})

// 自定义数学公式和代码块渲染规则
md.renderer.rules.math_inline = (tokens: any[], index: number) => {
  const rendered = katex.renderToString(tokens[index].content, {
    throwOnError: false,
    strict: 'ignore',
  })

  if (rendered) {
    return `<span class="math-inline">${rendered}</span>`
  }

  return `<span class="math-inline">${tokens[index].content}</span>`
}

md.renderer.rules.math_block = (tokens: any[], index: number) => {
  const rendered = katex.renderToString(tokens[index].content, {
    throwOnError: false,
    displayMode: true,
    strict: 'ignore',
  })

  if (rendered) {
    return `<div class="math-block my-4">${rendered}</div>`
  }

  return `<div class="math-block my-4">${tokens[index].content}</div>`
}

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx]

  const langInfo = token.info ? token.info.trim() : ''

  const lang = langInfo.split(':')[0] || 'plaintext'

  if (highlighter.value) {
    return highlighter.value.codeToHtml(token.content, {
      lang: defaultLanguages.includes(lang) ? lang : 'plaintext',
      theme: selectedTheme.value,
    })
  }

  return `<pre><code class="language-${lang}">${token.content}</code></pre>`
}

// 计算属性：将markdown内容转换为HTML
const html = computed(() => {
  if (!content.value) { return '' }

  return md.render(content.value)
})

// 主题列表
const themes = [
  'vitesse-dark',
  'vitesse-light',
  'github-dark',
  'github-light',
  'dracula',
  'nord',
  'one-dark-pro',
  'material-theme',

  // ... 其他主题
]

// 初始化高亮器
if (typeof window !== 'undefined') {
  watch(() => selectedTheme.value, async (newTheme) => {
    if (!highlighter.value) {
      highlighter.value = await registerHighlight({
        themes: themes as ThemeInput[],
      })
    }

    highlighter.value?.loadTheme(newTheme as ThemeInput)
  }, {
    immediate: true,
  })
}

// 格式化主题名称
function formatThemeName(themeName: string) {
  return themeName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// 自动滚动功能（简化版）
const messagesContainer = ref<HTMLElement | null>(null)

const autoScrollEnabled = ref(true)

// 监听内容变化，自动滚动到底部
watch(content, () => {
  if (!autoScrollEnabled.value || !messagesContainer.value) { return }

  nextTick(() => {
    const container = messagesContainer.value

    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      })
    }
  })
})

// 处理滚动事件，检测用户是否手动滚动
function handleContainerScroll() {
  if (!messagesContainer.value) { return }

  const container = messagesContainer.value

  const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight <= 50

  autoScrollEnabled.value = isAtBottom
}
</script>

<template>
  <div
    class="chatbot-container w-1/2 flex flex-col overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-2xl max-sm:w-full dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50"
  >
    <!-- 头部 -->
    <div
      class="chatbot-header border-b border-gray-200 from-blue-50 to-purple-50 bg-gradient-to-r px-6 py-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800"
    >
      <div
        class="flex items-center justify-between gap-3"
      >
        <div
          class="flex items-center gap-3"
        >
          <div
            class="h-10 w-10 flex items-center justify-center rounded-full from-blue-500 to-purple-600 bg-gradient-to-br shadow-lg"
          >
            <!-- 图标 -->
          </div>

          <div>
            <h1
              class="text-lg text-gray-800 font-semibold dark:text-gray-100"
            >
              {{ props.fileObj.name || 'vue-renderer-markdown' }}
            </h1>

            <p
              class="text-xs text-gray-500 dark:text-gray-400"
            >
              流式Markdown演示
            </p>
          </div>
        </div>

        <!-- 主题选择器 -->
        <div
          class="relative"
        >
          <select
            v-model="selectedTheme"
            class="cursor-pointer appearance-none border border-gray-200 rounded-lg bg-gray-50 px-3 py-2 pr-8 text-sm text-gray-900 font-medium transition-all duration-200 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-700/50 hover:bg-gray-100 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:hover:bg-gray-700"
            @change.stop
          >
            <option
              v-for="t in themes"
              :key="t"
              :value="t"
            >
              {{ formatThemeName(t) }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- 消息区域 -->
    <main
      ref="messagesContainer"
      class="chatbot-messages mb-4 mr-[1px] max-w-full flex-1 overflow-y-auto prose prose-sm"
      @scroll="handleContainerScroll"
    >
      <div
        class="p-6"
        v-html="html"
      />
    </main>
  </div>
</template>

<style scoped>
.chatbot-container {
  transition: all 0.3s ease;
  overscroll-behavior: contain;
  height: 100%;
  max-height: 100%;
}

.chatbot-messages {
  scroll-behavior: smooth;
  overscroll-behavior: contain;
}

.chatbot-messages::-webkit-scrollbar {
  width: 8px;
}

.chatbot-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.dark .chatbot-messages::-webkit-scrollbar-thumb {
  background: #475569;
}

.chatbot-messages::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark .chatatbot-messages::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

.prose {
  max-width: 100% !important;
}

:deep(.prose .markdown-renderer p) {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
