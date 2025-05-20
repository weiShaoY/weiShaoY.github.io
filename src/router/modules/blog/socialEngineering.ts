import type { AppRouteRecordRaw } from '@/router/types'

const SocialEngineering: AppRouteRecordRaw = {
  path: 'socialEngineering',
  name: 'SocialEngineering',
  meta: {
    title: '社工',
    icon: 'blog-menu-socialEngineering',
    order: 11,
  },

  children: [
    {
      path: 'licensePlate',
      name: 'LicensePlate',
      meta: {
        title: '车牌查询',
        icon: 'blog-menu-licensePlate',
      },
      component: () => import('@/pages/blog/socialEngineering/licensePlate/index.vue'),
    },
    {
      path: 'domain',
      name: 'Domain',
      meta: {
        title: '域名查询',
        icon: 'blog-menu-domain',
      },
      component: () => import('@/pages/blog/socialEngineering/domain/index.vue'),
    },

    // {
    //   path: 'loveSpeech',
    //   name: 'LoveSpeech',
    //   meta: {
    //     title: '恋爱话术',
    //     icon: 'blog-menu-loveSpeech',
    //   },
    //   component: () => import('@/pages/blog/socialEngineering/loveSpeech/index.vue'),
    // },
    {
      path: 'logistic',
      name: 'Logistic',
      meta: {
        title: '物流查询',
        icon: 'blog-menu-logistic',
      },
      component: () => import('@/pages/blog/socialEngineering/logistic/index.vue'),
    },
    {
      path: 'account',
      name: 'Account',
      meta: {
        title: '账号查询',
        icon: 'blog-menu-account',
      },
      component: () => import('@/pages/blog/socialEngineering/account/index.vue'),
    },
    {
      path: 'complain',
      name: 'Complain',
      meta: {
        title: '投诉举报',
        icon: 'blog-menu-complain',
      },
      component: () => import('@/pages/blog/socialEngineering/complain/index.vue'),
    },
    {
      path: 'wxChat',
      name: 'WxChat',
      meta: {
        title: '微信',
        icon: 'blog-menu-wxChat',
      },
      children: [
        {
          path: 'chat',
          name: 'Chat',
          meta: {
            title: '对话生成器',
            icon: 'blog-menu-chat',
            iframeUrl: 'https://vjietu.pro/wechat/chat',
          },
        },

        {
          path: 'transferBill',
          name: 'TransferBill',
          meta: {
            title: '转账账单详情生成器',
            icon: 'blog-menu-transferBill',
            iframeUrl: 'https://vjietu.pro/wechat/bill/transfer',
          },
        },
        {
          path: 'transferSuccess',
          name: 'TransferSuccess',
          meta: {
            title: '账单生成器',
            icon: 'blog-menu-transferSuccess',
            iframeUrl: 'https://vjietu.pro/wechat/transfer/success',
          },
        },
        {
          path: 'balance',
          name: 'Balance',
          meta: {
            title: '我的零钱生成器',
            icon: 'blog-menu-balance',
            iframeUrl: 'https://vjietu.pro/wechat/balance',
          },
        },
      ],
    },
  ],
}

export default SocialEngineering
