import React from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { ShaderMaterial } from "three";

extend({ ShaderMaterial });

export const Face = () => {
  const { nodes } = useGLTF("3d_face/3d_face.gltf");

  useFrame((state, delta) => {
    shaderMaterial.uniforms.time.value += delta;
  });

  const shaderMaterial = new THREE.ShaderMaterial({
    blending: THREE.AdditiveBlending,
    uniforms: {
      lineCount: { value: 5 },
      lineWidth: { value: 0.9 },
      lineColor: { value: new THREE.Vector3(0.286, 0.392, 0.745) },
      ambientLightColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
      directionalLightColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
      directionalLightDirection: { value: new THREE.Vector3(-1.0, 1.0, 1.0) },
      emissive: 0xBDD8FF,
      emissiveIntensity: 2,
      time: { value: 0 },
      cascadeSpeed: { value: 10 },
      cascadeHeight: { value: 10.0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = vec3(modelMatrix * vec4(position, 1.0));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float lineCount;
      uniform float lineWidth;
      uniform vec3 lineColor;
      uniform vec3 ambientLightColor;
      uniform vec3 directionalLightColor;
      uniform vec3 directionalLightDirection;
      uniform float time;
      uniform float fadeDuration;
      uniform float cascadeSpeed;
      uniform float cascadeHeight;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDirection = normalize(directionalLightDirection);
        float diffuse = max(dot(normal, lightDirection), 0.0);
        vec3 lighting = ambientLightColor + diffuse * directionalLightColor;
  
        float lineInterval = 0.2 / lineCount;
        float lineIndex = floor(gl_FragCoord.y / (lineWidth));
        float linePosition = mod(gl_FragCoord.y, lineWidth);
  
        float cascadeStartY = mod(time * cascadeSpeed, cascadeHeight);
        float cascadeEndY = cascadeStartY + cascadeHeight;

        // Calculate the y-coordinate within the cascade region
        float cascadeY = mod(gl_FragCoord.y + time * cascadeSpeed, cascadeHeight);

        // Map the cascadeY to a brightness value
        float brightness = 1.0 - smoothstep(0.0, 0.1, abs(cascadeY - cascadeHeight * 0.5));

        // Check if the fragment is inside the cascade region
        bool insideCascadeRegion = cascadeY >= cascadeStartY && cascadeY <= cascadeEndY;

        if (linePosition < lineInterval) {
          float brightness = gl_FragCoord.y / (lineCount * lineWidth);
          brightness = pow(brightness, 3.0); // Adjust the brightness curve
          brightness = smoothstep(0.0, 1.0, brightness); // Apply smoothstep for a gradual transition
  
  
          vec3 phongColor = lighting;
          vec3 phongSpecularColor = vec3(1.0, 1.0, 1.0);
          float phongShininess = 30.0;
  
          vec3 viewDirection = normalize(-vPosition);
          vec3 reflectDirection = reflect(-lightDirection, normal);
          float specular = pow(max(dot(reflectDirection, viewDirection), 0.0), phongShininess);

          gl_FragColor = vec4(lineColor * (phongColor + specular * phongSpecularColor) * (insideCascadeRegion ? brightness : brightness * 0.8), 1.0);
        } else {
          // Apply a fallback color outside the desired interval
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        }
      }
    `,
  });
  
  return (
    <mesh
      rotation-z={Math.PI / 2}
      rotation-x={-Math.PI / 2}
      position={[2, 3, -8]}
      geometry={nodes.Scene_07.geometry}
      castShadow
      receiveShadow
      scale={0.02}
      material={shaderMaterial}
    >
    </mesh>
  );
};
