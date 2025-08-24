<script lang="ts" setup>

</script>

<template>
  <nav
    class="fixed left-0 right-0 top-0 z-100 h-20 flex justify-center bg-[#191919] bg-opacity-90 shadow-md"
  >
    <div
      class="container mx-5 flex items-center justify-between"
    >

      <div
        class="flex items-center"
      >
        <IconLogo />

        <TextLogo
          :size="120"
          color="white"
          url="/"
        />
      </div>

      <!-- 右边 -->
      <div
        class="flex items-center gap-5"
      >
        <Github />
      </div>
    </div>
  </nav>
</template>
