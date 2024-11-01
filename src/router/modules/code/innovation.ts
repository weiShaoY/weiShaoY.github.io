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
      component: () => import('~/pages/code/innovation/muYu/index.vue'),
      meta: {
        locale: '木鱼',
        icon: 'code-menu-muYu',
      },
    },
    {
      path: 'calendar',
      name: 'Calendar',
      component: () => import('~/pages/code/innovation/calendar/index.vue'),
      meta: {
        locale: '日历',
        icon: 'code-menu-calendar',
      },
    },
  ],
}

export default Innovation
