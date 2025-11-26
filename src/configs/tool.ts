import dualColumnLayout from '@images/tool/settings/menu_layouts/dual_column.png'

import horizontalLayout from '@images/tool/settings/menu_layouts/horizontal.png'

import mixedLayout from '@images/tool/settings/menu_layouts/mixed.png'

import verticalLayout from '@images/tool/settings/menu_layouts/vertical.png'

import darkStyle from '@images/tool/settings/menu_styles/dark.png'

import designStyle from '@images/tool/settings/menu_styles/design.png'

import lightStyle from '@images/tool/settings/menu_styles/light.png'

import darkTheme from '@images/tool/settings/theme_styles/dark.png'

import lightTheme from '@images/tool/settings/theme_styles/light.png'

import systemTheme from '@images/tool/settings/theme_styles/system.png'

import {
  MenuThemeEnum,
  MenuTypeEnum,
  SystemThemeEnum,
} from '@/enums/tool'

/**
 * 配置中心图片资源对象
 */
const configImages = {
  /** 系统主题预览图 */
  themeStyles: {
    /** 亮色主题 */
    light: lightTheme,

    /** 暗色主题 */
    dark: darkTheme,

    /** 自动主题（跟随系统） */
    system: systemTheme,
  },

  /** 菜单布局预览图 */
  menuLayouts: {
    /** 左侧菜单 */
    vertical: verticalLayout,

    /** 顶部菜单 */
    horizontal: horizontalLayout,

    /** 混合菜单 */
    mixed: mixedLayout,

    /** 双栏菜单 */
    dualColumn: dualColumnLayout,
  },

  /** 菜单风格预览图 */
  menuStyles: {
    /** 设计风格 */
    design: designStyle,

    /** 暗色风格 */
    dark: darkStyle,

    /** 亮色风格 */
    light: lightStyle,
  },
}

/**
 * 配置图片资源
 *
 * 统一管理设置中心使用的预览图片资源。
 * 包含主题样式、菜单布局、菜单风格的预览图。
 *
 * ## 图片分类
 *
 * - themeStyles: 系统主题预览图（亮色/暗色/自动）
 * - menuLayouts: 菜单布局预览图（左侧/顶部/混合/双栏）
 * - menuStyles: 菜单风格预览图（设计/暗色/亮色）
 *
 * @module config/assets/images
 */

/**
 * 网站链接常量配置
 * 集中管理便于维护和更新链接地址
 *
 * @module utils/constants/links
 */
export const WEB_LINKS = {
  // Github 主页
  GITHUB_HOME: 'https://github.com/Daymychen/art-design-pro',

  // 项目 Github 主页
  GITHUB: 'https://github.com/Daymychen/art-design-pro',

  // 个人博客
  BLOG: 'https://www.artd.pro',

  // 项目文档
  DOCS: 'https://www.artd.pro/docs/zh/',

  // 精简版本
  LiteVersion: 'https://www.artd.pro/docs/zh/guide/lite-version.html',

  // v2.6.1版本
  OldVersion: 'https://www.artd.pro/v2/',

  // 项目社区
  COMMUNITY: 'https://www.artd.pro/docs/zh/community/communicate.html',

  // 个人 Bilibili 主页
  BILIBILI: 'https://space.bilibili.com/425500936?spm_id_from=333.1007.0.0',

  // 项目介绍
  INTRODUCE: 'https://www.artd.pro/docs/zh/guide/introduce.html',
}

/**
 *  工具配置
 */
