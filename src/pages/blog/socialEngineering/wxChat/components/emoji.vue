<script lang="ts" setup>
import { emojiBase64 } from '@/utils'

import { emojiList } from '../data'

const emit = defineEmits<{
  (e: 'add', emoji: string): void
}>()

function handleEmojiClick(emoji: string) {
  emit('add', emoji)
}
</script>

<template>
  <div
    class=" mt-3 flex flex-wrap pl-2"
  >
    <a
      v-for="(emoji, index) in emojiList"
      :key="index"
      :title="emoji"
      class="m-1 block h-6 w-6 hover:cursor-pointer"
      @click="handleEmojiClick(emoji)"
    >
      <img
        :src="`data:image/png;base64,${emojiBase64[emoji as keyof typeof emojiBase64]}`"
        alt=""
        class="h-full w-full"
      >

      <p
        class="indent-[-9999px] color-red"
      >
      {{ emoji }}
      </p>
    </a>
  </div>
</template>

<style lang="scss" scoped>

</style>
