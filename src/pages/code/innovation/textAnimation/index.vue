<!------------------------------------  文字动效  ------------------------------------------------->
<script lang="ts" setup>
import Four from './components/four/index.vue'

import One from './components/one/index.vue'

import Three from './components/three/index.vue'

import Two from './components/two/index.vue'

const componentsList = [

  {
    key: 0,
    component: One,
  },

  {
    key: 1,
    component: Two,
  },

  {
    key: 2,
    component: Three,
  },

  {
    key: 3,
    component: Four,
  },
]
</script>

<template>
  <div
    class="grid grid-cols-2 h-full w-full bg-black"
  >
    <template
      v-for="item in componentsList"
      :key="item.key"
    >
      <component
        :is="item.component"
      />
    </template>
  </div>
</template>

<style lang="less" scoped>

</style>
