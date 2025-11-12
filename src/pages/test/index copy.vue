<script setup lang="ts">

// 导入 Shiki 高亮相关类型
import type { Highlighter, ThemeInput } from 'shiki'

// 导入 KaTeX 数学公式渲染库
import katex from 'katex'

// 从 stream-markdown 导入默认语言和注册高亮的方法
import { defaultLanguages, registerHighlight } from 'stream-markdown'

// 导入 Markdown 解析器的方法
import { getMarkdown } from 'stream-markdown-parser'

// 导入 markdown 实时流式内容
import { streamContent } from './markdown'

// 代码语言和对应中文名映射表
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

// 用于展示流式内容的数据
const content = ref<string>('')

// 每隔 16 毫秒向 content 中追加一字符实现流式输出
useInterval(16, {
  callback() {
    const cur = content.value.length

    // 如果全部输出完毕，直接 return
    if (cur >= streamContent.length) {
      return
    }

    const nextChar = streamContent.charAt(cur)

    // 直接追加下一个字符
    content.value += nextChar
  },
})

// 代码高亮器实例
const highlighter = ref<Highlighter | null>(null)

// 当前选中的代码高亮主题（默认使用 vitesse-dark）
const selectedTheme = ref('vitesse-dark')

// 获取 markdown 解析实例，支持自定义 highlight
const md = getMarkdown('hi', {
  markdownItOptions: {
    highlight: (str: string, lang: string) => {
      // 仅取语言部分（处理 lang:xxx 结构）
      const _lang = lang.split(':')[0] || 'plaintext'

      // 判断映射表，没有则降级为 plain
      if (!(_lang in languageMap)) {
        lang = 'plaintext'
      }

      // 使用高亮器渲染
      if (highlighter.value) {
        return highlighter.value.codeToHtml(str, {
          lang: _lang,
          theme: selectedTheme.value,
        })
      }

      // 没有高亮器时直接返回原字符串
      return str
    },
  },
})

// 配置 markdown-it 的数学公式内联渲染
md.renderer.rules.math_inline = (tokens: any[], index: number) => {
  // 用 KaTeX 渲染，失败不抛错
  const rendered = katex.renderToString(tokens[index].content, {
    throwOnError: false,
    strict: 'ignore',
  })

  // 成功渲染返回 span
  if (rendered) {
    return `<span class="math-inline">${rendered}</span>`
  }

  // 渲染失败原样输出
  return `<span class="math-inline">${tokens[index].content}</span>`
}

// 配置 markdown-it 的数学公式块级渲染
md.renderer.rules.math_block = (tokens: any[], index: number) => {
  // 用 KaTeX 渲染 display 模式
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

// 配置 markdown-it 代码块渲染
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx]

  const langInfo = token.info ? token.info.trim() : ''

  const lang = langInfo.split(':')[0] || 'plaintext'

  // 使用高亮器高亮代码，否则用 pre/code
  if (highlighter.value) {
    return highlighter.value.codeToHtml(token.content, {
      lang: defaultLanguages.includes(lang) ? lang : 'plaintext',
      theme: selectedTheme.value,
    })
  }

  return `<pre><code class="language-${lang}">${token.content}</code></pre>`
}

// 渲染后的 HTML 内容
const html = computed(() => md.render(content.value))

// 黑暗模式开关
const isDark = useDark()

// 切换主题的方法
const toggleTheme = useToggle(isDark)

// 代码块主题列表
const themes = [
  // ...（省略，主题名列表，推荐保留原英文以避免歧义）
  'andromeeda',
  'aurora-x',

  // ... 其他主题 ...
  'vitesse-dark',
  'vitesse-light',
]

// watch 主题选中变化，动态加载高亮器和主题
if (typeof window !== 'undefined') {
  watch(() => selectedTheme.value, async (newThemes) => {
    // 首次加载时初始化高亮器实例
    if (!highlighter.value) {
      highlighter.value = await registerHighlight({
        themes: themes as ThemeInput[],
      })
    }

    // 动态加载选中主题
    highlighter.value?.loadTheme(newThemes as ThemeInput)
  }, {
    immediate: true,
  })
}

