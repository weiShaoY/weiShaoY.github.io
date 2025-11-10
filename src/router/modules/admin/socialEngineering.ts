import type { AppRouteRecordRaw } from '@/router/types'

const SocialEngineering: AppRouteRecordRaw = {
  path: 'socialEngineering',
  name: 'SocialEngineering',
  meta: {
    title: '社工',
    icon: 'admin-menu-socialEngineering',
    order: 11,
  },

  children: [
    {
      path: 'licensePlate',
      name: 'LicensePlate',
      meta: {
        title: '车牌查询',
        icon: 'admin-menu-licensePlate',
      },
      component: () => import('@/pages/admin/socialEngineering/licensePlate/index.vue'),
    },
    {
      path: 'domain',
      name: 'Domain',
      meta: {
        title: '域名查询',
        icon: 'admin-menu-domain',
      },
      component: () => import('@/pages/admin/socialEngineering/domain/index.vue'),
    },

    // {
    //   path: 'loveSpeech',
    //   name: 'LoveSpeech',
    //   meta: {
    //     title: '恋爱话术',
    //     icon: 'admin-menu-loveSpeech',
    //   },
    //   component: () => import('@/pages/admin/socialEngineering/loveSpeech/index.vue'),
    // },
    {
      path: 'logistic',
      name: 'Logistic',
      meta: {
        title: '物流查询',
        icon: 'admin-menu-logistic',
      },
      component: () => import('@/pages/admin/socialEngineering/logistic/index.vue'),
    },
    {
      path: 'account',
      name: 'Account',
      meta: {
        title: '账号查询',
        icon: 'admin-menu-account',
      },
      component: () => import('@/pages/admin/socialEngineering/account/index.vue'),
    },
    {
      path: 'complain',
      name: 'Complain',
      meta: {
        title: '投诉举报',
        icon: 'admin-menu-complain',
      },
      component: () => import('@/pages/admin/socialEngineering/complain/index.vue'),
    },
    {
      path: 'wxChat',
      name: 'WxChat',
      meta: {
        title: '微信',
        icon: 'admin-menu-wxChat',
      },
      children: [
        {
          path: 'chat',
          name: 'Chat',
          meta: {
            title: '对话生成器',
            icon: 'admin-menu-chat',
            iframeUrl: 'https://vjietu.pro/wechat/chat',
          },
        },

        {
          path: 'transferBill',
          name: 'TransferBill',
          meta: {
            title: '转账账单详情生成器',
            icon: 'admin-menu-transferBill',
            iframeUrl: 'https://vjietu.pro/wechat/bill/transfer',
          },
        },
        {
          path: 'transferSuccess',
          name: 'TransferSuccess',
          meta: {
            title: '账单生成器',
            icon: 'admin-menu-transferSuccess',
            iframeUrl: 'https://vjietu.pro/wechat/transfer/success',
          },
        },
        {
          path: 'balance',
          name: 'Balance',
          meta: {
            title: '我的零钱生成器',
            icon: 'admin-menu-balance',
            iframeUrl: 'https://vjietu.pro/wechat/balance',
          },
        },
      ],
    },
  ],
}

export default SocialEngineering
