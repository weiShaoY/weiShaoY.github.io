/**
 *  simple 简单布局组件
 */
export const SIMPLE_Layout = () => import('./simple/index.vue')

/**
 *  首页模块默认布局组件
 */
export const HOME_DEFAULT_LAYOUT = () => import('./home/index.vue')

/**
 *  首页模块默认布局组件
 */
export const ADMIN_BASE_LAYOUT = () => import('./admin/base/index.vue')

/**
 *  博客 模块 iframe 渲染组件
 */
export const ADMIN_IFRAME_LAYOUT = () => import('./admin/iframe/index.vue')

/**
 *  博客 模块 external 渲染组件
 */
export const ADMIN_EXTERNAL_LAYOUT = () => import('./admin/external/index.vue')

/**
 *  管理后台模块 布局组件
 */
export const Police_LAYOUT = () => import('./police/index.vue')
