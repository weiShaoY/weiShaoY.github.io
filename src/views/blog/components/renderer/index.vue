<script setup lang="ts">
import type { Highlighter, ThemeInput } from 'shiki'

import katex from 'katex'

import { defaultLanguages, registerHighlight } from 'stream-markdown'

import { getMarkdown } from 'stream-markdown-parser'

import { isMobile } from '@/utils'

type PropsType = {

  /**
   *  文件
   */
  mdFile: BlogType.MdFile
}

const props = withDefaults(defineProps<PropsType>(), {

})

/**
 *  语言名称映射表，将代码文件扩展名映射为可读的语言名称
 */
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

/**
 *  响应式变量，存储流式输出的markdown内容
 */
const content = ref<string>('')

watch(() => props.mdFile.content, (newContent, _old, onInvalidate) => {
  // 用于终止上一个流
  let stopped = false

  content.value = '' // 重置内容

  const intervalId = setInterval(() => {
    // 若已被 watch 失效（新内容触发），就立即终止
    if (stopped) {
      clearInterval(intervalId)
      return
    }

    const cur = content.value.length

    if (cur >= newContent.length) {
      clearInterval(intervalId)
      return
    }

    content.value += newContent.charAt(cur)
  }, 16)

  // 用于外部终止当前流
  onInvalidate(() => {
    stopped = true
    clearInterval(intervalId)
  })
}, {
  immediate: true,
})

/**
 *  代码高亮器实例
 */
const highlighter = ref<Highlighter | null>(null)

/**
 *  当前选中的主题
 */
const selectedCodeTheme = ref('vitesse-dark')

/**
 *  初始化markdown解析器
 */
const md = getMarkdown('hi', {
  markdownItOptions: {
    // 代码高亮函数
    highlight: (str: string, lang: string) => {
      const _lang = lang.split(':')[0] || 'plaintext' // 提取语言类型，默认为纯文本

      if (!(_lang in languageMap)) { // 如果语言不在映射表中
        lang = 'plaintext' // 设为纯文本
      }

      if (highlighter.value) { // 如果高亮器已初始化
        return highlighter.value.codeToHtml(str, { // 返回高亮后的HTML
          lang: _lang,
          theme: selectedCodeTheme.value,
        })
      }

      return str // 否则返回原始字符串
    },
  },
})

// 自定义行内数学公式渲染规则
md.renderer.rules.math_inline = (tokens: any[], index: number) => {
  const rendered = katex.renderToString(tokens[index].content, { // 使用KaTeX渲染数学公式
    throwOnError: false, // 出错时不抛出异常
    strict: 'ignore', // 忽略严格模式错误
  })

  if (rendered) { // 如果渲染成功
    return `<span class="math-inline">${rendered}</span>` // 返回带样式的HTML
  }

  return `<span class="math-inline">${tokens[index].content}</span>` // 否则返回原始内容
}

// 自定义块级数学公式渲染规则
md.renderer.rules.math_block = (tokens: any[], index: number) => {
  const rendered = katex.renderToString(tokens[index].content, {
    throwOnError: false,
    displayMode: true, // 块级显示模式
    strict: 'ignore',
  })

  if (rendered) {
    return `<div class="math-block my-4">${rendered}</div>`
  }

  return `<div class="math-block my-4">${tokens[index].content}</div>`
}

// 自定义代码块渲染规则
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx] // 获取当前token

  const langInfo = token.info ? token.info.trim() : '' // 获取语言信息

  const lang = langInfo.split(':')[0] || 'plaintext' // 提取语言类型

  if (highlighter.value) { // 如果高亮器可用
    return highlighter.value.codeToHtml(token.content, { // 返回高亮后的代码HTML
      lang: defaultLanguages.includes(lang) ? lang : 'plaintext', // 检查是否为支持的语言
      theme: selectedCodeTheme.value,
    })
  }

  return `<pre><code class="language-${lang}">${token.content}</code></pre>` // 否则返回基础代码块
}

/**
 *  将markdown内容转换为HTML
 */
