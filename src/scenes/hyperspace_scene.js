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

function HyperSpaceScene() {
  return (
    <>
      <directionalLight
        castShadow
        position={[8, 15, 5]}
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      <pointLight color="blue" intensity={3} position={[0, 0, 0]} />
      <axesHelper />

      <HyperSpace/>
      <OrbitControls target={[0, 3, 0]} />
      <PerspectiveCamera position={[10, 1.5, 0]} fov={60} makeDefault />
    </>
  );
}
export default HyperSpaceScene;