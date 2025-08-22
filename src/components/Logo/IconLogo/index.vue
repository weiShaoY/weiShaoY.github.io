<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useRouter } from 'vue-router'

type PropsType = {

  /**
   *  大小
   */
  size?: number
}

const props = withDefaults(defineProps<PropsType>(), {
  size: 60,
})

const router = useRouter()

function handleClick() {
  router.push('/')
}
</script>

<template>
  <a
    class="hover:cursor-pointer"
    @click="handleClick"
  >
    <SvgIcon
      icon="logo"
      :size="props.size"
    />
  </a>
</template>

<style lang="less" scoped>

</style>
