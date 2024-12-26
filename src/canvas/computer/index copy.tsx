import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, Preload, useGLTF, useVideoTexture } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Group } from "three";

import { CanvasLoading } from "@/components/loading";
import texture1 from "@/assets/video/home-about-project-texture1.mp4";

type DeveloperProps = {
  texture?: string;
};

const ComputerCanvas = ({ texture }: DeveloperProps) => {
  const group = useRef<Group>(null);
  const { nodes, materials } = useGLTF("/models/computer/index.glb") as any;
  const videoTexture = useVideoTexture(texture || texture1);

  useEffect(() => {
    if (videoTexture) videoTexture.flipY = false;
  }, [videoTexture]);

  useGSAP(() => {
    if (group.current) {
      gsap.from(group.current.rotation, {
        y: Math.PI / 2,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, [videoTexture]);

  useGLTF.preload("/models/computer/index.glb");

  return (
    <group scale={2} position={[-0.5, -3, 0]} rotation={[0, -0.1, 0]}>
      <group ref={group} dispose={null}>
        <mesh
          geometry={nodes["monitor-screen"].geometry}
          material={nodes["monitor-screen"].material}
          position={[0.127, 1.831, 0.511]}
          rotation={[1.571, -0.005, 0.031]}
          scale={[0.661, 0.608, 0.401]}
        >
          <meshBasicMaterial map={videoTexture} toneMapped={false} />
        </mesh>
        <group
          position={[0, 1.093, 0]}
          rotation={[-Math.PI / 2, 0, -0.033]}
          scale={0.045}
        >
          <group
            position={[5.658, 1.643, 0.812]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.923, 0.855, 0.855]}
          />
          {/* Additional screen groups can be added here */}
        </group>
        <group
          position={[0.266, 1.132, 0.051]}
          rotation={[0, -0.033, 0]}
          scale={[0.042, 0.045, 0.045]}
        >
          <mesh geometry={nodes["Monitor-B-_computer_0_1"].geometry} material={materials.computer} />
          <mesh geometry={nodes["Monitor-B-_computer_0_2"].geometry} material={materials.base__0} />
          <mesh geometry={nodes["Monitor-B-_computer_0_3"].geometry} material={materials.Material_36} />
          <mesh geometry={nodes["Monitor-B-_computer_0_4"].geometry} material={materials.Material_35} />
          <mesh geometry={nodes["Monitor-B-_computer_0_5"].geometry} material={materials.Material_34} />
          <mesh geometry={nodes["Monitor-B-_computer_0_6"].geometry} material={materials.keys} />
          <mesh geometry={nodes["Monitor-B-_computer_0_7"].geometry} material={materials.keys2} />
          <mesh geometry={nodes["Monitor-B-_computer_0_8"].geometry} material={materials.Material_37} />
        </group>
      </group>
    </group>
  );
};

const Developer = ({ texture }: DeveloperProps) => {
  return (
    <Canvas className="cursor-pointer">
      <ambientLight intensity={Math.PI} />
      <directionalLight position={[10, 10, 5]} />
      <Center>
        <Suspense fallback={<CanvasLoading />}>
          <ComputerCanvas texture={texture} />
        </Suspense>
      </Center>
      <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
      <Preload all />
    </Canvas>
  );
};

export default Developer;