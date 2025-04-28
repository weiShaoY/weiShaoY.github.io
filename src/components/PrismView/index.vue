<!------  2025-04-28---23:42---星期一  ------>
<!------------------------------------  代码高亮  ------------------------------------------------->

<script setup lang="ts">

/**
 * @Description prismjs 预览 代码
 * @Author llj
 * @Date 2024-08-07 14:24:35
 */
import Prism from 'prismjs'

type PropType = {

  /**
   *  @Description 代码
   */
  codes: string

  /**
   *  @Description 语言
   */
  language?: string
}

withDefaults(defineProps<PropType>(), {
  language: 'html',
})

onMounted(() => {
  Prism.highlightAll()
})
onUpdated(() => {
  Prism.highlightAll()
})
</script>

<template>
  <pre
    v-if="language === 'js'"
  >
      <code
         class="language-html line-numbers"
      >
        {{ codes }}
      </code>
  </pre>

  <pre
    v-else
  >
    <code
        class="language-html line-numbers"
    >
       {{ codes }}
    </code>
  </pre>
</template>
