import type {
  Color,
  Mesh,
  MeshStandardMaterial,
} from 'three'

declare global {

  /**
   *  Test 模块类型定义
   */
  declare namespace TestType {

    /**
     *  模型的引用和材质
     */
    export type model = {

      /**
       * 轮胎网格数组
       * @description 存储车辆模型中的轮胎网格，用于在动画中单独控制轮胎的旋转和移动。
       */
      wheel: Mesh[]

      /**
       * 车身材质
       * @description 存储车辆车身的材质，应用于车身的外观效果，比如金属光泽或反光效果。
       */
      bodyMat: MeshStandardMaterial | null

      /**
       * 地板网格
       * @description 表示地板的网格模型，用于渲染车辆模型下方的地板表面。
       */
      floor: Mesh | null

      /**
       * 灯光材质
       * @description 存储车辆灯光的材质信息，用于调节灯光效果，例如亮度和透明度。
       */
      lightMat: MeshStandardMaterial | null
    }

    /**
     *  动画参数
     */
    type params = {

      /**
       *  车速
       *  @description 表示当前车辆的速度因子，影响模型的动画速度，数值越大车速越快。
       */
      speedFactor: number

      /**
       *  初始颜色
       *  @description 车辆在静止或慢速状态下的默认颜色。
       */
      initColor: Color

      /**
       *  加速颜色
       *  @description 车辆在高速移动时呈现的颜色效果，用于显示加速状态。
       */
      speedupColor: Color

      /**
       *  地板颜色
       *  地板的基础颜色，影响场景中的地板外观。
       */
      floorColor: Color

      /**
       *  地板速度
       *  @description 控制地板的移动速度，影响地板的动画表现。
       */
      floorNormalSpeed: number

      /**
       *  阴影强度
       *  控制模型上阴影的强度，数值越大阴影越明显。
       */
      bloomIntensity: number

      /**
       *  阴影阈值
       *  @description 决定哪一部分场景会受到阴影影响，高于阈值的部分不会有阴影。
       */
      bloomThreshold: number

      /**
       *  光线透明度
       *  @description 控制灯光的透明度，用于调整模型光线的渗透效果。
       */
      lightOpacity: number

      /**
       *  地板环境强度
       *  @description 控制地板受到环境光的影响强度，数值越高地板越亮。
       */
      floorEnvIntensity: number

      /**
       *  轮胎粗糙度
       *  @description 控制轮胎表面的粗糙度，值越大表面越粗糙。
       */
      wheelRoughness: number

      /**
       *  轮胎环境强度
       *  @description 控制轮胎的环境光反射强度，数值越大反光越强。
       */
      wheelEnvIntensity: number
    }
  }
}