const html = computed(() => {
  if (!content.value) {
    return ''
  }

  return md.render(content.value)
})

/**
 *  主题切换功能
 */
const isDark = useDark() // 使用暗色主题

/**
 *  主题切换函数
 */
// const toggleTheme = useToggle(isDark)

// 监听暗色模式自动切换代码主题
watch(isDark, (dark) => {
  selectedCodeTheme.value = dark ? 'vitesse-dark' : 'vitesse-light'
})

/**
 * 处理暗色模式切换
 */
// function handleDarkModeToggle() {
//   toggleTheme()
// }

// 代码块主题选择器（单个下拉菜单）
const codeThemeList = [
  'andromeeda',
  'aurora-x',
  'ayu-dark',
  'catppuccin-frappe',
  'catppuccin-latte',
  'catppuccin-macchiato',
  'catppuccin-mocha',
  'dark-plus',
  'dracula',
  'dracula-soft',
  'everforest-dark',
  'everforest-light',
  'github-dark',
  'github-dark-default',
  'github-dark-dimmed',
  'github-dark-high-contrast',
  'github-light',
  'github-light-default',
  'github-light-high-contrast',
  'gruvbox-dark-hard',
  'gruvbox-dark-medium',
  'gruvbox-dark-soft',
  'gruvbox-light-hard',
  'gruvbox-light-medium',
  'gruvbox-light-soft',
  'houston',
  'kanagawa-dragon',
  'kanagawa-lotus',
  'kanagawa-wave',
  'laserwave',
  'light-plus',
  'material-theme',
  'material-theme-darker',
  'material-theme-lighter',
  'material-theme-ocean',
  'material-theme-palenight',
  'min-dark',
  'min-light',
  'monokai',
  'night-owl',
  'nord',
  'one-dark-pro',
  'one-light',
  'plastic',
  'poimandres',
  'red',
  'rose-pine',
  'rose-pine-dawn',
  'rose-pine-moon',
  'slack-dark',
  'slack-ochin',
  'snazzy-light',
  'solarized-dark',
  'solarized-light',
  'synthwave-84',
  'tokyo-night',
  'vesper',
  'vitesse-black',
  'vitesse-dark',
  'vitesse-light',
]

// 在客户端环境下监听主题变化
if (typeof window !== 'undefined') {
  watch(() => selectedCodeTheme.value, async (newThemes) => {
    if (!highlighter.value) { // 如果高亮器未初始化
      highlighter.value = await registerHighlight({ // 注册高亮器
        themes: codeThemeList as ThemeInput[],
      })
    }

    highlighter.value?.loadTheme(newThemes as ThemeInput) // 加载新主题
  }, {
    immediate: true, // 立即执行
  })
}

/**
 *  选中代码主题
 */
function handleSelectCodeTheme(codeTheme: string) {
  console.log('%c Line:787 🥃 type', 'color:#93c0a4', codeTheme)

  selectedCodeTheme.value = codeTheme
}

/**
 *  自动滚动到底部功能
 */
const messagesContainer = ref<HTMLElement | null>(null)

/**
 *  跟踪自动滚动是否启用
 */
const autoScrollEnabled = ref(true)

/**
 *  跟踪最后滚动位置以检测滚动方向
 */
const lastScrollTop = ref(0)

/**
 *  跟踪最后用户驱动的滚动方向：'none'（尚无用户滚动），'up' 或 'down'
 */
const lastUserScrollDirection = ref<'none' | 'up' | 'down'>('none')

/**
 *  最后用户滚动事件的时间戳（毫秒）
 */
const lastUserScrollTime = ref(0)

/**
 *  标记是否忽略由我们自己的程序化滚动引起的滚动事件
 */
const isProgrammaticScroll = ref(false)

/**
 *  最后已知的滚动高度
 */
let lastKnownScrollHeight = 0

/**
 *  检查用户是否在滚动区域的底部（基于像素的回退方法）
 */
function isAtBottom(element: HTMLElement, threshold = 50): boolean {
  return element.scrollHeight - element.scrollTop - element.clientHeight <= threshold
}

