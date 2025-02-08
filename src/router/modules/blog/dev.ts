import type { AppRouteRecordRaw } from '@/router/types'

import {
  BLOG_DEFAULT_LAYOUT,
  BLOG_EXTERNAL_LAYOUT,
  BLOG_IFRAME_LAYOUT,
} from '@/layouts'

const Dev: AppRouteRecordRaw = {
  path: 'dev',
  name: 'Dev',
  meta: {
    locale: '开发',
    icon: 'blog-menu-dev',
    order: 10,
  },
  redirect: {
    name: 'Format',
  },
  component: BLOG_DEFAULT_LAYOUT,
  children: [

    {
      path: 'format',
      name: 'Format',
      meta: {
        locale: '代码格式化',
        icon: 'blog-menu-format',
        iframeUrl: 'https://highlightjs.org/demo',
      },
      component: BLOG_IFRAME_LAYOUT,
    },
    {
      path: 'image',
      name: 'Image',
      meta: {
        locale: '代码转图片',
        icon: 'blog-menu-image',
        externalUrl: 'https://carbon.now.sh/',
      },
      component: BLOG_EXTERNAL_LAYOUT,
    },
    {
      path: 'npm',
      name: 'Npm',
      meta: {
        locale: 'Npm可视化',
        icon: 'blog-menu-npm',
        iframeUrl: 'https://pkg-graph.info/',
      },
      component: BLOG_IFRAME_LAYOUT,
    },
  ],
}

export default Dev
