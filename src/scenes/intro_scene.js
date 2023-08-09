import React from "react";
import * as THREE from "three";
import {
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Text3D,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { BackSide } from "three";
import { Robot } from "../scene_objects/Robot";
import { Face } from "../scene_objects/3dface";

export default function IntroScene() {
  const texture = useLoader(THREE.TextureLoader, "./Snow_002_DISP.png");
  const normalTexture = useLoader(THREE.TextureLoader, "./Snow_002_NORM.jpg");
  const colorTexture = useLoader(THREE.TextureLoader, "./snowdirt_03.jpg");

  return (
    <>
      <directionalLight
        castShadow
        position={[8, 15, 5]}
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      <Text3D
        castShadow
        font={"IBM Plex Sans_Bold.json"}
        position={[-8, 4, -1.5]}
        rotation-y={Math.PI / 2}
      >
        Hello! I'm Elmer,
        <meshStandardMaterial />
      </Text3D>
      <Text3D
        castShadow
        font={"IBM Plex Sans_Bold.json"}
        position={[-8, 3, -1.5]}
        rotation-y={Math.PI / 2}
      >
        a recent CS new grad from
        <meshStandardMaterial />
      </Text3D>
      <Text3D
        castShadow
        font={"IBM Plex Sans_Bold.json"}
        position={[-8, 2, -1.5]}
        rotation-y={Math.PI / 2}
      >
        UC Santa Cruz.
        <meshStandardMaterial color={"yellow"}/>
      </Text3D>
      <mesh position={[0, 0, 0]} castShadow>
        <Robot />
      </mesh>
      <Face />
      <Plane
        position={[0, 1.6, 0]}
        receiveShadow
        rotation-x={Math.PI / 2}
        args={[256, 256, 1024, 1024]}
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
        />
      </Plane>
      <axesHelper />

      <OrbitControls target={[0, 4, 0]} />
      <PerspectiveCamera position={[9,2, 0]} fov={50} makeDefault />
    </>
  );
}