/**
 *  用于可靠底部检测的 IntersectionObserver 哨兵引用（在移动端效果更好）
 */
const bottomSentinel = ref<HTMLElement | null>(null)

let bottomObserver: IntersectionObserver | null = null

/**
 *  ResizeObserver 用于检测内容高度变化（用于异步渲染，如代码高亮、mermaid等）
 */
let contentResizeObserver: ResizeObserver | null = null

/**
 *  MutationObserver 用于检测DOM变化（如表加载 -> 内容）
 */
let contentMutationObserver: MutationObserver | null = null

/**
 *  设置底部观察器
 */
function setupBottomObserver() {
  if (!messagesContainer.value) { // 如果消息容器不存在
    return
  }

  // 如果已经在观察，先断开连接
  if (bottomObserver) {
    bottomObserver.disconnect()
    bottomObserver = null
  }

  // 创建一个观察器，监视位于内容后面的微小哨兵元素。
  // 当可见时，我们认为用户处于（或非常接近）底部，可以重新启用自动滚动。
  // 这种方法在移动端更可靠，因为滚动指标和visualViewport变化可能会有噪声。
  // 我们使用轻微的负底部rootMargin，这样哨兵在到达真正底部之前就会"相交"。
  // 这有助于在移动端处理布局/视口调整（键盘、visualViewport）可能延迟到达精确滚动底部的情况。
  const BOTTOM_OBSERVER_ROOT_MARGIN = '0px 0px -120px 0px' // 在底部前约120px处触发

  bottomObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) { // 如果哨兵元素进入视口
        // 仅当用户最近没有向上滚动时才重新启用自动滚动。
        // 这防止中断用户有意从底部滚开的行为。
        // 如果lastUserScrollDirection是'up'且是最近的，不要立即重新启用。
        const recentUser = Date.now() - lastUserScrollTime.value < 1000

        if (lastUserScrollDirection.value === 'up' && recentUser) {
          // 暂时保持自动滚动禁用
          return
        }

        autoScrollEnabled.value = true // 启用自动滚动
      }
    }
  }, {
    root: messagesContainer.value, // 观察的根元素
    rootMargin: BOTTOM_OBSERVER_ROOT_MARGIN, // 根元素的边距
    threshold: 0, // 阈值为0，表示只要相交就触发
  })

  // 如果哨兵存在则观察它。如果哨兵尚不存在，在微任务后重试（它将在nextTick渲染后出现）。
  nextTick(() => {
    if (bottomSentinel.value) {
      bottomObserver?.observe(bottomSentinel.value) // 开始观察哨兵元素
    }
  })
}

// 拆除底部观察器
function teardownBottomObserver() {
  if (bottomObserver) {
    bottomObserver.disconnect() // 断开观察器连接
    bottomObserver = null
  }
}

// 统一的函数，用于在需要时执行自动滚动到底部
let scrollCheckTimeoutId: number | null = null // 滚动检查超时ID

let lastScrollAttemptTime = 0 // 最后滚动尝试时间

function performAutoScrollIfNeeded() {
  if (!messagesContainer.value || !autoScrollEnabled.value) { // 如果容器不存在或自动滚动禁用
    return
  }

  const container = messagesContainer.value

  const shouldScroll = isAtBottom(container, 150) // 检查是否应该在底部

  if (shouldScroll) {
    const now = Date.now()

    const timeSinceLastScroll = now - lastScrollAttemptTime

    // 如果距离上次滚动超过50ms，立即滚动
    // 这确保了实时滚动，同时仍然批处理快速变化
    if (timeSinceLastScroll > 50) {
      executeScroll() // 执行滚动
      lastScrollAttemptTime = now
    }

    // 清除任何待处理的超时
    if (scrollCheckTimeoutId !== null) {
      clearTimeout(scrollCheckTimeoutId)
    }

    // 安排后续滚动以捕获在此调用之后渲染的任何内容
    scrollCheckTimeoutId = window.setTimeout(() => {
      executeScroll()
      scrollCheckTimeoutId = null
      lastScrollAttemptTime = Date.now()
    }, 50)
  }
}