// 格式化主题名称显示（如 vitesse-dark -> Vitesse Dark）
function formatThemeName(themeName: string) {
  return themeName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// 设置面板的显示/隐藏状态
const showSettings = ref(false)

// 消息容器 DOM 元素
const messagesContainer = ref<HTMLElement | null>(null)

// 是否启用自动滚动到底部
const autoScrollEnabled = ref(true)

// 上一次滚动位置记录
const lastScrollTop = ref(0)

// 最后一次用户滚动方向
const lastUserScrollDirection = ref<'none' | 'up' | 'down'>('none')

// 记录用户最后滚动时间
const lastUserScrollTime = ref(0)

// 标记自动滚动期间避免触发 handleContainerScroll
const isProgrammaticScroll = ref(false)

let lastKnownScrollHeight = 0

// 判断用户视口是否已在底部，threshold 为容忍像素
function isAtBottom(element: HTMLElement, threshold = 50): boolean {
  return element.scrollHeight - element.scrollTop - element.clientHeight <= threshold
}

// 底部检测用 IntersectionObserver 哨兵 DOM ref
const bottomSentinel = ref<HTMLElement | null>(null)

let bottomObserver: IntersectionObserver | null = null

// 内容高度变化的 ResizeObserver
let contentResizeObserver: ResizeObserver | null = null

// DOM 变化的 MutationObserver
let contentMutationObserver: MutationObserver | null = null

// 创建底部观察器
function setupBottomObserver() {
  if (!messagesContainer.value) { return }

  if (bottomObserver) {
    bottomObserver.disconnect()
    bottomObserver = null
  }

  // 提前 120px 检测到底部
  const BOTTOM_OBSERVER_ROOT_MARGIN = '0px 0px -120px 0px'

  bottomObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // 如果最近没手动向上滚，不打断自动滚动
        const recentUser = Date.now() - lastUserScrollTime.value < 1000

        if (lastUserScrollDirection.value === 'up' && recentUser) {
          return
        }

        autoScrollEnabled.value = true
      }
    }
  }, {
    root: messagesContainer.value,
    rootMargin: BOTTOM_OBSERVER_ROOT_MARGIN,
    threshold: 0,
  })

  // 哨兵挂载后才监听
  nextTick(() => {
    if (bottomSentinel.value) {
      bottomObserver?.observe(bottomSentinel.value)
    }
  })
}

// 移除底部检测器
function teardownBottomObserver() {
  if (bottomObserver) {
    bottomObserver.disconnect()
    bottomObserver = null
  }
}

// 自动滚动到底部辅助方法
let scrollCheckTimeoutId: number | null = null

let lastScrollAttemptTime = 0

function performAutoScrollIfNeeded() {
  if (!messagesContainer.value || !autoScrollEnabled.value) {
    return
  }

  const container = messagesContainer.value

  const shouldScroll = isAtBottom(container, 150)

  if (shouldScroll) {
    const now = Date.now()

    const timeSinceLastScroll = now - lastScrollAttemptTime

    // 距离上次滚动超过 50ms 直接scroll
    if (timeSinceLastScroll > 50) {
      executeScroll()
      lastScrollAttemptTime = now
    }

    // 清理旧定时，准备下一次滚动
    if (scrollCheckTimeoutId !== null) {
      clearTimeout(scrollCheckTimeoutId)
    }

    scrollCheckTimeoutId = window.setTimeout(() => {
      executeScroll()
      scrollCheckTimeoutId = null
      lastScrollAttemptTime = Date.now()
    }, 50)
  }
}

// 真正执行 DOM 滚动
function executeScroll() {
  if (!messagesContainer.value) { return }

  try {
    isProgrammaticScroll.value = true
    const targetScroll = messagesContainer.value.scrollHeight

    messagesContainer.value.scrollTo({
      top: targetScroll,
      behavior: 'auto',
    })

    // 等待动画完成再重置 isProgrammaticScroll
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (messagesContainer.value) {
          lastScrollTop.value = messagesContainer.value.scrollTop
          lastKnownScrollHeight = messagesContainer.value.scrollHeight
        }

        isProgrammaticScroll.value = false
      })
    })
  }
  catch {
    isProgrammaticScroll.value = false
  }
}

