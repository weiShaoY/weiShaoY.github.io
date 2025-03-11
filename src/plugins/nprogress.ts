import NProgress from 'nprogress'

/** 配置并初始化 NProgress 进度条插件 */
export function setupNProgress() {
  // 配置进度条的动画效果和速度

  NProgress.configure({
  /**
   *  动画方式
   */
    easing: 'ease',

    /**
     *  递增进度条的速度
     */
    speed: 500,

    /**
     *  进度环显示隐藏
     */
    showSpinner: false,

    /**
     *  自动递增间隔
     */
    trickleSpeed: 200,

    /**
     *  更改启动时使用的最小百分比
     */
    minimum: 0.3,

    /**
     *  指定进度条的父容器
     */
    parent: 'body',
  })

  // 将 NProgress 挂载到全局 window 对象，方便在其他地方调用
  window.NProgress = NProgress
}
