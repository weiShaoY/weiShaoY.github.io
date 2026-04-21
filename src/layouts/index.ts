/**
 *  默认布局组件
 */
export const DEFAULT_LAYOUT = () => import('./default/index.vue')

/**
 *  指挥台后台模块 布局组件
 */
export const Police_LAYOUT = () => import('./police/index.vue')

/**
 *  管理模块默认布局组件
 */
export const ADMIN_BASE_LAYOUT = () => import('./admin/base/index.vue')

/**
 *  管理模块 iframe 渲染组件
 */
export const ADMIN_IFRAME_LAYOUT = () => import('./admin/iframe/index.vue')

/**
 *  管理模块 external 渲染组件
 */
export const ADMIN_EXTERNAL_LAYOUT = () => import('./admin/external/index.vue')
