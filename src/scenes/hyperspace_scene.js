import React, { Suspense } from "react";
import * as THREE from "three";
import {
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Plane,
  Text3D,
  PointLight,
} from "@react-three/drei";
import { useLoader, extend } from "@react-three/fiber";
import { BackSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Robot } from "../scene_objects/Robot";
import { Face } from "../scene_objects/3dface";
import HyperSpace from "../scene_objects/hyperspace";
import { NabooSpaceShip } from "../scene_objects/nabooSpaceShip";

function CameraHelper() {
  const camera = new PerspectiveCamera(60, 1, 1, 3);
  return <cameraHelper args={[camera]} />;
}

function HyperSpaceScene() {
  
  // const texture = useLoader(THREE.TextureLoader, "./Snow_002_DISP.png");
  // const normalTexture = useLoader(THREE.TextureLoader, "./Snow_002_NORM.jpg");
  // const colorTexture = useLoader(THREE.TextureLoader, "./snowdirt_03.jpg");





  return (
    <>
      <directionalLight
        castShadow
        position={[8, 15, 5]}
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      <pointLight color="blue" intensity={3} position={[0, 0, 0]} />
      {/* <mesh position={[0, 0, 0]} castShadow>
        <NabooSpaceShip />
      </mesh>      */}
      {/* <Stars toneMapped={true} /> */}
      {/* <Plane
        position={[0, 1.6, 0]}
        receiveShadow
        rotation-x={Math.PI / 2}
        args={[64, 64, 1024, 1024]}
      >
        <meshStandardMaterial
          side={BackSide}
          attach="material"
          color="white"
          displacementScale={4}
          displacementMap={texture}
          map={colorTexture}
          normalMap={normalTexture}
          metalness={0.2}
          depthWrite={false}
        />
      </Plane> */}
      <axesHelper />

      <HyperSpace/>
      <OrbitControls target={[0, 3, 0]} />
      <PerspectiveCamera position={[10, 1.5, 0]} fov={60} makeDefault />
    </>
  );
}
export default HyperSpaceScene;