import React, { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import { material, shader } from "gltf-pipeline/lib/ForEach";

extend({ ShaderMaterial });

export const Face = () => {

  const { scene, nodes } = useGLTF("3d_face/3d_face.gltf");
  console.log(nodes);
  // Assuming you have a single mesh with a single geometry in your scene
  const mesh = scene.children.find((child) => child.isMesh);
  const geometry = mesh.geometry;

  // Access the UV attribute
  const uvAttribute = geometry.getAttribute('uv');

  // Check the UV coordinates
  console.log(uvAttribute);

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      lineCount: { value: 7 },
      lineWidth: { value: 0.9 },
      lineColor: { value: new THREE.Vector3(72, 95, 190) }, // Adjust the color as needed
    },
    vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
    uniform float lineCount;
    uniform float lineWidth;
    uniform vec3 lineColor;

    void main() {
      float lineInterval = 1.0 / lineCount;
      float lineIndex = floor(gl_FragCoord.y / lineWidth);
      float linePosition = mod(gl_FragCoord.y, lineWidth);

      if (linePosition < lineInterval) {
        gl_FragColor = vec4(lineColor, 1.0);
      } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); // Transparent
      }
    }
  `,
  });
  
  return (
    <mesh
      // material={holographicMaterial}
      rotation-z={Math.PI / 2}
      rotation-x={-Math.PI / 2}
      position={[0, 70, 0]}
      geometry={nodes.Scene_07.geometry}
      castShadow
      receiveShadow
      material={shaderMaterial}
    >
      {/* <meshStandardMaterial
        color="blue"
        attach= "material"
      /> */}
      {/* <primitive object={scene} scale={0.8} /> */}

    </mesh>
  );
};
