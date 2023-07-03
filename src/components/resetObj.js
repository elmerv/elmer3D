import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Face } from "./3dface";
import { Robot } from "./Robot";
const ResettableFace = () => {
  const meshRef = useRef();

  // Reset the position, rotation, and scale of the mesh
  const resetMesh = () => {
    if (meshRef.current) {
      meshRef.current.position.set(0, 0, 0);
      meshRef.current.rotation.set(0, 0, 0);
      meshRef.current.scale.set(1, 1, 1);
    }
  };

  useFrame(() => {
    // Call the resetMesh function in your desired scenario
    // For example, on a button click or based on certain conditions
    resetMesh();
  });

  return (
    <>
      <mesh ref={meshRef} castShadow>
        <Robot />
      </mesh>
      <mesh ref={meshRef} castShadow>
        <Face />
      </mesh>
    </>
  );
};

export default ResettableFace;
