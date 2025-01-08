import * as kokomi from "kokomi.js";
import * as THREE from "three";

import World from "./World/World";
import Debug from "./Debug";
import Postprocessing from "./Postprocessing";
import { resources } from "./resources";

function createExperience(sel = "#sketch") {
  const experience = new kokomi.Base(sel, {
    autoAdaptMobile: true, // 自动适应移动端
  });

  (window as any).experience = experience;

  // 初始化参数
  const params = {
    speed: 0, // 速度
    cameraPos: {
      x: 0,
      y: 0.8,
      z: -11,
    },
    isCameraMoving: false, // 相机是否移动
    lightAlpha: 0, // 光线的 alpha 值
    lightIntensity: 0, // 光线强度
    envIntensity: 0, // 环境强度
    envWeight: 0, // 环境权重
    reflectIntensity: 0, // 反射强度
    lightOpacity: 1, // 光线不透明度
    floorLerpColor: 0, // 地板颜色过渡
    carBodyEnvIntensity: 1, // 车身环境强度
    cameraShakeIntensity: 0, // 相机抖动强度
    bloomLuminanceSmoothing: 1.6, // Bloom 亮度平滑
    bloomIntensity: 1, // Bloom 强度
    speedUpOpacity: 0, // 加速不透明度
    cameraFov: 33.4, // 相机视野
    furinaLerpColor: 0, // Furina 颜色过渡
    isRushing: false, // 是否在加速
    disableInteract: false, // 禁用交互
    isFurina: window.location.hash === "#furina", // 是否为 Furina 模式
  };

  const debug = new Debug(); // 调试实例

  experience.renderer.toneMapping = THREE.CineonToneMapping; // 设置色调映射为 Cineon

  // 过滤资源
  let resourcesToLoad = resources;
  if (!params.isFurina) {
    resourcesToLoad = resourcesToLoad.filter(
      (item) => !["driving", "decal"].includes(item.name)
    );
  }
  console.log(resourcesToLoad);

  // 资源管理器实例
  const am = new kokomi.AssetManager(experience, resourcesToLoad, {
    useMeshoptDecoder: true,
  });

  // 设置相机参数
  const camera = experience.camera as THREE.PerspectiveCamera;
  camera.fov = params.cameraFov;
  camera.updateProjectionMatrix();
  const cameraPos = new THREE.Vector3(
    params.cameraPos.x,
    params.cameraPos.y,
    params.cameraPos.z
  );
  camera.position.copy(cameraPos);
  const lookAt = new THREE.Vector3(0, 0.8, 0);
  camera.lookAt(lookAt);

  // 初始化相机控制
  const controls = new kokomi.CameraControls(experience);
  controls.controls.setTarget(lookAt.x, lookAt.y, lookAt.z);
  experience.controls = controls;

  const world = new World(experience); // 世界实例
  const post = new Postprocessing(experience); // 后处理实例

  // 更新函数，用于调试相机位置
  // experience.update(() => {
  //   const target = new THREE.Vector3();
  //   console.log(JSON.stringify(controls.controls.getPosition(target)));
  // });

  // 更新函数，用于控制相机移动
  experience.update(() => {
    if (params.isCameraMoving) {
      controls.controls.enabled = false;
      controls.controls.setPosition(
        params.cameraPos.x,
        params.cameraPos.y,
        params.cameraPos.z
      );
    } else {
      controls.controls.enabled = true;
    }
  });

  // 返回用于调试和访问的对象
  return {
    experience,
    params,
    controls,
    world,
    debug,
    am,
    post,
  };
}

export default createExperience;