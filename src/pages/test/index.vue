<!------  2025-04-24---13:23---星期四  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import VCodeBlock from '@wdns/vue-code-block'

import 'prismjs/plugins/line-numbers/prism-line-numbers.js'

import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import 'prismjs/themes/prism-coy.css'

const codes = `


<template>
  <div class="">

  </div>
</template>

<style lang="less" scoped>

</style>`
</script>

<template>
  <div
    class="h-full bg-red"
  >
    <div
      class="mx-auto h-100 w-100"
    >

      <VCodeBlock
        :code="codes"
        class="line-numbers"
        browser-window
        lang="html"
        prism-plugin
        prismjs
        theme="coy"
      />

    </div>

  </div>
</template>

<style lang="less" scoped>

</style>
