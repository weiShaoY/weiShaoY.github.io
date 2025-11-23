/**
 * 工具模块命名类型
 */
declare namespace ToolType {

  /**
   *   菜单类型枚举（左侧、顶部、混合、双栏）
   */
  export enum MenuTypeEnum {

    /** 左侧菜单 */
    LEFT = 'left',

    /** 顶部菜单 */
    TOP = 'top',

    /** 顶部+左侧菜单 */
    TOP_LEFT = 'top-left',

    /** 双栏菜单 */
    DUAL_MENU = 'dual-menu',
  }

  /**
   * 菜单宽度
   */
  export enum MenuWidth {

    /** 收起宽度 */
    CLOSE = '64px',
  }

  /**
   * 容器宽度
   */
  export enum ContainerWidthEnum {

    /** 全屏宽度 */
    FULL = '100%',

    /** 固定宽度 */
    BOXED = '1200px',
  }

}