/**
 *  执行滚动操作
 */
function executeScroll() {
  if (!messagesContainer.value) {
    return
  }

  try {
    isProgrammaticScroll.value = true // 标记为程序化滚动
    const targetScroll = messagesContainer.value.scrollHeight // 目标滚动位置为容器高度

    messagesContainer.value.scrollTo({ // 滚动到目标位置
      top: targetScroll,
      behavior: 'auto', // 自动滚动行为
    })

    // 等待滚动稳定，然后更新lastScrollTop
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (messagesContainer.value) {
          lastScrollTop.value = messagesContainer.value.scrollTop // 更新最后滚动位置
          lastKnownScrollHeight = messagesContainer.value.scrollHeight // 更新已知滚动高度
        }

        isProgrammaticScroll.value = false // 取消程序化滚动标记
      })
    })
  }
  catch {
    isProgrammaticScroll.value = false // 发生错误时取消标记
  }
}

/**
 *  设置ResizeObserver以检测内容高度变化
 */
function setupContentResizeObserver() {
  if (!messagesContainer.value) {
    return
  }

  // 断开现有的观察器（如果有）
  if (contentResizeObserver) {
    contentResizeObserver.disconnect()
    contentResizeObserver = null
  }

  // 跟踪最后已知的滚动高度以检测内容增长
  let lastContentHeight = messagesContainer.value.scrollHeight

  contentResizeObserver = new ResizeObserver(() => {
    if (!messagesContainer.value) {
      return
    }

    const currentHeight = messagesContainer.value.scrollHeight

    // 仅对高度增加做出反应（新内容渲染）
    if (currentHeight > lastContentHeight) {
      performAutoScrollIfNeeded() // 执行自动滚动检查
    }

    lastContentHeight = currentHeight // 更新最后内容高度
  })

  // 观察整个消息容器的尺寸变化
  contentResizeObserver.observe(messagesContainer.value)
}

/**
 *  设置MutationObserver以检测DOM变化（表格内容加载等）
 */
function setupContentMutationObserver() {
  if (!messagesContainer.value) {
    return
  }

  // 断开现有的观察器（如果有）
  if (contentMutationObserver) {
    contentMutationObserver.disconnect()
    contentMutationObserver = null
  }

  contentMutationObserver = new MutationObserver((mutations) => {
    // 检查是否有任何突变影响了内容
    let shouldCheck = false

    for (const mutation of mutations) {
      // 检查childList变化（添加/删除节点）
      if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
        shouldCheck = true
        break
      }

      // 检查可能影响布局的属性变化（class，style）
      if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
        shouldCheck = true
        break
      }
    }

    if (shouldCheck) {
      // 使用nextTick确保Vue已完成更新
      nextTick(() => {
        performAutoScrollIfNeeded() // 执行自动滚动检查
      })
    }
  })

  // 观察消息容器及其整个子树
  contentMutationObserver.observe(messagesContainer.value, {
    childList: true, // 观察子节点变化
    subtree: true, // 观察所有后代节点
    attributes: true, // 观察属性变化
    attributeFilter: ['class', 'style'], // 只观察class和style属性
  })
}

// 拆除内容ResizeObserver
function teardownContentResizeObserver() {
  if (contentResizeObserver) {
    contentResizeObserver.disconnect() // 断开连接
    contentResizeObserver = null
  }
}

// 拆除内容MutationObserver
function teardownContentMutationObserver() {
  if (contentMutationObserver) {
    contentMutationObserver.disconnect() // 断开连接
    contentMutationObserver = null
  }

  if (scrollCheckTimeoutId !== null) { // 清除滚动检查超时
    clearTimeout(scrollCheckTimeoutId)
    scrollCheckTimeoutId = null
  }
}

/**
 *  处理滚动事件以管理自动滚动行为
 */
