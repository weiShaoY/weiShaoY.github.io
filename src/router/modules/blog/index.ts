import type { RouteRecordRaw } from 'vue-router'

import { DEFAULT_LAYOUT } from '@/layouts'

/**
 *  博客路由
 */
const BlogRouter: RouteRecordRaw = {
  path: '/blog',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '', // 空路径，作为默认子路由
      name: 'Blog', // 移动 name 到子路由
      component: () => import('@/views/blog/index.vue'),
      meta: {
        documentTitle: '我的博客!',
      },
    },
  ],
}

export default BlogRouter
