import React from "react";
import * as THREE from "three";
import {
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
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