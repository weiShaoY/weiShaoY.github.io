import type { AppRouteRecordRaw } from '@/router/types'

import {
  BLOG_DEFAULT_LAYOUT,
  BLOG_EXTERNAL_LAYOUT,
  BLOG_IFRAME_LAYOUT,
} from '@/layouts'

const News: AppRouteRecordRaw = {
  path: 'news',
  name: 'News',
  meta: {
    locale: '资讯',
    icon: 'blog-menu-news',
    order: 10,
  },
  redirect: {
    name: 'DailyHotTopics',
  },
  component: BLOG_DEFAULT_LAYOUT,
  children: [

    {
      path: 'dailyHotTopics',
      name: 'DailyHotTopics',
      meta: {
        locale: '每日热点',
        icon: 'blog-menu-dailyHotTopics',
        iframeUrl: 'https://today.lieme.cn/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },

    // {
    //   path: 'image',
    //   name: 'Image',
    //   meta: {
    //     locale: '代码转图片',
    //     icon: 'blog-menu-image',
    //     externalUrl: 'https://carbon.now.sh/',
    //   },
    //   component: BLOG_EXTERNAL_LAYOUT,
    // },
    // {
    //   path: 'npm',
    //   name: 'Npm',
    //   meta: {
    //     locale: 'Npm可视化',
    //     icon: 'blog-menu-npm',
    //     iframeUrl: 'https://pkg-graph.info/',
    //   },
    //   component: BLOG_IFRAME_LAYOUT,
    // },
  ],
}

export default News
