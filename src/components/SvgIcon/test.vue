<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const icon = ref()

async function getPath() {
  const path = `你的本地路径`

  const { default: svg } = await import(`${path}?raw`)

  icon.value = svg
}

getPath()

const iconStyle = ref({})
</script>

<template>
  <i
    v-if="icon"
    :style="iconStyle"
    v-html="icon"
  />

  <SvgIcon
    name="javaScript"
  />
</template>

<style lang="less" scoped>

</style>