// 设置内容高度变化监听
function setupContentResizeObserver() {
  if (!messagesContainer.value) { return }

  if (contentResizeObserver) {
    contentResizeObserver.disconnect()
    contentResizeObserver = null
  }

  let lastContentHeight = messagesContainer.value.scrollHeight

  contentResizeObserver = new ResizeObserver(() => {
    if (!messagesContainer.value) { return }

    const currentHeight = messagesContainer.value.scrollHeight

    // 内容变长才滚动
    if (currentHeight > lastContentHeight) {
      performAutoScrollIfNeeded()
    }

    lastContentHeight = currentHeight
  })

  contentResizeObserver.observe(messagesContainer.value)
}

// 监听 DOM 变动（表格、异步渲染等）
function setupContentMutationObserver() {
  if (!messagesContainer.value) { return }

  if (contentMutationObserver) {
    contentMutationObserver.disconnect()
    contentMutationObserver = null
  }

  contentMutationObserver = new MutationObserver((mutations) => {
    let shouldCheck = false

    for (const mutation of mutations) {
      if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
        shouldCheck = true
        break
      }

      if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
        shouldCheck = true
        break
      }
    }

    if (shouldCheck) {
      nextTick(() => {
        performAutoScrollIfNeeded()
      })
    }
  })

  contentMutationObserver.observe(messagesContainer.value, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style'],
  })
}

// 销毁 ResizeObserver
function teardownContentResizeObserver() {
  if (contentResizeObserver) {
    contentResizeObserver.disconnect()
    contentResizeObserver = null
  }
}

// 销毁 MutationObserver
function teardownContentMutationObserver() {
  if (contentMutationObserver) {
    contentMutationObserver.disconnect()
    contentMutationObserver = null
  }

  if (scrollCheckTimeoutId !== null) {
    clearTimeout(scrollCheckTimeoutId)
    scrollCheckTimeoutId = null
  }
}

// 滚动事件—管理自动滚动逻辑
function handleContainerScroll() {
  if (!messagesContainer.value) { return }

  // 编程滚动不响应
  if (isProgrammaticScroll.value) { return }

  const currentScrollTop = messagesContainer.value.scrollTop

  const currentScrollHeight = messagesContainer.value.scrollHeight

  // 如 scrollTop 没变，检测由内容变化导致的滚动，判断是否保持到底部
  if (currentScrollTop === lastScrollTop.value) {
    if (isAtBottom(messagesContainer.value)) {
      autoScrollEnabled.value = true
    }

    lastKnownScrollHeight = currentScrollHeight
    return
  }

  // 如高度变低导致 passively 向上滚动，只要在底部不禁用自动滚动
  if (currentScrollTop < lastScrollTop.value && currentScrollHeight < lastKnownScrollHeight) {
    if (isAtBottom(messagesContainer.value, 50)) {
      lastScrollTop.value = currentScrollTop
      lastKnownScrollHeight = currentScrollHeight
      return
    }
  }

  // 记录用户操作时间与滚动方向
  lastUserScrollTime.value = Date.now()
  if (currentScrollTop < lastScrollTop.value) {
    lastUserScrollDirection.value = 'up'
    autoScrollEnabled.value = false
  }
  else if (currentScrollTop > lastScrollTop.value) {
    lastUserScrollDirection.value = 'down'
    if (isAtBottom(messagesContainer.value)) { autoScrollEnabled.value = true }
  }

  lastScrollTop.value = currentScrollTop
  lastKnownScrollHeight = currentScrollHeight
}

// 记录触摸/指针的起始位置用于识别滚动方向
const touchStartY = ref<number | null>(null)

const pointerStartY = ref<number | null>(null)

