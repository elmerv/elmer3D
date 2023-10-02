import React, { useLayoutEffect, useEffect } from "react";
import { useFBX, useGLTF, useTexture, useAnimations } from "@react-three/drei";

export const Robot = ({
  colorMap,
  normalMap,
  roughnessMap,
  metalnessMap,
  emissiveMap,
  aoMap,
}) => {
  const { scene } = useGLTF("StandPose.gltf");
  // useLayoutEffect(() => {
  //   Object.assign(materials[""], {
  //     metalnessMap: metalnessMap,
  //     normalMap: normalMap,
  //     aoMap: aoMap,
  //     roughnessMap: roughnessMap,
  //     map: colorMap,
  //     emissiveMap: emissiveMap})
  // }, [scene, nodes, materials, colorMap, normalMap, roughnessMap, metalnessMap, emissiveMap, aoMap]);
  // return <primitive rotation-y = {Math.PI} object={scene} scale = {0.003} />
  let texture = useTexture("clank_texture.png");
  let clankFbx = useFBX("Floating.fbx");
  const { animations } = clankFbx;

  const { actions, names } = useAnimations(animations, clankFbx);
  actions[names[names.length - 1]].play();

  clankFbx.traverse((child) => {
    if (child.isMesh) {
      child.material.map = texture; // Apply the texture to the material
    }
  });
  return (
    <group rotation-y={Math.PI / 2} scale={0.006}>
      <primitive object={clankFbx} />
    </group>
  );
};
