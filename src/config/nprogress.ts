import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

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

export default NProgress
