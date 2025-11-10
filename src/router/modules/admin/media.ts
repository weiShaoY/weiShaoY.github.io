const Media: RouterType.AdminRoute = {
  path: 'media',
  name: 'Media',
  meta: {
    title: '媒体',
    icon: 'admin-menu-media',
    order: 10,
  },

  children: [

    {
      path: 'wallpaper',
      name: 'Wallpaper',
      meta: {
        title: '壁纸',
        icon: 'admin-menu-wallpaper',
      },
      component: () => import('@/pages/admin/media/wallpaper/index.vue'),
    },
    {
      path: 'video',
      name: 'Video',
      meta: {
        title: '视频',
        icon: 'admin-menu-video',
      },
      component: () => import('@/pages/admin/media/video/index.vue'),
    },
    {
      path: 'voice',
      name: 'Voice',
      meta: {
        title: '语音',
        icon: 'admin-menu-voice',
      },
      component: () => import('@/pages/admin/media/voice/index.vue'),
    },
    {
      path: 'music',
      name: 'Music',
      meta: {
        title: '音乐',
        icon: 'admin-menu-music',
      },
      component: () => import('@/pages/admin/media/music/index.vue'),
    },
    {
      path: 'copywriting',
      name: 'Copywriting',
      meta: {
        title: '文案',
        icon: 'admin-menu-copywriting',
      },
      component: () => import('@/pages/admin/media/copywriting/index.vue'),
    },
    {
      path: 'videoAnalysis',
      name: 'VideoAnalysis',
      meta: {
        title: '影视解析',
        icon: 'admin-menu-videoAnalysis',
        iframeUrl: 'https://jx.xmflv.com/jx.html',
        fastMenuOrder: 5,
      },
    },
    {
      path: 'av',
      name: 'Av',
      meta: {
        title: '教育片',
        icon: 'admin-menu-av',
        fastMenuOrder: 0,

      },
      component: () => import('@/pages/admin/media/av/index.vue'),
    },
  ],
}

export default Media
