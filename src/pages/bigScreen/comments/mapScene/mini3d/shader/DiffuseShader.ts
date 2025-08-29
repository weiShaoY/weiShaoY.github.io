import type { Material } from 'three'

import { Color } from 'three'

/**
 * 着色器类型
 */
type Shader = {
  uniforms: any
  vertexShader: string
  fragmentShader: string
}

/**
 * 扩散着色器配置类型
 */
type DiffuseShaderConfig = {

  /**
   * 材质对象
   */
  material: Material

  /**
   * 时间对象
   */
  time: any

  /**
   * 大小
   */
  size?: number

  /**
   * 扩散颜色
   */
  diffuseColor?: number

  /**
   * 扩散速度
   */
  diffuseSpeed?: number

  /**
   * 扩散宽度
   */
  diffuseWidth?: number

  /**
   * 回调函数
   */
  callback?: (shader: Shader, maxTime: number) => void
}

/**
 * 扩散着色器选项类型
 */
type DiffuseShaderOptions = {

  /**
   * 材质对象
   */
  material: Material

  /**
   * 大小
   */
  size: number

  /**
   * 扩散速度
   */
  diffuseSpeed: number

  /**
   * 扩散颜色
   */
  diffuseColor: number

  /**
   * 扩散宽度
   */
  diffuseWidth: number
}

/**
 * 扩散着色器类
 * @description 负责管理扩散着色器的实例和相关配置
 * @description 提供设置实例、初始化、更新和销毁的方法
 * @description 支持扩散着色器的创建和销毁
 */
export class DiffuseShader {
  /**
   * 时间对象
   */
  public time: any

  /**
   * 点着色器
   */
  public pointShader: Shader | null

  /**
   * 回调函数
   */
  public callback: (shader: Shader, maxTime: number) => void

  /**
   * 配置对象
   */
  public options: DiffuseShaderOptions

  /**
   * 构造函数
   * @param config - 配置对象
   * @param config.material - 材质对象
   * @param config.time - 时间对象
   * @param config.size - 大小
   * @param config.diffuseColor - 扩散颜色
   * @param config.diffuseSpeed - 扩散速度
   * @param config.diffuseWidth - 扩散宽度
   * @param config.callback - 回调函数
   */
  constructor({
    material,
    time,
    size,
    diffuseColor,
    diffuseSpeed,
    diffuseWidth,
    callback = () => {},
  }: DiffuseShaderConfig) {
    this.time = time
    this.pointShader = null
    this.callback = callback

    /**
     * 默认配置
     */
    const defaultOptions: Partial<DiffuseShaderOptions> = {
      size: 100,
      diffuseSpeed: 15.0,
      diffuseColor: 0x8E9B9E,
      diffuseWidth: 10.0,
    }

    /**
     * 配置对象
     */
    this.options = {
      material,
      size: size ?? defaultOptions.size!,
      diffuseColor: diffuseColor ?? defaultOptions.diffuseColor!,
      diffuseSpeed: diffuseSpeed ?? defaultOptions.diffuseSpeed!,
      diffuseWidth: diffuseWidth ?? defaultOptions.diffuseWidth!,
    }

    /**
     * 初始化
     */
    this.init()
  }

  /**
   * 初始化
   */
  init(): void {
    const {
      material,
      size,
      diffuseColor,
      diffuseSpeed,
      diffuseWidth,
    } = this.options

    /**
     * 最大时间
     */
    const maxTime = size / diffuseSpeed

    /**
     * 材质
     */
    material.onBeforeCompile = (shader: Shader) => {
      /**
       * 点着色器
       */
      this.pointShader = shader

      /**
       * 回调函数
       */
      this.callback(shader, maxTime)

      /**
       * 着色器
       */
      shader.uniforms = {
        ...shader.uniforms,
        uTime: {
          value: 0.0,
        },
        uSpeed: {
          value: diffuseSpeed,
        },
        uWidth: {
          value: diffuseWidth,
        },
        uColor: {
          value: new Color(diffuseColor),
        },
      }
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        /* glsl */ `
            varying vec3 vPosition;
            void main(){
              vPosition = position;
          `,
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        /* glsl */ `
            uniform float uTime;
            uniform float uSpeed;
            uniform float uWidth;
            uniform vec3 uColor;
            varying vec3 vPosition;
            void main(){
          `,
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        /* glsl */ `
            #ifdef OPAQUE
            diffuseColor.a = 1.0;
            #endif

            #ifdef USE_TRANSMISSION
            diffuseColor.a *= material.transmissionAlpha;
            #endif

            float r = uTime * uSpeed;

            float w = uWidth;
            // if(w>uWidth){
            //   w = uWidth;
            // }else{
            //   w = uTime * 1.5;
            // }

            vec2 center = vec2(0.0, 0.0);

            float rDistance = distance(vPosition.xy, center);

            if(rDistance > r && rDistance < r + 2.0 * w) {
              float per = 0.0;
              if(rDistance < r + w) {
                float p = smoothstep(0.0,1.0,(rDistance - r) / w);
                p*=p;
                outgoingLight = mix(outgoingLight, uColor, p);
              } else {

                float p = smoothstep(0.0,1.0,(rDistance - r - w) / w);

                outgoingLight = mix(uColor, outgoingLight, p);
              }
              gl_FragColor = vec4(outgoingLight, diffuseColor.a);
            } else {
              gl_FragColor = vec4(outgoingLight, 0.0);
            }
          `,
      )
    }
  }
}
