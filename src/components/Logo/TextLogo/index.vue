<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useRouter } from 'vue-router'

type LogoPropsType = {

  /**
   *  颜色
   *  @default white
   */
  color?: string

  /**
   *  大小
   *  @default 120
   */
  size?: number

  /**
   *  跳转路径
   *  @default /
   */
  url?: string
}

const props = withDefaults(defineProps<LogoPropsType>(), {
  color: 'white',
  size: 120,
  url: '/',
})

const router = useRouter()

function handleClick() {
  router.push(props.url)
}
</script>

<template>
  <a
    class="flex items-center gap-2 hover:cursor-pointer"
    @click="handleClick"
  >

    <SvgIcon
      icon="weiShaoY"
      :size="props.size"
      :style="{
        color: props.color,
      }"
    />

  </a>
</template>

<style lang="less" scoped>

</style>
