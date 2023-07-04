import React, { useLayoutEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { extend, useFrame } from "react-three-fiber";
import { ShaderMaterial } from "three";
import * as THREE from "three";

extend({ ShaderMaterial });

export const Face = () => {
  const meshRef = useRef();

  const { scene, nodes } = useGLTF("3d_face/3d_face.gltf");
  console.log(nodes);
  // Animation loop
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.time.value += delta;
    }
  });

  const holographicMaterial = new ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Vector3(1, 0.5, 0.5) }, // Adjust the color as needed
      opacity: { value: 0.8 }, // Adjust the opacity as needed
      time: { value: 0 },
    },
    vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      uniform float time;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float noise = abs(sin(uv.x * 100.0 + time * 0.5));
        float distortion = pow(noise, 3.0) * 0.2;
        vec4 holographicColor = vec4(color, opacity) * (1.0 - distortion);
        gl_FragColor = mix(holographicColor, vec4(0.0), distortion);
      }
    `,
  });

  return (
    <mesh
      rotation-z={Math.PI / 2}
      rotation-x={-Math.PI / 2}
      position={[0, 70, 0]}
      castShadow
    >
      <primitive object={scene} scale={0.8} />
    </mesh>
  );
};
