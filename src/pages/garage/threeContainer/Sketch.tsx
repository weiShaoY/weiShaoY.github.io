import {
  Environment,
  OrbitControls,
  useCubeCamera,
  useEnvironment,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { flatModel, printModel } from "@utils/misc";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  Color,
  DoubleSide,
  LinearFilter,
  LinearMipMapLinearFilter,
  LinearSRGBColorSpace,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NearestFilter,
  RepeatWrapping,
  SRGBColorSpace,
  ShaderMaterial,
  Texture,
  Uniform,
  UnsignedByteType,
  Vector2,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import vertexShader from "@/three/shaders/sketch/vertex.glsl";
import fragmentShader from "@/three/shaders/sketch/fragment.glsl";
import { useModifyCSM } from "@utils/tools";
import { useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useControls } from "leva";
import { useGameStore, useInteractStore, useLoadedStore } from "@utils/Store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReflect } from "@utils/useReflect";
import floorVertex from "@/three/shaders/sketch/floorver.glsl";
import floorFrag from "@/three/shaders/sketch/floorfrag.glsl";

const Sketch3 = () => {
  const cargltf = useGLTF("/models/sm_car.gltf", false, true); // 加载汽车模型
  const startRommgltf = useGLTF("/models/sm_startroom.raw.gltf", false, true); // 加载起始房间模型
  const gltf = useGLTF("/models/sm_speedup.gltf", false, true); // 加载加速模型
  const aoMap = useTexture("/textures/t_car_body_AO.raw.jpg"); // 加载汽车车身AO贴图
  const lightMap = useTexture("/textures/t_startroom_light.raw.jpg"); // 加载起始房间光贴图
  const startRoomAoMap = useTexture("/textures/t_startroom_ao.raw.jpg"); // 加载起始房间AO贴图
  const floorroughnessMap = useTexture("/textures/t_floor_roughness.webp"); // 加载地板粗糙度贴图
  const floornormalMap = useTexture("/textures/t_floor_normal.webp"); // 加载地板法线贴图
  // const env = useEnvironment({ files: "/textures/t_env_light.hdr" });

  const touch = useInteractStore((state) => state.touch); // 获取交互状态

  const modelRef = useRef({
    wheel: [] as Mesh[], // 保存轮子的引用
    bodyMat: null as MeshStandardMaterial | null, // 保存车身材质的引用
    floor: null as Mesh | null, // 保存地板的引用
    lightMat: null as MeshStandardMaterial | null, // 保存光材质的引用
  });

  const params = useRef({
    speedFactor: 0, // 速度因子
    initColor: new Color("#fff"), // 初始颜色
    speedupColor: new Color("#000"), // 加速颜色
    floorColor: new Color("#fff"), // 地板颜色
    floorNormalSpeed: 0, // 地板法线速度
    bloomIntensity: 1, // Bloom 强度
    bloomThreshold: 0.9, // Bloom 阈值
    lightOpacity: 1, // 光的不透明度
    floorEnvIntensity: 0, // 地板环境强度
    wheelRoughness: 1, // 轮子粗糙度
    wheelEnvIntensity: 5, // 轮子环境强度
  });

  /* 处理资源文件 */
  floorroughnessMap.colorSpace = LinearSRGBColorSpace; // 设置地板粗糙度贴图的色彩空间
  floorroughnessMap.wrapS = floorroughnessMap.wrapT = RepeatWrapping; // 设置地板粗糙度贴图的包裹方式
  floornormalMap.colorSpace = LinearSRGBColorSpace; // 设置地板法线贴图的色彩空间
  floornormalMap.wrapS = floornormalMap.wrapT = RepeatWrapping; // 设置地板法线贴图的包裹方式
  aoMap.flipY = false; // 设置AO贴图的翻转
  aoMap.colorSpace = LinearSRGBColorSpace; // 设置AO贴图的色彩空间
  aoMap.minFilter = NearestFilter; // 设置AO贴图的最小过滤
  aoMap.magFilter = NearestFilter; // 设置AO贴图的最大过滤
  aoMap.channel = 1; // 设置AO贴图的通道
  startRoomAoMap.flipY = false; // 设置起始房间AO贴图的翻转
  startRoomAoMap.channel = 1; // 设置起始房间AO贴图的通道
  startRoomAoMap.flipY = false; // 再次设置起始房间AO贴图的翻转（可能是重复）
  startRoomAoMap.colorSpace = LinearSRGBColorSpace; // 设置起始房间AO贴图的色彩空间
  lightMap.channel = 1; // 设置光贴图的通道
  lightMap.flipY = false; // 设置光贴图的翻转
  lightMap.colorSpace = SRGBColorSpace; // 设置光贴图的色彩空间

  const controlDom = useInteractStore((state) => state.controlDom); // 获取控制DOM元素
  const scene = useThree((state) => state.scene); // 获取Three.js的场景
  const bloomRef = useRef<any>(null); // 创建Bloom效果的引用
  const bodyColor = useGameStore((state) => state.bodyColor); // 获取车身颜色

  useGSAP(
    () => {
      if (!modelRef.current.bodyMat) return;
      const par = {
        color: modelRef.current.bodyMat.color,
        targetColor: new Color(bodyColor),
      };
      // const neoColor = new Color(bodyColor);
      gsap.to(par.color, {
        duration: 0.35,
        ease: "power1.out",
        r: par.targetColor.r,
        g: par.targetColor.g,
        b: par.targetColor.b,
        onUpdate: () => {
          modelRef.current.bodyMat!.color.set(par.color);
        },
      });
    },
    { dependencies: [bodyColor] }
  );

  useGSAP(
    () => {
      const baseParam = params.current;
      const lightMat = modelRef.current.lightMat;
      const flooMat = modelRef.current.floor?.material as MeshPhysicalMaterial;
      const wheel = modelRef.current.wheel;
      gsap.killTweensOf(baseParam);
      gsap.killTweensOf(floorUniforms.uColor.value);
      if (touch) {
        const t1 = gsap.timeline();
        // 动画：加速时的颜色变化
        t1.to(floorUniforms.uColor.value, {
          duration: 1.5,
          ease: "power1.in",
          r: baseParam.speedupColor.r,
          g: baseParam.speedupColor.g,
          b: baseParam.speedupColor.b,
        });

        // 动画：光的不透明度变化
        t1.to(
          baseParam,
          {
            duration: 1.5,
            ease: "power1.in",
            lightOpacity: 0,
            onUpdate: () => {
              lightMat && (lightMat.opacity = baseParam.lightOpacity);
            },
          },
          0
        );

        // 动画：其他参数变化
        t1.to(
          baseParam,
          {
            duration: 1.5,
            ease: "power1.in",
            speedFactor: 1,
            floorEnvIntensity: 0.5,
            bloomIntensity: 2,
            bloomThreshold: 0.1,
            wheelRoughness: 0,
            wheelEnvIntensity: 20,
            floorNormalSpeed: 1,
            onUpdate: () => {
              uniforms.uSpeedFactor.value = baseParam.speedFactor;
              flooMat &&
                (flooMat.envMapIntensity = baseParam.floorEnvIntensity);
              wheel.forEach((item) => {
                const mat = item.material as MeshStandardMaterial;
                mat.roughness = baseParam.wheelRoughness;
                mat.envMapIntensity = baseParam.wheelEnvIntensity;
              });
              bloomRef.current.intensity = baseParam.bloomIntensity;
              bloomRef.current.luminanceThreshold = baseParam.bloomThreshold;
            },
          },
          1
        );
      } else {
        const t2 = gsap.timeline();
        // 动画：恢复初始状态
        t2.to(baseParam, {
          duration: 1.5,
          ease: "power1.in",
          speedFactor: 0,
          floorEnvIntensity: 0,
          bloomIntensity: 1,
          bloomThreshold: 1,
          wheelRoughness: 1,
          wheelEnvIntensity: 5,
          floorNormalSpeed: 0,
          onUpdate: () => {
            uniforms.uSpeedFactor.value = baseParam.speedFactor;
            flooMat && (flooMat.envMapIntensity = baseParam.floorEnvIntensity);
            wheel.forEach((item) => {
              const mat = item.material as MeshStandardMaterial;
              mat.roughness = baseParam.wheelRoughness;
              mat.envMapIntensity = baseParam.wheelEnvIntensity;
            });
            bloomRef.current.intensity = baseParam.bloomIntensity;
            bloomRef.current.luminanceThreshold = baseParam.bloomThreshold;
          },
        });

        // 动画：恢复地板颜色
        t2.to(
          floorUniforms.uColor.value,
          {
            duration: 1.5,
            ease: "power1.in",
            r: baseParam.initColor.r,
            g: baseParam.initColor.g,
            b: baseParam.initColor.b,
          },
          "-=1"
        );

        // 动画：恢复光的不透明度
        t2.to(
          baseParam,
          {
            duration: 1.5,
            ease: "power1.in",
            lightOpacity: 1,
            onUpdate: () => {
              lightMat && (lightMat.opacity = baseParam.lightOpacity);
            },
          },
          "-=1"
        );
      }
    },
    { dependencies: [touch] }
  );

  const uniforms = useMemo(
    () => ({
      uTime: new Uniform(0), // 时间统一变量
      uSpeedFactor: new Uniform(0), // 速度因子统一变量
    }),
    []
  );

  const floorUniforms = useMemo(
    () => ({
      uColor: new Uniform(new Color("white")), // 地板颜色统一变量
      uReflectMatrix: new Uniform(new Matrix4()), // 反射矩阵统一变量
      uReflectTexture: new Uniform(new Texture()), // 反射纹理统一变量
      uReflectIntensity: new Uniform(15), // 反射强度统一变量
      uIntensity: new Uniform(1), // 强度统一变量
      uLevel: new Uniform(0), // 层级统一变量
      uResolution: new Uniform(new Vector2()), // 分辨率统一变量
      uTime: new Uniform(0), // 时间统一变量
    }),
    []
  );

  useControls("mimapLevel", {
    level: {
      min: 0,
      max: 10,
      value: 2.5,
      onChange: (value) => (floorUniforms.uLevel.value = value),
    },
    lightOpacity: {
      value: 1,
      min: 0,
      max: 1,
      onChange: (value) => {
        modelRef.current.lightMat!.opacity = value;
      },
    },
  });

  const handleModel = () => {
    const modelParts = flatModel(cargltf); // 获取平展后的汽车模型部分
    const modelParts2 = flatModel(startRommgltf); // 获取平展后的起始房间模型部分
    printModel(modelParts); // 打印汽车模型部分
    printModel(modelParts2); // 打印起始房间模型部分
    const body = modelParts[2] as THREE.Mesh; // 获取车身部分
    const bodyMat = body.material as THREE.MeshStandardMaterial; // 获取车身材质
    bodyMat.envMapIntensity = 5; // 设置车身环境贴图强度
    bodyMat.color = new Color("#26d6e9"); // 设置车身颜色
    modelParts.forEach((item: THREE.Mesh) => {
      if (item.isMesh) {
        const mat = item.material as THREE.MeshStandardMaterial;
        mat.aoMap = aoMap; // 设置AO贴图
      }
    });
    const wheel = modelParts[35] as THREE.Mesh; // 获取轮子部分
    wheel.children.forEach((child) => {
      const mesh = child as Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.envMapIntensity = 5; // 设置轮子环境贴图强度
      modelRef.current.wheel.push(mesh); // 保存轮子的引用
    });

    const light = modelParts2[1] as THREE.Mesh; // 获取光部分
    console.log("light", light);
    const lightMat = light.material as THREE.MeshPhysicalMaterial;
    lightMat.emissive = new Color("white"); // 设置光的发光颜色
    lightMat.toneMapped = false; // 设置光不进行色调映射
    lightMat.transparent = true; // 设置光透明
    // lightMat.alphaTest = 0.01;
    light.material = new MeshBasicMaterial({
      color: 0xffffff,
      side: DoubleSide,
      transparent: true,
      alphaTest: 0.01,
    });

    const floor = modelParts2[2] as THREE.Mesh; // 获取地板部分
    const floorMat = floor.material as THREE.MeshPhysicalMaterial;
    floorMat.roughnessMap = floorroughnessMap; // 设置地板粗糙度贴图
    floorMat.normalMap = floornormalMap; // 设置地板法线贴图
    floorMat.aoMap = startRoomAoMap; // 设置地板AO贴图
    floorMat.lightMap = lightMap; // 设置地板光贴图
    floorMat.envMapIntensity = 0; // 设置地板环境贴图强度

    const floorCsmMat = new CustomShaderMaterial({
      baseMaterial: floorMat,
      uniforms: floorUniforms,
      vertexShader: floorVertex,
      fragmentShader: floorFrag,
      silent: true,
    });

    floor.material = floorCsmMat; // 设置地板的自定义材质
    floorUniforms.uReflectTexture.value = renderTarget.texture; // 设置反射纹理
    renderTarget.texture.minFilter = LinearFilter; // 设置反射纹理的最小过滤
    renderTarget.texture.magFilter = LinearFilter; // 设置反射纹理的最大过滤
    floorUniforms.uReflectMatrix.value = matrix; // 设置反射矩阵

    modelRef.current.bodyMat = bodyMat; // 保存车身材质的引用
    modelRef.current.floor = floor; // 保存地板的引用
    modelRef.current.lightMat = light.material as MeshStandardMaterial; // 保存光材质的引用
  };

  const mat = useMemo(
    () =>
      new CustomShaderMaterial({
        baseMaterial: ShaderMaterial,
        uniforms,
        vertexShader,
        fragmentShader,
        silent: true,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  useModifyCSM(gltf, mat);

  useLayoutEffect(() => {
    handleModel();
    floorUniforms.uResolution.value.set(
      renderTarget.width,
      renderTarget.height
    );
    scene.environment = fbo.texture;
  }, []);

  useEffect(() => {
    useLoadedStore.setState({ ready: true });
  }, []);

  /* 生成环境贴图 */
  const { fbo, camera } = useCubeCamera({ resolution: 512 });
  fbo.texture.type = UnsignedByteType;
  fbo.texture.generateMipmaps = false;
  fbo.texture.minFilter = NearestFilter;
  fbo.texture.magFilter = NearestFilter;

  /* 最佳反射体验是使用屏幕大小。如果卡顿，请减少大小。 */
  const { matrix, renderTarget } = useReflect(modelRef.current.floor!, {
    resolution: [innerWidth, innerHeight],
    ignoreObjects: [modelRef.current.floor!, gltf.scene, startRommgltf.scene],
  });

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    floorUniforms.uTime.value += delta * params.current.floorNormalSpeed * 20;
    cargltf.scene.visible = false;
    camera.update(state.gl, scene);
    cargltf.scene.visible = true;
    modelRef.current.wheel.forEach((child) => {
      child.rotateZ(-delta * 30 * params.current.speedFactor);
    });
  });

  return (
    <>
      <OrbitControls domElement={controlDom} />
      <color attach="background" args={["#000"]} />
      {/* <ambientLight intensity={0.5} /> */}
      {/* <directionalLight position={[0, 10, 0]}></directionalLight> */}

      <primitive object={gltf.scene} />
      <primitive object={cargltf.scene} rotation-y={Math.PI} />
      <primitive object={startRommgltf.scene} />

      <EffectComposer
        disableNormalPass
        frameBufferType={UnsignedByteType}
        multisampling={2}
        enabled={true}
      >
        <Bloom
          luminanceThreshold={0.1}
          ref={bloomRef}
          blendFunction={BlendFunction.ADD}
          mipmapBlur
          radius={0.2}
          opacity={0.7}
        ></Bloom>
      </EffectComposer>
    </>
  );
};

export default Sketch3;