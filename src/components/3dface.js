import React, { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";

export const Face = ({
  colorMap,
  normalMap,
  roughnessMap,
  metalnessMap,
  emissiveMap,
  aoMap,
}) => {
  const { scene, nodes, materials } = useGLTF("3d_face/3d_face.gltf");
  return <primitive object={scene} scale={0.8} />;
};
