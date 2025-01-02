import blogConfig from './blog'

import NProgress from './nprogress'

export {
  blogConfig,

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
   *  @description :  移动端响应式断点
   */
  mobileMediaQueryBreakpoint: 768,

  /**
   *  @description : 首页地址
   */
  homeRoutePath: '/home/about',

  /**
   *  @description : 重定向路由名称
   */
  redirectRouteName: 'Redirect',

  /**
   *  @description : 未找到路由的名称(404)
   */
  notFoundRouteName: '404',

  /**
   *  @description: 代码模块相关配置
   */
  blog: blogConfig,
}

export default config
