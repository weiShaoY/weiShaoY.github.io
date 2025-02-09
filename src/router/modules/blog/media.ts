import type { AppRouteRecordRaw } from '@/router/types'

import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const Media: AppRouteRecordRaw = {
  path: 'media',
  name: 'Media',
  meta: {
    locale: '媒体',
    icon: 'blog-menu-media',
    order: 10,
  },
  redirect: {
    name: 'Wallpaper',
  },
  component: BLOG_DEFAULT_LAYOUT,
  children: [

    {
      path: 'wallpaper',
      name: 'Wallpaper',
      meta: {
        locale: '壁纸',
        icon: 'blog-menu-wallpaper',
      },
      component: import('@/pages/blog/media/wallpaper/index.vue'),
    },
    {
      path: 'video',
      name: 'Video',
      meta: {
        locale: '视频',
        icon: 'blog-menu-video',
      },
      component: import('@/pages/blog/media/video/index.vue'),
    },
    {
      path: 'voice',
      name: 'Voice',
      meta: {
        locale: '语音',
        icon: 'blog-menu-voice',
      },
      component: import('@/pages/blog/media/voice/index.vue'),
    },
    {
      path: 'music',
      name: 'Music',
      meta: {
        locale: '音乐',
        icon: 'blog-menu-music',
      },
      component: import('@/pages/blog/media/music/index.vue'),
    },
  ],
}

export default Media
