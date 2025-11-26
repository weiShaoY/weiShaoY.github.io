import type { ContainerWidthEnum } from '@/enums/tool'

import { useToolStore } from '@/stores'

/**
 * 设置项通用处理逻辑
 */
export function useSettingsHandlers() {
  const toolStore = useToolStore()

  /**
   *  DOM 操作相关
   */
  const domOperations = {
    /**
     *  设置HTML类名
     * @param className 类名
     * @param add 是否添加类名
     */
    setHtmlClass: (className: string, add: boolean) => {
      const el = document.getElementsByTagName('html')[0]

      if (add) {
        el.classList.add(className)
      }
      else {
        el.classList.remove(className)
      }
    },

    /**
     *
     *  设置根元素属性
     * @param attribute 属性名
     * @param value 属性值
     */
    setRootAttribute: (attribute: string, value: string) => {
      const el = document.documentElement

      el.setAttribute(attribute, value)
    },

    /**
     *
     *  设置body类名
     * @param className 类名
     * @param add 是否添加类名
     */
    setBodyClass: (className: string, add: boolean) => {
      const el = document.getElementsByTagName('body')[0]

      if (add) {
        el.classList.add(className)
      }
      else {
        el.classList.remove(className)
      }
    },
  }

  /**
   *  通用切换处理器
   */
  const createToggleHandler = (storeMethod: () => void, callback?: () => void) => {
    return () => {
      storeMethod()
      callback?.()
    }
  }

  /**
   *  通用值变更处理器
   */
  const createValueHandler = <T>(
    storeMethod: (value: T) => void,
    callback?: (value: T) => void,
  ) => {
    return (value: T) => {
      if (value !== undefined && value !== null) {
        storeMethod(value)
        callback?.(value)
      }
    }
  }

  /**
   *   基础设置项处理器
   */
  const basicHandlers = {
    /* 工作台标签页 */
    workTab: createToggleHandler(() => toolStore.settingObj.setWorkTab(!toolStore.settingObj.showWorkTab)),

    /* 菜单手风琴 */
    uniqueOpened: createToggleHandler(() => toolStore.settingObj.setUniqueOpened()),

    /* 显示菜单按钮 */
    menuButton: createToggleHandler(() => toolStore.settingObj.setButton()),

    /* 显示快速入口 */
    fastEnter: createToggleHandler(() => toolStore.settingObj.setFastEnter()),

    /* 显示刷新按钮 */
    refreshButton: createToggleHandler(() => toolStore.settingObj.setShowRefreshButton()),

    /* 显示面包屑 */
    crumbs: createToggleHandler(() => toolStore.settingObj.setCrumbs()),

    // // 显示语言切换
    // language: createToggleHandler(() => toolStore.settingObj.setLanguage()),

    // /* 显示进度条 */
    // nprogress: createToggleHandler(() => toolStore.settingObj.setNprogress()),

    /* 色弱模式 */
    colorWeak: createToggleHandler(
      () => toolStore.settingObj.setColorWeak(),
      () => {
        domOperations.setHtmlClass('color-weak', toolStore.settingObj.colorWeak)
      },
    ),

    /* 水印显示 */
    watermark: createToggleHandler(() =>
      toolStore.settingObj.setWatermarkVisible(!toolStore.settingObj.watermarkVisible),
    ),

    /* 菜单展开宽度 */
    menuOpenWidth: createValueHandler<number>((width: number) =>
      toolStore.settingObj.setMenuOpenWidth(width),
    ),

    /* 标签页风格 */
    tabStyle: createValueHandler<string>((style: string) => toolStore.settingObj.setTabStyle(style)),

    /* 页面切换动画 */
    pageTransition: createValueHandler<string>((transition: string) =>
      toolStore.settingObj.setPageTransition(transition),
    ),

    /* 自定义圆角大小 */
    customRadius: createValueHandler<string>((radius: string) =>
      toolStore.settingObj.setCustomRadius(radius),
    ),
  }

  /**
   *  盒子样式处理器
   */
  const boxStyleHandlers = {
    /* 设置盒子模式 */
    setBoxMode: (type: 'border-mode' | 'shadow-mode') => {
      // 防止重复设置
      if (
        (type === 'shadow-mode' && toolStore.settingObj.boxBorderMode === false)
        || (type === 'border-mode' && toolStore.settingObj.boxBorderMode === true)
      ) {
        return
      }

      setTimeout(() => {
        domOperations.setRootAttribute('data-box-mode', type)
        toolStore.settingObj.setBorderMode()
      }, 50)
    },
  }

  /**
   *  颜色设置处理器
   */
  const colorHandlers = {
    /* 选择主题色 */
    selectColor: (theme: string) => {
      toolStore.settingObj.setElementTheme(theme)
      toolStore.settingObj.reload()
    },
  }

  /**
   *  容器设置处理器
   */
  const containerHandlers = {
    /* 设置容器宽度 */
    setWidth: (type: ContainerWidthEnum) => {
      toolStore.settingObj.setContainerWidth(type)
      toolStore.settingObj.reload()
    },
  }

  return {
    domOperations,
    basicHandlers,
    boxStyleHandlers,
    colorHandlers,
    containerHandlers,
    createToggleHandler,
    createValueHandler,
  }
}
