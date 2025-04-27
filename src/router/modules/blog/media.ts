const Media: RouterType.BlogRouteRecordRaw = {
  path: 'media',
  name: 'Media',
  meta: {
    title: '媒体',
    icon: 'blog-menu-media',
    order: 10,
  },

  children: [

    {
      path: 'wallpaper',
      name: 'Wallpaper',
      meta: {
        title: '壁纸',
        icon: 'blog-menu-wallpaper',
      },
      component: () => import('@/pages/blog/media/wallpaper/index.vue'),
    },
    {
      path: 'video',
      name: 'Video',
      meta: {
        title: '视频',
        icon: 'blog-menu-video',
      },
      component: () => import('@/pages/blog/media/video/index.vue'),
    },
    {
      path: 'voice',
      name: 'Voice',
      meta: {
        title: '语音',
        icon: 'blog-menu-voice',
      },
      component: () => import('@/pages/blog/media/voice/index.vue'),
    },
    {
      path: 'music',
      name: 'Music',
      meta: {
        title: '音乐',
        icon: 'blog-menu-music',
      },
      component: () => import('@/pages/blog/media/music/index.vue'),
    },
    {
      path: 'av',
      name: 'Av',
      meta: {
        title: '教育片',
        icon: 'blog-menu-av',
      },
      component: () => import('@/pages/blog/media/av/index.vue'),
    },
  ],
}

export default Media