function handleContainerScroll() {
  if (!messagesContainer.value) {
    return
  }

  // 忽略由我们程序化scrollTo调用发起的滚动事件
  if (isProgrammaticScroll.value) {
    return
  }

  const currentScrollTop = messagesContainer.value.scrollTop // 当前滚动位置

  const currentScrollHeight = messagesContainer.value.scrollHeight // 当前滚动高度

  // 如果scrollTop没有改变但我们被调用，可能是由于内容高度变化。
  // 在这种情况下，检查我们是否仍在底部，不要将其视为用户滚动。
  if (currentScrollTop === lastScrollTop.value) {
    // 内容高度改变但滚动位置保持不变
    // 不更新用户滚动方向或禁用自动滚动
    // 只检查我们是否仍在底部
    if (isAtBottom(messagesContainer.value)) {
      autoScrollEnabled.value = true // 如果在底部则启用自动滚动
    }

    lastKnownScrollHeight = currentScrollHeight // 更新已知滚动高度
    return
  }

  // 检查scrollTop减少是否由于内容高度收缩（而非用户滚动）
  // 当加载占位符被较小的实际内容替换时会发生这种情况
  if (currentScrollTop < lastScrollTop.value && currentScrollHeight < lastKnownScrollHeight) {
    // 内容收缩，导致scrollTop被动减少
    // 检查我们是否仍在底部或接近底部 - 如果是，不要禁用自动滚动
    if (isAtBottom(messagesContainer.value, 50)) {
      lastScrollTop.value = currentScrollTop // 更新最后滚动位置
      lastKnownScrollHeight = currentScrollHeight // 更新已知滚动高度
      return
    }
  }

  // 更新时间戳并确定方向
  lastUserScrollTime.value = Date.now()
  if (currentScrollTop < lastScrollTop.value) {
    // 用户向上滚动
    lastUserScrollDirection.value = 'up'
    autoScrollEnabled.value = false // 禁用自动滚动
  }
  else if (currentScrollTop > lastScrollTop.value) {
    // 用户向下滚动
    lastUserScrollDirection.value = 'down'

    // 如果接近底部，重新启用自动滚动
    if (isAtBottom(messagesContainer.value)) {
      autoScrollEnabled.value = true
    }
  }

  // 更新最后滚动位置以供将来比较
  lastScrollTop.value = currentScrollTop
  lastKnownScrollHeight = currentScrollHeight
}

/**
 *  跟踪触摸/指针起始位置以检测方向
 */
const touchStartY = ref<number | null>(null) // 触摸起始Y坐标

const pointerStartY = ref<number | null>(null) // 指针起始Y坐标

/**
 *  滚轮事件：仅当用户向上滚动时禁用自动滚动（deltaY < 0）
 */
function handleWheel(e: WheelEvent) {
  try {
    if (!messagesContainer.value) {
      return
    }

    // 将滚轮视为用户驱动的滚动；记录时间和方向
    lastUserScrollTime.value = Date.now()
    if (e.deltaY < 0) { // 向上滚动
      lastUserScrollDirection.value = 'up'
      autoScrollEnabled.value = false // 禁用自动滚动
    }
    else if (e.deltaY > 0) { // 向下滚动
      lastUserScrollDirection.value = 'down'
      if (isAtBottom(messagesContainer.value)) {
        autoScrollEnabled.value = true // 如果在底部则启用自动滚动
      }
    }
  }
  catch {
    // 忽略错误
  }
}

/**
 *  触摸处理程序：检测touchstart和touchmove之间的移动方向
 */
function handleTouchStart(e: TouchEvent) {
  if (e.touches && e.touches.length > 0) {
    touchStartY.value = e.touches[0].clientY // 记录起始触摸位置
  }
}

function handleTouchMove(e: TouchEvent) {
  if (!messagesContainer.value || touchStartY.value == null || !e.touches || e.touches.length === 0) {
    return
  }

  const currentY = e.touches[0].clientY // 当前触摸位置

  const delta = currentY - touchStartY.value // 计算移动距离

  // 正delta表示手指向下移动 -> 内容向上滚动（朝向顶部） -> 用户查看较早的内容
  lastUserScrollTime.value = Date.now()
  if (delta > 0) { // 向上滚动
    lastUserScrollDirection.value = 'up'
    autoScrollEnabled.value = false // 禁用自动滚动
  }
  else if (delta < 0) { // 向下滚动
    lastUserScrollDirection.value = 'down'
    if (isAtBottom(messagesContainer.value)) {
      autoScrollEnabled.value = true // 如果在底部则启用自动滚动
    }
  }
}

