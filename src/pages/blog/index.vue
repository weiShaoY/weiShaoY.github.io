<!------  2025-11-10---16:44---星期一  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
const domain = window.location.hostname

console.log('%c Line:5 🍊 domain', 'color:#ffdd4d', domain)

const vitpressUrl = window._DEV__
  ? 'http://localhost:5173/blog/linux/commands.html'
  : `${domain}/blog/linux/commands.html`
</script>

<template>
  <iframe
    :src="vitpressUrl"
    class="mt-20 h-[100vh] w-[100vw] border-none"
  />
</template>

<style lang="scss" scoped>

</style>
