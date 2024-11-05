import type { AppRouteRecordRaw } from '@/router/types'

import { CODE_DEFAULT_LAYOUT } from '@/router/layout'

const Innovation: AppRouteRecordRaw = {
  path: 'innovation',
  name: 'Innovation',
  redirect: {
    name: 'Clock',
  },
  component: CODE_DEFAULT_LAYOUT,
  meta: {
    locale: '创意组件',
    icon: 'code-menu-innovation',
    order: 10,
  },
  children: [
    {
      path: 'clock',
      name: 'Clock',
      component: () => import('@/pages/code/innovation/clock/index.vue'),
      meta: {
        locale: '时钟',
        icon: 'code-menu-clock',
      },
    },
    {
      path: 'muYu',
      name: 'MuYu',
      component: () => import('@/pages/code/innovation/muYu/index.vue'),
      meta: {
        locale: '木鱼',
        icon: 'code-menu-muYu',
      },
    },
    {
      path: 'calendar',
      name: 'Calendar',
      component: () => import('@/pages/code/innovation/calendar/index.vue'),
      meta: {
        locale: '日历',
        icon: 'code-menu-calendar',
      },
    },
    {
      path: 'screensaver',
      name: 'Screensaver',
      component: () => import('@/pages/code/innovation/screensaver/index.vue'),
      meta: {
        locale: '屏保',
        icon: 'code-menu-screensaver',
      },
    },

    {
      path: 'time',
      name: 'Time',
      component: () => import('@/pages/code/innovation/time/index.vue'),
      meta: {
        locale: '时间',
        icon: 'code-menu-time',
      },
    },
    {
      path: 'ripple',
      name: 'Ripple',
      component: () => import('@/pages/code/innovation/ripple/index.vue'),
      meta: {
        locale: '水波',
        icon: 'code-menu-ripple',
      },
    },
    {
      path: 'codeWall',
      name: 'CodeWall',
      component: () => import('@/pages/code/innovation/codeWall/index.vue'),
      meta: {
        locale: '代码墙',
        icon: 'code-menu-codeWall',
      },
    },
    {
      path: 'textAnimation',
      name: 'TextAnimation',
      component: () => import('@/pages/code/innovation/textAnimation/index.vue'),
      meta: {
        locale: '文字动效',
        icon: 'code-menu-textAnimation',
      },
    },
  ],
}

export default Innovation