// 指针处理程序，用于滚动条拖动/基于指针的拖动
function handlePointerDown(e: PointerEvent) {
  pointerStartY.value = (e as PointerEvent).clientY // 记录指针起始位置

  // 附加move/up监听器到document以跟踪拖动
  const move = (ev: PointerEvent) => {
    if (pointerStartY.value == null) {
      return
    }

    const delta = ev.clientY - pointerStartY.value // 计算移动距离

    lastUserScrollTime.value = Date.now()
    if (delta > 0) { // 向上拖动
      lastUserScrollDirection.value = 'up'
      autoScrollEnabled.value = false // 禁用自动滚动
    }
    else if (delta < 0) { // 向下拖动
      lastUserScrollDirection.value = 'down'
      if (messagesContainer.value && isAtBottom(messagesContainer.value)) {
        autoScrollEnabled.value = true // 如果在底部则启用自动滚动
      }
    }
  }

  const up = () => {
    document.removeEventListener('pointermove', move) // 移除移动监听器
    document.removeEventListener('pointerup', up) // 移除抬起监听器
    pointerStartY.value = null // 重置指针起始位置
  }

  document.addEventListener('pointermove', move) // 添加移动监听器
  document.addEventListener('pointerup', up) // 添加抬起监听器
}

/**
 *  键盘交互：仅将向上导航视为禁用；向下导航在接近底部时可能重新启用
 */
function handleKeyDown(e: KeyboardEvent) {
  const upKeys = ['PageUp', 'ArrowUp', 'Home'] // 向上滚动键

  const downKeys = ['PageDown', 'ArrowDown', 'End', 'Space'] // 向下滚动键

  if (upKeys.includes(e.key)) { // 如果按下向上键
    autoScrollEnabled.value = false // 禁用自动滚动
  }
  else if (downKeys.includes(e.key)) { // 如果按下向下键
    if (messagesContainer.value && isAtBottom(messagesContainer.value)) {
      autoScrollEnabled.value = true // 如果在底部则启用自动滚动
    }
  }
}

// 组件挂载后初始化
onMounted(() => {
  // 初始化lastScrollTop并附加额外监听器
  if (messagesContainer.value) {
    lastScrollTop.value = messagesContainer.value.scrollTop // 设置初始滚动位置
    lastKnownScrollHeight = messagesContainer.value.scrollHeight // 设置初始滚动高度
    messagesContainer.value.addEventListener('wheel', handleWheel, { // 添加滚轮事件监听
      passive: true, // 被动事件监听器
    })
    messagesContainer.value.addEventListener('touchstart', handleTouchStart, {
      passive: true,
    })
    messagesContainer.value.addEventListener('touchmove', handleTouchMove, {
      passive: true,
    })
    messagesContainer.value.addEventListener('pointerdown', handlePointerDown) // 添加指针按下事件

    // keydown可以在document上监听
    document.addEventListener('keydown', handleKeyDown) // 添加键盘事件监听

    // 挂载后设置IntersectionObserver哨兵
    setupBottomObserver()

    // 设置ResizeObserver以检测内容高度变化
    setupContentResizeObserver()

    // 设置MutationObserver以检测DOM变化（表格加载 -> 内容）
    setupContentMutationObserver()
  }
})

// 组件卸载时清理
onUnmounted(() => {
  if (messagesContainer.value) {
    // 移除所有事件监听器
    messagesContainer.value.removeEventListener('wheel', handleWheel)
    messagesContainer.value.removeEventListener('touchstart', handleTouchStart)
    messagesContainer.value.removeEventListener('touchmove', handleTouchMove)
    messagesContainer.value.removeEventListener('pointerdown', handlePointerDown)
    document.removeEventListener('keydown', handleKeyDown)
    teardownBottomObserver() // 拆除底部观察器
    teardownContentResizeObserver() // 拆除内容尺寸观察器
    teardownContentMutationObserver() // 拆除内容变化观察器
  }
})

