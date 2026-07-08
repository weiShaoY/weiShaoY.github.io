import { FileLoader } from 'three'

import { Resource } from './mini3d'

import arrow from './texture/arrow.png'

import chinaBlurLine from './texture/chinaBlurLine.png'

import mapFlyline from './texture/flyline6.png'

// 焦点贴图
import focusArrowsTexture from './texture/focus/focus_arrows.png'

import focusBarTexture from './texture/focus/focus_bar.png'

import focusBgTexture from './texture/focus/focus_bg.png'

import focusMidQuanTexture from './texture/focus/focus_mid_quan.png'

import focusMoveBgTexture from './texture/focus/focus_move_bg.png'

import guangquan1 from './texture/guangquan01.png'

// import flyLineFocus from './texture/guangquan01.png'
import guangquan2 from './texture/guangquan02.png'

import huiguang from './texture/huiguang.png'

import ocean from './texture/ocean-bg.png'

import pathLine3 from './texture/pathLine2.png'

import pathLine from './texture/pathLine4.png'

import pathLine2 from './texture/pathLine.png'

import point from './texture/point1.png'

import rotationBorder1 from './texture/rotationBorder1.png'

import rotationBorder2 from './texture/rotationBorder2.png'

import side from './texture/side.png'

/**
 * 资源类型
 */
type AssetItem = {

  /**
   * 资源类型
   */
  type: 'Texture' | 'File'

  /**
   * 资源名称
   */
  name: string

  /**
   * 资源路径
   */
  path: string
}

export class Assets {
  /**
   * 资源实例
   */
  public instance!: Resource

  /**
   * 构造函数
   */
  constructor() {
    this.init()
  }

  init(): void {
    this.instance = new Resource()

    /**
     * 添加Fileloader 用于加载json文件
     */
    this.instance.addLoader(FileLoader, 'FileLoader')

    // 资源加载
    const assets: AssetItem[] = [
      {
        type: 'File',
        name: 'china',
        path: new URL('@/assets/jsons/中华人民共和国.json', import.meta.url).href,
      },

      {
        type: 'File',
        name: 'mapJson',
        path: new URL('@/assets/jsons/湖南省.json', import.meta.url).href,
      },

      {
        type: 'File',
        name: 'mapStroke',
        path: new URL('@/assets/jsons/湖南省-轮廓.json', import.meta.url).href,
      },
      {
        type: 'Texture',
        name: 'flyline',
        path: pathLine,
      },
      {
        type: 'Texture',
        name: 'pathLine',
        path: pathLine,
      },
      {
        type: 'Texture',
        name: 'pathLine2',
        path: pathLine2,
      },
      {
        type: 'Texture',
        name: 'pathLine3',
        path: pathLine3,
      },

      {
        type: 'Texture',
        name: 'huiguang',
        path: huiguang,
      },
      {
        type: 'Texture',
        name: 'rotationBorder1',
        path: rotationBorder1,
      },
      {
        type: 'Texture',
        name: 'rotationBorder2',
        path: rotationBorder2,
      },
      {
        type: 'Texture',
        name: 'guangquan1',
        path: guangquan1,
      },
      {
        type: 'Texture',
        name: 'guangquan2',
        path: guangquan2,
      },
      {
        type: 'Texture',
        name: 'chinaBlurLine',
        path: chinaBlurLine,
      },
      {
        type: 'Texture',
        name: 'ocean',
        path: ocean,
      },
      {
        type: 'Texture',
        name: 'side',
        path: side,
      },

      // { type: 'Texture', name: 'flyLineFocus', path: flyLineFocus },
      {
        type: 'Texture',
        name: 'flyLineFocus',
        path: guangquan1,
      },
      {
        type: 'Texture',
        name: 'mapFlyline',
        path: mapFlyline,
      },
      {
        type: 'Texture',
        name: 'arrow',
        path: arrow,
      },
      {
        type: 'Texture',
        name: 'point',
        path: point,
      },

      // focus
      {
        type: 'Texture',
        name: 'focusArrows',
        path: focusArrowsTexture,
      },
      {
        type: 'Texture',
        name: 'focusBar',
        path: focusBarTexture,
      },
      {
        type: 'Texture',
        name: 'focusBg',
        path: focusBgTexture,
      },
      {
        type: 'Texture',
        name: 'focusMidQuan',
        path: focusMidQuanTexture,
      },
      {
        type: 'Texture',
        name: 'focusMoveBg',
        path: focusMoveBgTexture,
      },
    ]

    // 资源加载
    this.instance.loadAll(assets)
  }
}