// wheel 鼠标滚轮，仅向上滚动禁用 autoScroll
function handleWheel(e: WheelEvent) {
  try {
    if (!messagesContainer.value) { return }

    lastUserScrollTime.value = Date.now()
    if (e.deltaY < 0) {
      lastUserScrollDirection.value = 'up'
      autoScrollEnabled.value = false
    }
    else if (e.deltaY > 0) {
      lastUserScrollDirection.value = 'down'
      if (isAtBottom(messagesContainer.value)) {
        autoScrollEnabled.value = true
      }
    }
  }
  catch {
    // 忽略错误
  }
}

// 触摸事件—开始
function handleTouchStart(e: TouchEvent) {
  if (e.touches && e.touches.length > 0) {
    touchStartY.value = e.touches[0].clientY
  }
}

// 触摸事件—滑动，判断方向
function handleTouchMove(e: TouchEvent) {
  if (!messagesContainer.value || touchStartY.value == null || !e.touches || e.touches.length === 0) { return }

  const currentY = e.touches[0].clientY

  const delta = currentY - touchStartY.value

  lastUserScrollTime.value = Date.now()
  if (delta > 0) {
    lastUserScrollDirection.value = 'up'
    autoScrollEnabled.value = false
  }
  else if (delta < 0) {
    lastUserScrollDirection.value = 'down'
    if (isAtBottom(messagesContainer.value)) {
      autoScrollEnabled.value = true
    }
  }
}

// 指针事件（拖动滚动条）
function handlePointerDown(e: PointerEvent) {
  pointerStartY.value = (e as PointerEvent).clientY

  // 监听拖动
  const move = (ev: PointerEvent) => {
    if (pointerStartY.value == null) { return }

    const delta = ev.clientY - pointerStartY.value

    lastUserScrollTime.value = Date.now()
    if (delta > 0) {
      lastUserScrollDirection.value = 'up'
      autoScrollEnabled.value = false
    }
    else if (delta < 0) {
      lastUserScrollDirection.value = 'down'
      if (messagesContainer.value && isAtBottom(messagesContainer.value)) {
        autoScrollEnabled.value = true
      }
    }
  }

  // 拖动结束解绑事件
  const up = () => {
    document.removeEventListener('pointermove', move)
    document.removeEventListener('pointerup', up)
    pointerStartY.value = null
  }

  document.addEventListener('pointermove', move)
  document.addEventListener('pointerup', up)
}

// 键盘上下翻页操作，仅向上禁用自动滚动
function handleKeyDown(e: KeyboardEvent) {
  const upKeys = ['PageUp', 'ArrowUp', 'Home']

  const downKeys = ['PageDown', 'ArrowDown', 'End', 'Space']

  if (upKeys.includes(e.key)) {
    autoScrollEnabled.value = false
  }
  else if (downKeys.includes(e.key)) {
    if (messagesContainer.value && isAtBottom(messagesContainer.value)) {
      autoScrollEnabled.value = true
    }
  }
}

// 组件挂载时设置所有监听和 observer
onMounted(() => {
  if (messagesContainer.value) {
    lastScrollTop.value = messagesContainer.value.scrollTop
    lastKnownScrollHeight = messagesContainer.value.scrollHeight
    messagesContainer.value.addEventListener('wheel', handleWheel, {
      passive: true,
    })
    messagesContainer.value.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    })
    messagesContainer.value.addEventListener('touchmove', handleTouchMove, {
      passive: true,
    })
    messagesContainer.value.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    setupBottomObserver()
    setupContentResizeObserver()
    setupContentMutationObserver()
  }
})

// 组件卸载时移除所有监听和 observer
onUnmounted(() => {
  if (messagesContainer.value) {
    messagesContainer.value.removeEventListener('wheel', handleWheel)
    messagesContainer.value.removeEventListener('touchstart', handleTouchStart)
    messagesContainer.value.removeEventListener('touchmove', handleTouchMove)
    messagesContainer.value.removeEventListener('pointerdown', handlePointerDown)
    document.removeEventListener('keydown', handleKeyDown)
    teardownBottomObserver()
    teardownContentResizeObserver()
    teardownContentMutationObserver()
  }
})