export const TOOL_CONFIG = {
  /** 系统主题 对象 */
  systemThemeStyles: {
    [SystemThemeEnum.LIGHT]: {
      className: '',
    },
    [SystemThemeEnum.DARK]: {
      className: SystemThemeEnum.DARK,
    },
  },

  /** 系统主题列表 */
  settingThemeList: [
    {
      name: 'Light',
      theme: SystemThemeEnum.LIGHT,
      color: ['#fff', '#fff'],
      leftLineColor: '#EDEEF0',
      rightLineColor: '#EDEEF0',
      img: configImages.themeStyles.light,
    },
    {
      name: 'Dark',
      theme: SystemThemeEnum.DARK,
      color: ['#22252A'],
      leftLineColor: '#3F4257',
      rightLineColor: '#3F4257',
      img: configImages.themeStyles.dark,
    },
    {
      name: 'System',
      theme: SystemThemeEnum.AUTO,
      color: ['#fff', '#22252A'],
      leftLineColor: '#EDEEF0',
      rightLineColor: '#3F4257',
      img: configImages.themeStyles.system,
    },
  ],

  /** 菜单布局列表 */
  menuLayoutList: [
    {
      title: '垂直',
      name: 'Left',
      value: 'left',
      img: configImages.menuLayouts.vertical,
    },
    {
      title: '水平',
      name: 'Top',
      value: 'top',
      img: configImages.menuLayouts.horizontal,
    },
    {
      title: '混合',
      name: 'Mixed',
      value: 'top-left',
      img: configImages.menuLayouts.mixed,
    },
    {
      title: '双列',
      name: 'Dual Column',
      value: 'dual-menu',
      img: configImages.menuLayouts.dualColumn,
    },
  ],

  /** 暗黑模式菜单样式列表 */
  darkMenuStyles: [
    {
      theme: 'dark',
      background: 'var(--default-box-color)',
      systemNameColor: '#DDDDDD',
      iconColor: '#BABBBD',
      textColor: 'rgba(#FFFFFF, 0.7)',
    },
  ],

  /** 系统主色列表 */
  systemMainColor: [
    '#5D87FF',
    '#B48DF3',
    '#1D84FF',
    '#60C041',
    '#38C0FC',
    '#F9901F',
    '#FF80C8',
  ] as const,

  /** 菜单风格列表 */
  themeList: [
    {
      theme: MenuThemeEnum.DESIGN,
      background: '#FFFFFF',
      systemNameColor: 'var(--art-gray-800)',
      iconColor: '#6B6B6B',
      textColor: '#29343D',
      img: configImages.menuStyles.design,
    },
    {
      theme: MenuThemeEnum.DARK,
      background: '#191A23',
      systemNameColor: '#D9DADB',
      iconColor: '#BABBBD',
      textColor: '#BABBBD',
      img: configImages.menuStyles.dark,
    },
    {
      theme: MenuThemeEnum.LIGHT,
      background: '#ffffff',
      systemNameColor: 'var(--art-gray-800)',
      iconColor: '#6B6B6B',
      textColor: '#29343D',
      img: configImages.menuStyles.light,
    },
  ],

  /** 快速入口配置 */
  fastEnter: {
    /** 显示条件（屏幕宽度） */
    minWidth: 1200,

    /** 应用列表 */
    applications: [
      {
        name: '工作台',
        description: '系统概览与数据统计',
        icon: 'ri:pie-chart-line',
        iconColor: '#377dff',
        enabled: true,
        order: 1,
        routeName: 'Console',
      },
      {
        name: '分析页',
        description: '数据分析与可视化',
        icon: 'ri:game-line',
        iconColor: '#ff3b30',
        enabled: true,
        order: 2,
        routeName: 'Analysis',
      },
      {
        name: '礼花效果',
        description: '动画特效展示',
        icon: 'ri:loader-line',
        iconColor: '#7A7FFF',
        enabled: true,
        order: 3,
        routeName: 'Fireworks',
      },
      {
        name: '聊天',
        description: '即时通讯功能',
        icon: 'ri:user-line',
        iconColor: '#13DEB9',
        enabled: true,
        order: 4,
        routeName: 'Chat',
      },
      {
        name: '官方文档',
        description: '使用指南与开发文档',
        icon: 'ri:bill-line',
        iconColor: '#ffb100',
        enabled: true,
        order: 5,
        link: WEB_LINKS.DOCS,
      },
      {
        name: '技术支持',
        description: '技术支持与问题反馈',
        icon: 'ri:user-location-line',
        iconColor: '#ff6b6b',
        enabled: true,
        order: 6,
        link: WEB_LINKS.COMMUNITY,
      },
      {
        name: '更新日志',
        description: '版本更新与变更记录',
        icon: 'ri:gamepad-line',
        iconColor: '#38C0FC',
        enabled: true,
        order: 7,
        routeName: 'ChangeLog',
      },
      {
        name: '哔哩哔哩',
        description: '技术分享与交流',
        icon: 'ri:bilibili-line',
        iconColor: '#FB7299',
        enabled: true,
        order: 8,
        link: WEB_LINKS.BILIBILI,
      },
    ],

    /** 快速链接 */
    quickLinks: [
      {
        name: '登录',
        enabled: true,
        order: 1,
        routeName: 'Login',
      },
      {
        name: '注册',
        enabled: true,
        order: 2,
        routeName: 'Register',
      },
      {
        name: '忘记密码',
        enabled: true,
        order: 3,
        routeName: 'ForgetPassword',
      },
      {
        name: '定价',
        enabled: true,
        order: 4,
        routeName: 'Pricing',
      },
      {
        name: '个人中心',
        enabled: true,
        order: 5,
        routeName: 'UserCenter',
      },
      {
        name: '留言管理',
        enabled: true,
        order: 6,
        routeName: 'ArticleComment',
      },
    ],
  },

  /** 顶部栏功能配置 */
  headerBarConfig: {

    menuButton: {
      enabled: true,
      description: '控制左侧菜单的展开/收起按钮',
    },
    refreshButton: {
      enabled: true,
      description: '页面刷新按钮',
    },
    fastEnter: {
      enabled: true,
      description: '快速入口功能，提供常用应用和链接的快速访问',
    },
    breadcrumb: {
      enabled: true,
      description: '面包屑导航，显示当前页面路径',
    },
    globalSearch: {
      enabled: true,
      description: '全局搜索功能，支持快捷键 Ctrl+K 或 Cmd+K',
    },
    fullscreen: {
      enabled: true,
      description: '全屏切换功能',
    },
    notification: {
      enabled: true,
      description: '通知中心，显示系统通知和消息',
    },
    chat: {
      enabled: true,
      description: '聊天功能，提供实时沟通',
    },
    language: {
      enabled: true,
      description: '多语言切换功能',
    },
    settings: {
      enabled: true,
      description: '系统设置面板',
    },
    themeToggle: {
      enabled: true,
      description: '主题切换功能（明暗主题）',
    },
  },

  setting: {

    /** 菜单类型 */
    menuType: MenuTypeEnum.LEFT,

    /** 菜单展开宽度 */
    menuOpenWidth: 230,

    /** 菜单是否展开 */
    menuOpen: true,

    /** 双菜单是否显示文本 */
    dualMenuShowText: false,

    /** 系统主题类型 */
    systemThemeType: SystemThemeEnum.AUTO,

    /** 系统主题模式 */
    systemThemeMode: SystemThemeEnum.AUTO,

    /** 菜单风格 */
    menuThemeType: MenuThemeEnum.DESIGN,

    /** 系统主题颜色 */
    systemThemeColor: '#5D87FF',

    /** 是否显示菜单按钮 */
    showMenuButton: true,

    /** 是否显示快速入口 */
    showFastEnter: true,

    /** 是否显示刷新按钮 */
    showRefreshButton: true,

    /** 是否显示面包屑 */
    showCrumbs: true,

    /** 是否显示工作台标签 */
    showWorkTab: true,

    /** 是否显示语言切换 */
    showLanguage: true,

    /** 是否显示进度条 */
    showNprogress: false,

    /** 是否显示设置引导 */
    showSettingGuide: true,

    /** 是否显示节日文本 */
    showFestivalText: false,

    /** 是否显示水印 */
    watermarkVisible: false,

    /** 是否自动关闭 */
    autoClose: false,

    /** 是否唯一展开 */
    uniqueOpened: true,

    /** 是否色弱模式 */
    colorWeak: false,

    /** 是否刷新 */
    refresh: false,

    /** 是否加载节日烟花 */
    holidayFireworksLoaded: false,

    /** 边框模式 */
    boxBorderMode: true,

    /** 页面过渡效果 */
    pageTransition: 'slide-left',

    /** 标签页样式 */
    tabStyle: 'tab-default',

    /** 自定义圆角 */
    customRadius: '0.75',

    /** 容器宽度 */
    containerWidth: '100%',

    /** 节日日期 */
    festivalDate: '',

  },

}
