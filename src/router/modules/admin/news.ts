const News: RouterType.AdminRoute = {
  path: 'news',
  name: 'News',
  meta: {
    title: '资讯',
    icon: 'admin-menu-news',
    order: 10,
  },
  redirect: {
    name: 'DailyHotTopics',
  },
  children: [

    {
      path: 'dailyHotTopics',
      name: 'DailyHotTopics',
      meta: {
        title: '每日热点',
        icon: 'admin-menu-dailyHotTopics',
        iframeUrl: 'https://today.lieme.cn/',
        fastMenuOrder: 1,
      },
    },
    {
      path: 'itNews',
      name: 'ItNews',
      meta: {
        title: 'IT资讯',
        icon: 'admin-menu-itNews',
      },
      component: () => import('@/pages/admin/news/itNews/index.vue'),
    },

    {
      path: 'boxOffice',
      name: 'BoxOffice',
      meta: {
        title: '票房',
        icon: 'admin-menu-boxOffice',
      },
      component: () => import('@/pages/admin/news/boxOffice/index.vue'),
    },
    {
      path: 'weather',
      name: 'Weather',
      meta: {
        title: '天气',
        icon: 'admin-menu-weather',
        fastMenuOrder: 2,
      },
      component: () => import('@/pages/admin/news/weather/index.vue'),
    },

    {
      path: 'game',
      name: 'Game',
      meta: {
        title: '游戏',
        icon: 'admin-menu-game',
      },
      redirect: {
        name: 'Hok',
      },
      children: [
        {
          path: 'hok',
          name: 'Hok',
          meta: {
            title: '王者荣耀',
            icon: 'admin-menu-hok',
          },
          component: () => import('@/pages/admin/news/game/hok/index.vue'),
        },
      ],
    },
    {
      path: 'price',
      name: 'Price',
      meta: {
        title: '价格',
        icon: 'admin-menu-price',
      },
      redirect: {
        name: 'Gold',
      },
      children: [
        {
          path: 'gold',
          name: 'Gold',
          meta: {
            title: '黄金',
            icon: 'admin-menu-gold',
            fastMenuOrder: 7,
          },
          component: () => import('@/pages/admin/news/price/gold/index.vue'),
        },
        {
          path: 'oil',
          name: 'Oil',
          meta: {
            title: '燃油',
            icon: 'admin-menu-oil',
          },
          component: () => import('@/pages/admin/news/price/oil/index.vue'),
        },
        {
          path: 'cigarette',
          name: 'Cigarette',
          meta: {
            title: '香烟',
            icon: 'admin-menu-cigarette',
          },
          component: () => import('@/pages/admin/news/price/cigarette/index.vue'),
        },
      ],
    },
  ],
}

export default News
