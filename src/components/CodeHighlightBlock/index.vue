<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { twMerge } from 'tailwind-merge'

import { CodeBlock } from 'vuejs-code-block'

type Props = {

  /** 代码 */
  code: string

  /** 文件名 */
  fileName?: string

  /** 语言 */
  language?: 'DFS' | 'actionscript' | 'c' | 'clike' | 'coffee' | 'coffeescript' | 'cpp' | 'css' | 'extend' | 'flow' | 'go' | 'graphql' | 'html' | 'java' | 'javascript' | 'js' | 'json' | 'jsx' | 'kotlin' | 'kt' | 'kts' | 'markdown' | 'markup' | 'mathml' | 'md' | 'objc' | 'objectivec' | 'plain' | 'plaintext' | 'py' | 'python' | 'regex' | 'rust' | 'sql' | 'ssml' | 'svg' | 'swift' | 'text' | 'ts' | 'tsx' | 'txt' | 'typescript' | 'webmanifest' | 'xml' | 'yaml' | 'yml' | 'php' | 'SQL' | 'gherkin' | 'bash' | 'shell'

  /** 主题 */
  theme?: 'nightOwl' | 'dracula' | 'duotoneDark' | 'duotoneLight' | 'github' | 'oceanicNext' | 'prismCoy' | 'prismDark' | 'prismFunky' | 'prismOkaidia' | 'prismSolarizedLight' | 'prismTomorrow' | 'prismTwilight' | 'prism' | 'shadesOfPurple' | 'ultramin' | 'vsDark' | 'none'

  /** 宽 */
  width?: string | number

  /** 高 */
  height?: string | number

  /** 额外的 CSS 类名 */
  class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>
}

const props = withDefaults(defineProps<Props>(), {
  language: 'ts',
  theme: 'dracula',
  fileName: '', // 设置为默认空字符串，避免CodeBlock内部没有值默认显示 undefined
})

const computedStyle = computed<CSSProperties>(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))

const computedClass = computed(() => {
  return twMerge(props.class as string)
})

</script>

<template>
  <div
    :style="computedStyle"
  >
    <CodeBlock
      :code="code"
      :numbered="true"
      :show-header="!!fileName"
      :file-name="fileName"
      :language="props.language"
      :theme="props.theme"
      :class="computedClass"
    />
  </div>
</template>