// 监听内容变化，根据自动滚动状态触发滚动
watch(content, () => {
  // 用户已手动滚动时不再自动滚动
  if (!autoScrollEnabled.value) { return }

  // 立即尝试滚到底部
  performAutoScrollIfNeeded()

  // 异步渲染场景下多次重试确保滚动生效
  const retryDelays = [100, 200, 400, 800]

  retryDelays.forEach((delay) => {
    setTimeout(() => {
      performAutoScrollIfNeeded()
    }, delay)
  })
})
</script>

<template>
  <div
    class="app-container h-full flex items-center justify-center bg-gray-50 p-4 dark:bg-gray-900"
  >
    <!-- 设置按钮和面板 -->
    <div
      class="fixed right-4 top-4 z-10"
    >
      <!-- 设置按钮 -->
      <button
        class="settings-toggle h-10 w-10 flex items-center justify-center border border-gray-200/50 rounded-full bg-white/95 shadow-lg backdrop-blur-md transition-all duration-200 dark:border-gray-700/50 dark:bg-gray-800/95 hover:bg-gray-50 dark:shadow-gray-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:hover:bg-gray-700/50"
        :class="{ 'ring-2 ring-blue-500/50': showSettings }"
        @click="showSettings = !showSettings"
      >
        <Icon
          icon="carbon:settings"
          class="h-5 w-5 text-gray-600 transition-transform duration-200 dark:text-gray-400"
          :class="{ 'rotate-90': showSettings }"
        />
      </button>

      <!-- 设置面板 -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 scale-95 translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-2"
      >
        <div
          v-if="showSettings"
          class="absolute right-0 top-12 mt-2 min-w-[220px] origin-top-right border border-gray-200/50 rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur-md space-y-4 dark:border-gray-700/50 dark:bg-gray-800/95 dark:shadow-gray-900/30"
          @click.stop
        >
          <!-- 主题选择器 -->
          <div
            class="space-y-2"
          >
            <label
              class="block text-xs text-gray-600 font-semibold tracking-wide uppercase dark:text-gray-400"
            >
              代码主题
            </label>

            <div
              class="relative"
            >
              <select
                v-model="selectedTheme"
                class="w-full cursor-pointer appearance-none border border-gray-200 rounded-lg bg-gray-50 px-3 py-2 pr-8 text-sm text-gray-900 font-medium transition-all duration-200 dark:border-gray-600 focus:border-blue-500 dark:bg-gray-700/50 hover:bg-gray-100 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:hover:bg-gray-700"
                aria-label="Code block theme"
                @click.stop
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

              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon
                  icon="carbon:chevron-down"
                  class="h-4 w-4 text-gray-400 dark:text-gray-500"
                />
              </div>
            </div>
          </div>

          <!-- 分割线 -->
          <div
            class="border-t border-gray-200 dark:border-gray-700"
          />

          <!-- 主题切换 -->
          <div
            class="flex items-center justify-between"
          >
            <label
              class="text-xs text-gray-600 font-semibold tracking-wide uppercase dark:text-gray-400"
            >
              深色模式
            </label>

            <button
              class="relative h-6 w-12 rounded-full transition-all duration-200 ease-out active:scale-95 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              :style="{
                backgroundColor: isDark ? '#3b82f6' : '#e5e7eb',
                transition: 'background-color 0.35s ease-out, box-shadow 0.2s ease, transform 0.1s ease',
              }"
              @click.stop="toggleTheme()"
            >
              <!-- 滑动圆点 -->
              <div
                class="absolute top-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg"
                :style="{
                  left: isDark ? '26px' : '2px',
                  transform: `scale(${isDark ? 1.02 : 1})`,
                  transition: 'left 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.2s ease-out, box-shadow 0.2s ease',
                }"
              >
                <!-- 图标根据状态显示 -->
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  leave-active-class="transition-all duration-200 ease-in"
                  enter-from-class="opacity-0 scale-0 rotate-90"
                  enter-to-class="opacity-100 scale-100 rotate-0"
                  leave-from-class="opacity-100 scale-100 rotate-0"
                  leave-to-class="opacity-0 scale-0 rotate-90"
                  mode="out-in"
                >
                  <Icon
                    v-if="isDark"
                    key="moon"
                    icon="carbon:moon"
                    class="h-3 w-3 text-blue-600 drop-shadow-sm"
                  />

                  <Icon
                    v-else
                    key="sun"
                    icon="carbon:sun"
                    class="h-3 w-3 text-yellow-500 drop-shadow-sm"
                  />
                </Transition>
              </div>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Chatbot-style container -->
    <div
      class="chatbot-container max-w-5xl w-full flex flex-col overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50"
    >
      <!-- Header -->
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
              <Icon
                icon="carbon:chat"
                class="h-5 w-5 text-white"
              />
            </div>

            <div>
              <h1
                class="text-lg text-gray-800 font-semibold dark:text-gray-100"
              >
                vue-renderer-markdown
              </h1>

              <p
                class="text-xs text-gray-500 dark:text-gray-400"
              >
                流媒体降价演示
              </p>
            </div>
          </div>

          <!-- GitHub Star Button -->
          <a
            href="https://github.com/Simon-He95/vue-markdown-render"
            target="_blank"
            rel="noopener noreferrer"
            class="github-star-btn flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 text-sm text-white font-medium shadow-md transition-all duration-200 dark:bg-gray-700 hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:hover:bg-gray-600"
          >
            <Icon
              icon="carbon:star"
              class="h-4 w-4"
            />

            <span>Star</span>
          </a>
        </div>
      </div>

      <!-- Messages area with scroll -->
      <main
        ref="messagesContainer"
        class="chatbot-messages mb-4 mr-[1px] max-w-full flex-1 overflow-y-auto prose prose-sm"
        @scroll="handleContainerScroll"
      >
        <div
          class="p-6"
          v-html="html"
        />
        <!-- Sentinel observed by IntersectionObserver to detect reaching bottom reliably on mobile -->
        <div
          ref="bottomSentinel"
          aria-hidden="true"
          class="pointer-events-none h-1 w-full"
        />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  transition: background-color 0.3s ease;
  overflow: hidden;
}

