import type { AppRouteRecordRaw } from '@/router/types'

import { BLOG_DEFAULT_LAYOUT } from '@/router/layout'

const Innovation: AppRouteRecordRaw = {
  path: 'innovation',
  name: 'Innovation',
  redirect: {
    name: 'Clock',
  },
  component: BLOG_DEFAULT_LAYOUT,
  meta: {
    locale: '创意组件',
    icon: 'blog-menu-innovation',
    order: 10,
  },
  children: [
    {
      path: 'clock',
      name: 'Clock',
      component: () => import('@/pages/blog/innovation/clock/index.vue'),
      meta: {
        locale: '时钟',
        icon: 'blog-menu-clock',
      },
    },
    {
      path: 'muYu',
      name: 'MuYu',
      component: () => import('@/pages/blog/innovation/muYu/index.vue'),
      meta: {
        locale: '木鱼',
        icon: 'blog-menu-muYu',
      },
    },
    {
      path: 'calendar',
      name: 'Calendar',
      component: () => import('@/pages/blog/innovation/calendar/index.vue'),
      meta: {
        locale: '日历',
        icon: 'blog-menu-calendar',
      },
    },
    {
      path: 'screensaver',
      name: 'Screensaver',
      component: () => import('@/pages/blog/innovation/screensaver/index.vue'),
      meta: {
        locale: '屏保',
        icon: 'blog-menu-screensaver',
      },
    },

    {
      path: 'time',
      name: 'Time',
      component: () => import('@/pages/blog/innovation/time/index.vue'),
      meta: {
        locale: '时间',
        icon: 'blog-menu-time',
      },
    },
    {
      path: 'ripple',
      name: 'Ripple',
      component: () => import('@/pages/blog/innovation/ripple/index.vue'),
      meta: {
        locale: '水波',
        icon: 'blog-menu-ripple',
      },
    },
    {
      path: 'codeWall',
      name: 'CodeWall',
      component: () => import('@/pages/blog/innovation/codeWall/index.vue'),
      meta: {
        locale: '代码墙',
        icon: 'blog-menu-blogWall',
      },
    },
    {
      path: 'textAnimation',
      name: 'TextAnimation',
      component: () => import('@/pages/blog/innovation/textAnimation/index.vue'),
      meta: {
        locale: '文字动效',
        icon: 'blog-menu-textAnimation',
      },
    },
    {
      path: 'charge',
      name: 'Charge',
      component: () => import('@/pages/blog/innovation/charge/index.vue'),
      meta: {
        locale: '充电',
        icon: 'blog-menu-charge',
      },
    },
  ],
}

export default Innovation
