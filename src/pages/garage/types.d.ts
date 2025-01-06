/**
 * 页面动作类型
 *
 * 定义了一组可能的页面操作类型，用于管理页面状态和行为的更改。
 * 每个操作类型都与特定的页面状态变化或操作相关。
 */
export type PageActionType =

  // 加载页相关操作
  | 'show-loading' // 显示加载页
  | 'hide-loading' // 隐藏加载页

  // 操作页相关操作
  | 'show-bar' // 显示游戏页面
  | 'hide-bar' // 隐藏游戏页面

  // 音频相关操作
  | 'allow-audio' // 允许播放音乐
  | 'mute' // 静音操作
  | 'unmute' // 取消静音操作