.chatbot-container {
  transition: all 0.3s ease;
  overscroll-behavior: contain;
  height: calc(var(--app-viewport-vh, 1vh) * 100 - 2rem);
  max-height: calc(var(--app-viewport-vh, 1vh) * 100 - 2rem);
}

.github-star-btn:active {
  transform: scale(0.95);
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

.dark .chatbot-messages::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

.settings-toggle {
  backdrop-filter: blur(8px);
}

.settings-toggle:active {
  transform: scale(0.95);
}

/* 主题选择器自定义样式 */
.theme-selector select:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.theme-selector select option {
  padding: 8px 12px;
  background-color: white;
  color: #374151;
}

.dark .theme-selector select option {
  background-color: #1f2937;
  color: #f3f4f6;
}

/* 设置面板动画 */
.settings-panel {
  transform-origin: top right;
}

/* 代码块加载时的流光闪烁效果 */
:deep(.code-block-container.is-rendering) {
  position: relative;
  animation: renderingGlow 2s ease-in-out infinite;
}

@keyframes renderingGlow {
  0% {
    box-shadow:
      0 0 10px rgba(59, 130, 246, 0.4),
      0 0 20px rgba(59, 130, 246, 0.2);
  }
  25% {
    box-shadow:
      0 0 15px rgba(139, 92, 246, 0.5),
      0 0 30px rgba(139, 92, 246, 0.3);
  }
  50% {
    box-shadow:
      0 0 20px rgba(236, 72, 153, 0.5),
      0 0 40px rgba(236, 72, 153, 0.3);
  }
  75% {
    box-shadow:
      0 0 15px rgba(16, 185, 129, 0.5),
      0 0 30px rgba(16, 185, 129, 0.3);
  }
  100% {
    box-shadow:
      0 0 10px rgba(59, 130, 246, 0.4),
      0 0 20px rgba(59, 130, 246, 0.2);
  }
}

/* Mermaid 块加载时的流光闪烁效果 */
:deep(.is-rendering) {
  position: relative;
  animation: renderingGlow 2s ease-in-out infinite;
}
:deep(.prose .markdown-renderer p) {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.prose {
  max-width: 100% !important;
}
</style>
