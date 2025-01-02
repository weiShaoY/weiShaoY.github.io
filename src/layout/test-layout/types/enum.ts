/**
 * @enum {number} 基础状态枚举
 * @description 基础状态枚举，用于表示启用/禁用状态
 */
export enum BasicStatus {

  /**
   * 禁用状态
   */
  DISABLE = 0,

  /**
   * 启用状态
   */
  ENABLE = 1,
}

/**
 * @enum {number} 结果状态枚举
 * @description 请求结果枚举，用于表示请求的返回状态
 */
export enum ResultEnum {

  /**
   * 成功
   */
  SUCCESS = 0,

  /**
   * 错误
   */
  ERROR = -1,

  /**
   * 超时
   */
  TIMEOUT = 401,
}

/**
 * @enum {string} 存储键枚举
 * @description 本地存储的键枚举，用于管理浏览器的 localStorage 或 sessionStorage 键名
 */
export enum StorageEnum {

  /**
   * 用户信息
   */
  UserInfo = 'userInfo',

  /**
   * 用户令牌
   */
  UserToken = 'userToken',

  /**
   * 设置
   */
  Settings = 'settings',

  /**
   * 国际化语言
   */
  I18N = 'i18nextLng',
}

/**
 * @enum {string} 主题模式枚举
 * @description 主题模式枚举，用于表示不同的主题模式
 */
export enum ThemeMode {

  /**
   * 浅色模式
   */
  Light = 'light',

  /**
   * 深色模式
   */
  Dark = 'dark',
}

/**
 * @enum {string} 主题布局枚举
 * @description 主题布局枚举，用于表示不同的布局风格
 */
export enum ThemeLayout {

  /**
   * 垂直布局
   */
  Vertical = 'vertical',

  /**
   * 水平布局
   */
  Horizontal = 'horizontal',

  /**
   * 迷你布局
   */
  Mini = 'mini',
}

/**
 * @enum {string} 主题颜色预设枚举
 * @description 主题颜色预设枚举，用于表示不同的主题颜色选项
 */
export enum ThemeColorPresets {

  /**
   * 默认颜色
   */
  Default = 'default',

  /**
   * 青色
   */
  Cyan = 'cyan',

  /**
   * 紫色
   */
  Purple = 'purple',

  /**
   * 蓝色
   */
  Blue = 'blue',

  /**
   * 橙色
   */
  Orange = 'orange',

  /**
   * 红色
   */
  Red = 'red',
}

/**
 * @enum {string} 本地化语言枚举
 * @description 语言枚举，用于表示支持的多语言选项
 */
export enum LocalEnum {

  /**
   * 英文（美国）
   */
  en_US = 'en_US',

  /**
   * 中文（中国）
   */
  zh_CN = 'zh_CN',
}

/**
 * @enum {string} 多标签操作枚举
 * @description 多标签页操作枚举，用于表示对标签页进行的各种操作
 */
export enum MultiTabOperation {

  /**
   * 全屏
   */
  FULLSCREEN = 'fullscreen',

  /**
   * 刷新
   */
  REFRESH = 'refresh',

  /**
   * 关闭
   */
  CLOSE = 'close',

  /**
   * 关闭其他
   */
  CLOSEOTHERS = 'closeOthers',

  /**
   * 关闭所有
   */
  CLOSEALL = 'closeAll',

  /**
   * 关闭左侧
   */
  CLOSELEFT = 'closeLeft',

  /**
   * 关闭右侧
   */
  CLOSERIGHT = 'closeRight',
}

/**
 * @enum {number} 权限类型枚举
 * @description 权限类型枚举，用于表示不同的权限类型
 */
export enum PermissionType {

  /**
   * 目录
   */
  CATALOGUE = 0,

  /**
   * 菜单
   */
  MENU = 1,

  /**
   * 按钮
   */
  BUTTON = 2,
}
