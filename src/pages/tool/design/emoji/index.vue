<script setup>
import emojiData from '@/assets/jsons/emoji.json'

const emojiList = ref(emojiData)

// 搜索词
const searchTerm = ref('')

// 格式化 shortcode 的函数
function formatShortcode(shortcode) {
  if (shortcode.length <= 2) {
    return shortcode
  }

  return shortcode.length > 21 ? `${shortcode.substring(0, 18)}...` : shortcode
}

// 过滤后的 Emoji
const filteredEmojis = computed(() => {
  const term = searchTerm.value.toLowerCase()

  return emojiList.value.filter(emoji => emoji.shortcode.toLowerCase().includes(term))
})

// 复制到剪贴板
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    window.$notification.success(`${text} 已复制到剪贴板!`)
  })
}

</script>

<template>
  <div
    class="container mx-auto px-4 py-8"
  >
    <!-- 搜索框 -->
    <div
      class="mx-auto mb-8 max-w-2xl"
    >
      <div
        class="relative"
      >
        <input
          id="searchInput"
          v-model="searchTerm"
          type="text"
          placeholder="搜索 emoji (按 shortcode)"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        >

        <div
          class="absolute right-3 top-3 text-gray-400"
        >
          <i
            class="fas fa-search"
          />
        </div>
      </div>
    </div>

    <!-- Emoji 网格 -->
    <div
      id="emojiGrid"
      class="grid grid-cols-2 gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xl:grid-cols-6"
    >
      <div
        v-for="emoji in filteredEmojis"
        :key="emoji.shortcode"
        class="emoji-card flex flex-col cursor-pointer items-center justify-center rounded-lg bg-white p-4 shadow-md transition-all hover:translate-y-[-2px] active:scale-98 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]"
        @click="copyToClipboard(emoji.unicode)"
      >
        <div
          class="mb-2 text-4xl"
        >
          {{ emoji.unicode }}
        </div>

        <div
          class="text-sm text-gray-600 font-mono"
        >
          :{{ formatShortcode(emoji.shortcode) }}:
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* 移除不必要的样式 */
</style>
