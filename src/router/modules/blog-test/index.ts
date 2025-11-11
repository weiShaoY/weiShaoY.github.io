import { SIMPLE_Layout } from '@/layouts'

/**
 *  大屏路由
 */
const BlogRouter: RouterType.RouteRecordRaw[] = [
  {
    path: '/blog',
    component: SIMPLE_Layout,
    children: [
      {
        path: '', // 空路径，作为默认子路由
        name: '博客', // 移动 name 到子路由
        component: () => import('@/pages/blog/index.vue'),
        meta: {
          documentTitle: '我的博客',
        },
      },
    ],
  },
]

export default BlogRouter
