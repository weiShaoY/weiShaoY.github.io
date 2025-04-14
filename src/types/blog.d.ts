/**
 * 博客模块命名类型
 */
declare namespace BlogType {

  /** 其他颜色 */
  type OtherColor = {

    /** 信息颜色 */
    info: string

    /** 成功颜色 */
    success: string

    /** 警告颜色 */
    warning: string

    /** 错误颜色 */
    error: string
  }

  /** 主题颜色 */
  type ThemeColor = {

    /** 主色 */
    primary: string
  } & OtherColor

  /** 主题颜色键 */
  type ThemeColorKey = keyof ThemeColor

  /** 主题调色板颜色 */
  type ThemePaletteColor = {
    [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
  }

  /** 基础 token */
  type BaseToken = Record<string, Record<string, string>>

  /** 主题设置 token 颜色 */
  type ThemeSettingTokenColor = {

    /** 进度条颜色，如果未设置，则使用主色 */
    'nprogress'?: string

    /** 容器颜色 */
    'container': string

    /** 布局颜色 */
    'layout': string

    /** 反转颜色 */
    'inverted': string

    /** 基础文本颜色 */
    'base-text': string
  }

  /** 主题设置 token 阴影 */
  type ThemeSettingTokenBoxShadow = {

    /** 头部阴影 */
    header: string

    /** 侧边栏阴影 */
    sider: string

    /** 标签页阴影 */
    tab: string
  }

  /** 主题设置 token */
  type ThemeSettingToken = {

    /** 颜色 */
    colors: ThemeSettingTokenColor

    /** 阴影 */
    boxShadow: ThemeSettingTokenBoxShadow
  }

  /** 主题 token 颜色 */
  type ThemeTokenColor = ThemePaletteColor & ThemeSettingTokenColor

  /** 主题 token CSS 变量 */
  type ThemeTokenCSSVars = {

    /** 颜色 */
    colors: ThemeTokenColor & { [key: string]: string }

    /** 阴影 */
    boxShadow: ThemeSettingTokenBoxShadow & { [key: string]: string }
  }

  // / / ////////////////////////  主题 2025-04-14---18:16---星期一  ////////////////////////

  /** 主题设置 */
  type Theme = {

    /** 主题方案 */
    themeScheme: 'dark' | 'light' | 'auto'

    /** 灰度模式 */
    grayscale: boolean

    /** 色弱模式 */
    colourWeakness: boolean

    /** 是否推荐颜色 */
    recommendColor: boolean

    /** 主题颜色 */
    themeColor: string

    /** 其他颜色 */
    otherColor: OtherColor

    /** 信息颜色是否跟随主色 */
    isInfoFollowPrimary: boolean

    /** 重置缓存策略 */
    resetCacheStrategy: 'close' | 'refresh'

    /** 布局 */
    layout: {

      /** 布局模式 */
      mode: 'horizontal' | 'vertical' | 'vertical-mix' | 'horizontal-mix'

      /** 滚动模式 */
      scrollMode: 'content' | 'wrapper'

      /**
       * 是否反转水平混合布局
       *
       * 如果为 true，左侧的垂直子菜单和顶部的水平一级菜单将反转
       */
      reverseHorizontalMix: boolean
    }

    /** 页面 */
    page: {

      /** 是否显示页面过渡动画 */
      animate: boolean

      /** 页面动画模式 */
      animateMode:
        | 'none'
        | 'fade'
        | 'fade-slide'
        | 'fade-bottom'
        | 'fade-scale'
        | 'zoom-fade'
        | 'zoom-out'
    }

    /** 头部 */
    header: {

      /** 头部高度 */
      height: number

      /** 头部面包屑 */
      breadcrumb: {

        /** 是否显示面包屑 */
        visible: boolean

        /** 是否显示面包屑图标 */
        showIcon: boolean
      }
    }

    /** 标签页 */
    tab: {

      /** 是否显示标签页 */
      visible: boolean

      /**
       * 是否缓存标签页
       *
       * 如果缓存，页面刷新时会从本地存储中获取标签页
       */
      cache: boolean

      /** 标签页高度 */
      height: number

      /** 标签页模式 */
      mode: 'button' | 'chrome'
    }

    /** 固定头部和标签页 */
    fixedHeaderAndTab: boolean

    /** 侧边栏 */
    sider: {

      /** 反转侧边栏 */
      inverted: boolean

      /** 侧边栏宽度 */
      width: number

      /** 折叠侧边栏宽度 */
      collapsedWidth: number

      /** 当布局为 'vertical-mix' 或 'horizontal-mix' 时的侧边栏宽度 */
      mixWidth: number

      /** 当布局为 'vertical-mix' 或 'horizontal-mix' 时的折叠侧边栏宽度 */
      mixCollapsedWidth: number

      /** 当布局为 'vertical-mix' 或 'horizontal-mix' 时的子菜单宽度 */
      mixChildMenuWidth: number
    }

    /** 底部 */
    footer: {

      /** 是否显示底部 */
      visible: boolean

      /** 是否固定底部 */
      fixed: boolean

      /** 底部高度 */
      height: number

      /** 当布局为 'horizontal-mix' 时，是否将底部浮动到右侧 */
      right: boolean
    }

    /** 水印 */
    watermark: {

      /** 是否显示水印 */
      visible: boolean

      /** 水印文本 */
      text: string
    }

    /** 定义一些主题设置的 tokens，将转换为 CSS 变量 */
    tokens: {
      light: ThemeSettingToken
      dark?: {
        [K in keyof ThemeSettingToken]?: Partial<ThemeSettingToken[K]>;
      }
    }
  }

  // //////////////////////// app  2025-04-14---18:30---星期一  ////////////////////////

  namespace App {

    /** 全局头部属性 */
    type HeaderProps = {

      /** 是否显示 logo */
      showLogo?: boolean

      /** 是否显示菜单切换按钮 */
      showMenuToggler?: boolean

      /** 是否显示菜单 */
      showMenu?: boolean
    }
  }

    /** 菜单项 */
    type MenuItem = Omit<RouterType.BlogRouteRecordRaw, 'children'> & {

      /** 子菜单 */
      children?: BlogMenuItem[]
    }

    /** 面包屑 */
    type BreadcrumbItem = Omit<RouterType.BlogRouteRecordRaw, 'children'> & {

      /** 子菜单 */
      children?: BlogMenuItem[]
    }

  // namespace Menu {

  // }
}
