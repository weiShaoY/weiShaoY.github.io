import { MenuThemeEnum, MenuTypeEnum } from '@/enums/tool'

import { useToolStore } from '@/stores'

/**
 * 设置状态管理
 */
export function useSettingsState() {
  const toolStore = useToolStore()

  /**
   *  色弱模式初始化
   */
  const initColorWeak = () => {
    if (toolStore.settingObj.colorWeak) {
      const el = document.getElementsByTagName('html')[0]

      setTimeout(() => {
        el.classList.add('color-weak')
      }, 100)
    }
  }

  /**
   *  菜单布局切换
   */
  const switchMenuLayouts = (type: MenuTypeEnum) => {
    if (type === MenuTypeEnum.LEFT || type === MenuTypeEnum.TOP_LEFT) {
      toolStore.settingObj.setMenuOpen(true)
    }

    toolStore.settingObj.switchMenuLayouts(type)
    if (type === MenuTypeEnum.DUAL_MENU) {
      toolStore.settingObj.switchMenuStyles(MenuThemeEnum.DESIGN)
      toolStore.settingObj.setMenuOpen(true)
    }
  }

  return {
    initColorWeak,
    switchMenuLayouts,
  }
}
