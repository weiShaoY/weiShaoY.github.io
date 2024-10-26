<!------------------------------------  技术栈图标组件  ------------------------------------------------->
<script lang="ts" setup>

/**
 *  技术栈数据数组
 */
const techStack = [
  {
    name: 'html',
    size: 50,
    color: '#FC490B',
    url: 'https://www.w3school.com.cn/',
  },
  {
    name: 'css',
    size: 50,
    color: '#1872B6',
    url: 'https://www.w3schools.com/css/',
  },
  {
    name: 'javaScript',
    size: 50,
    color: '#F0DB4F',
    url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
  },
  {
    name: 'typeScript',
    size: 50,
    color: '#0076C6',
    url: 'https://www.typescriptlang.org/',
  },
  {
    name: 'vue',
    size: 50,
    color: '#41B883',
    url: 'https://cn.vuejs.org/',
  },
  {
    name: 'react',
    size: 50,
    color: '#61DBFB',
    url: 'https://reactjs.org/',
  },
  {
    name: 'tailwindCss',
    size: 50,
    color: '#17BAB9',
    url: 'https://tailwindcss.com/',
  },
  {
    name: 'unoCss',
    size: 50,
    color: '#636363',
    url: 'https://unocss.dev/',
  },
]

/**
 *  用于存储当前悬浮的图标名称
 */
const currentHoverName = ref<string>('')

function handleMouseOver(name: string) {
  currentHoverName.value = name
}

function handleMouseLeave() {
  currentHoverName.value = ''
}
</script>

<template>
  <div
    class="flex flex-wrap content-center gap-7"
  >
    <a
      v-for="tech in techStack"
      :key="tech.name"
      :href="tech.url"
      target="_blank"
      @mouseover="handleMouseOver(tech.name)"
      @mouseleave="handleMouseLeave"
    >
      <SvgIcon
        :name="`technology-${tech.name}`"
        :size="tech.size"
        :style="{ color: currentHoverName === tech.name ? tech.color : '' }"
      />
    </a>
  </div>
</template>

<style lang="less" scoped></style>
