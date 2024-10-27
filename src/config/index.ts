import codeConfig from './code'

import NProgress from './nprogress'

export {
  codeConfig,

  NProgress,
}

/**
 *  高德地图 key
 */
export const AMAP_MAP_KEY: string = ''

/**
 *  百度地图 key
 */
export const BAIDU_MAP_KEY: string = ''

const config = {
  /**
   *  @description : 首页地址
   */
  homeRoutePath: '/home/about',

  /**
   *  @description : 重定向路由名称
   */
  redirectRouteName: 'Redirect',

  /**
   *  @description : 404 路由
   */
  notFound: 'notFound',

  /**
   *  @description: 代码模块相关配置
   */
  code: codeConfig,
}

export default config