// 监听内容变化
watch(content, () => {
  // 仅当启用时自动滚动（用户没有从底部滚开）
  if (!autoScrollEnabled.value) {
    return
  }

  // 立即触发统一的自动滚动函数
  performAutoScrollIfNeeded()

  // 同时安排额外的检查以处理异步渲染
  // （如代码高亮、mermaid等）
  const retryDelays = [100, 200, 400, 800] // 重试延迟时间数组

  retryDelays.forEach((delay) => { // 为每个延迟安排检查
    setTimeout(() => {
      performAutoScrollIfNeeded()
    }, delay)
  })
})

</script>

<template>

  <!-- 聊天机器人风格的容器 -->
  <div
    class="chatbot-container flex flex-col flex-1 overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-2xl max-sm:w-full dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-900/50"
  >
    <!-- 头部 -->
    <div
      class="chatbot-header border-b border-gray-200 from-blue-50 to-purple-50 bg-gradient-to-r px-6 py-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800"
    >
      <div
        class="flex flex-wrap items-center justify-between gap-3"
      >
        <div
          class="flex items-center gap-3"
        >

          <div>
            <h1
              class="text-lg text-gray-800 font-semibold dark:text-gray-100"
            >
              {{ mdFile.label }}
            </h1>

            <p
              class="text-xs text-gray-500 dark:text-gray-400"
            >
              <!-- 副标题 -->
            </p>
          </div>
        </div>

        <!-- 右侧 -->
        <div
          class="flex items-center justify-between gap-10"
          :class="[
            isMobile ? 'w-full' : '',
          ]"
        >
          <el-dropdown
            placement="bottom-end"
            @command="handleSelectCodeTheme"
          >
            <span
              class="text-sm font-medium"
            >
              代码主题:    {{ selectedCodeTheme }}
            </span>

            <template
              #dropdown
            >
              <el-dropdown-menu
                class="h-70 overflow-auto"
              >
                <el-dropdown-item
                  v-for="item in codeThemeList"
                  :key="item"
                  :command="item"
                >

                  <SvgIcon
                    icon="selected"
                    :size="12"
                    class="mr-3"
                    :class="[
                      item !== selectedCodeTheme ? 'opacity-0' : '',
                    ]"
                  />

                  <span>
                    {{ item }}
                  </span>

                </el-dropdown-item>

              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <!-- 切换主题 -->
          <!-- <label
            class="relative inline-flex cursor-pointer items-center"
          >
            <input
              class="peer sr-only"
              type="checkbox"
              :checked="isDark"
              @change="handleDarkModeToggle"
            >

            <div
              class="h-10 w-20 rounded-full from-yellow-300 to-orange-400 bg-gradient-to-r transition-all duration-500 after:absolute after:left-1 after:top-1 after:h-8 after:w-8 after:flex after:items-center after:justify-center after:rounded-full after:bg-white peer-checked:from-blue-400 peer-checked:to-indigo-500 after:text-lg after:shadow-md after:transition-all after:duration-500 after:content-['☀️'] peer-checked:after:translate-x-10 peer-checked:after:content-['🌙']"
            />

          </label> -->

        </div>

      </div>
    </div>

    <!-- 带滚动的消息区域 -->
    <main
      ref="messagesContainer"
      class="chatbot-messages mb-4 mr-[1px] max-w-full flex-1 overflow-y-auto prose-sm text-theme-base"
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
</template>

<style scoped>

/* 外部高度 */
.chatbot-container {
  transition: all 0.3s ease;
  overscroll-behavior: contain;

  /* 外部高度 */
  /* height: calc(var(--app-viewport-vh, 1vh) * 100 - 2rem); */

  /* max-height: calc(var(--app-viewport-vh, 1vh) * 100 - 2rem); */

  /* height: 100%;
  max-height: 100%; */
  /* flex: 1; */

  font-family: 'firaCodeVf', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
