<!-- 快速入口 -->

<script setup lang="ts">
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const popoverRef = ref()

type Application = {
  name: string
  description: string
  icon: string
  path: string
}

type QuickLink = {
  name: string
  path: string
}

const applications: Application[] = [
  {
    name: '工作台',
    description: '系统概览与数据统计',
    icon: 'blog-menu-workbench',
    path: '/blog/workbench',
  },
  {
    name: 'ArcoDesign',
    description: '数据分析与可视化',
    icon: 'blog-menu-arcoDesign',
    path: '/blog/document/ui/arcoDesign',
  },
  {
    name: '代码格式化',
    description: '动画特效展示',
    icon: 'blog-menu-format',
    path: '/blog/dev/format',
  },
  {
    name: 'Npm可视化',
    description: '即时通讯功能',
    icon: 'blog-menu-npm',
    path: '/blog/dev/npm',
  },
  {
    name: '壁纸',
    description: '使用指南与开发文档',
    icon: 'blog-menu-wallpaper',
    path: '/blog/media/wallpaper',
  },
  {
    name: '视频',
    description: '技术支持与问题反馈',
    icon: 'blog-menu-video',
    path: '/blog/media/video',
  },
  {
    name: '语音',
    description: '版本更新与变更记录',
    icon: 'blog-menu-voice',
    path: '/blog/media/voice',
  },
  {
    name: '影视',
    description: '技术分享与交流',
    icon: 'blog-menu-movie',
    path: '/blog/news/movie',
  },
]

const quickLinks: QuickLink[] = [
  {
    name: '登录',
    path: '/blog/news/movie',
  },
  {
    name: '注册',
    path: '/blog/news/movie',
  },
  {
    name: '忘记密码',
    path: '/blog/news/movie',
  },
  {
    name: '定价',
    path: '/blog/news/movie',
  },
  {
    name: '个人中心',
    path: '/blog/news/movie',
  },
  {
    name: '留言管理',
    path: '/blog/news/movie',
  },
]

function handleAppClick(path: string) {
  if (path.startsWith('http')) {
    window.open(path, '_blank')
  }
  else {
    router.push(path)
  }

  popoverRef.value?.hide()
}
</script>

<template>
  <el-popover
    ref="popoverRef"
    :width="700"
    popper-class="fast-enter-popover"
    :show-arrow="false"
    placement="bottom-start"
    :offset="0"
    popper-style="border: 1px solid var(--art-border-dashed-color); border-radius: 10px); "
  >
    <template
      #reference
    >
      <ButtonIcon
        class="fast-enter-trigger"
        icon="blog-topBar-fast"
      />
    </template>

    <div
      class="fast-enter grid grid-cols-[2fr_0.8fr]"
    >
      <div
        class="apps-section"
      >
        <div
          class="apps-grid grid grid-cols-2 gap-1"
        >
          <!-- 左侧应用列表 -->
          <div
            v-for="app in applications"
            :key="app.name"
            class="app-item mr-3 flex cursor-pointer items-center gap-3 rounded-2 px-3 py-2 hover:bg-[rgba(241,241,244,0.7)]"
            @click="handleAppClick(app.path)"
          >
            <div
              class="h-12 w-12 flex items-center justify-center rounded-2 bg-[rgba(241,241,244,0.7)]"
            >
              <SvgIcon
                :icon="app.icon"
                :size="26"
                class="rounded-2"
              />
            </div>

            <div
              class=""
            >
              <h3
                class="m-0 color-[#252f4a] font-bold"
              >
                {{ app.name }}
              </h3>

              <p
                class="mt-1 text-3 color-[#99a1b7]"
              >
                {{ app.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="quick-links border-l-[1px] border-l-[#ebeef5] border-solid pl-6 pt-2"
      >
        <h3
          class="m-0 mb-2.5 text-base text-[#b5b7c8] font-medium"
        >
          标题
        </h3>

        <ul>
          <li
            v-for="link in quickLinks"
            :key="link.name"
            class="cursor-pointer py-2 hover:[&>span]:text-primary"
            @click="handleAppClick(link.path)"
          >
            <span>{{ link.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </el-popover>
</template>
