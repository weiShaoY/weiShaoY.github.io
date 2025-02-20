import type { AppRouteRecordRaw } from '@/router/types'

import { BLOG_DEFAULT_LAYOUT } from '@/layouts'

const SocialEngineering: AppRouteRecordRaw = {
  path: 'socialEngineering',
  name: 'SocialEngineering',
  meta: {
    locale: '社工',
    icon: 'blog-menu-socialEngineering',
    order: 11,
  },
  redirect: {
    name: 'LicensePlate',
  },
  component: BLOG_DEFAULT_LAYOUT,
  children: [
    {
      path: 'licensePlate',
      name: 'LicensePlate',
      meta: {
        locale: '车牌查询',
        icon: 'blog-menu-licensePlate',
      },
      component: import(
        '@/pages/blog/socialEngineering/licensePlate/index.vue'
      ),
    },
    {
      path: 'domain',
      name: 'Domain',
      meta: {
        locale: '域名查询',
        icon: 'blog-menu-domain',
      },
      component: import('@/pages/blog/socialEngineering/domain/index.vue'),
    },
    {
      path: 'loveSpeech',
      name: 'LoveSpeech',
      meta: {
        locale: '恋爱话术',
        icon: 'blog-menu-loveSpeech',
      },
      component: import('@/pages/blog/socialEngineering/loveSpeech/index.vue'),
    },
    {
      path: 'logistic',
      name: 'Logistic',
      meta: {
        locale: '物流查询',
        icon: 'blog-menu-logistic',
      },
      component: import('@/pages/blog/socialEngineering/logistic/index.vue'),
    },
    {
      path: 'account',
      name: 'Account',
      meta: {
        locale: '账号查询',
        icon: 'blog-menu-account',
      },
      component: import('@/pages/blog/socialEngineering/account/index.vue'),
    },
    {
      path: 'complain',
      name: 'Complain',
      meta: {
        locale: '投诉举报',
        icon: 'blog-menu-complain',
      },
      component: import('@/pages/blog/socialEngineering/complain/index.vue'),
    },
  ],
}

export default SocialEngineering
