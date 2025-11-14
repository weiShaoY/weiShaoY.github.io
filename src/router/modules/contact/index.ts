import { DEFAULT_LAYOUT } from '@/layouts'

/**
 *  联系路由
 */
const ContactRouter: RouterType.RouteRecordRaw = {
  path: '/contact',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '', // 空路径，作为默认子路由
      name: 'Contact', // 移动 name 到子路由
      component: () => import('@/pages/contact/index.vue'),
      meta: {
        documentTitle: '联系我!',
      },
    },
  ],
}

export default ContactRouter
