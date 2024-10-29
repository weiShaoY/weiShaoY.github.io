<template>
  <!-- <a-layout
    class="h-full w-full"
  >
    <RouterView />
  </a-layout> -->

  <a-config-provider
    global
  >
    <RouterView />

    <!-- 页面配置  -->
    <GlobalSetting />

  </a-config-provider>

</template>
