import React, { useRef } from 'react';
import * as THREE from "three";
import { Cylinder } from "@react-three/drei"
import { extend, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial } from "three";

extend({ ShaderMaterial });

export default function HyperSpace(){
    const { size } = useThree();
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          resolution: { value: new THREE.Vector2() }, // Will be updated in the component
        },
        vertexShader: `
          uniform float time;
          uniform vec2 resolution;
      
          void main() {
            vec3 transformed = position;
            float distortion = sin(time * 0.5) * 0.1;
            transformed.x += sin(transformed.y * 3.0 + time) * distortion;
            transformed.y += sin(transformed.x * 3.0 + time) * distortion;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec2 resolution;
      
          float noise(vec2 uv) {
            return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
          }
      
          void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy; // Change uvResolution to resolution
            vec2 p = uv - 0.5;
            float len = length(p) * 2.0;
      
            // Adding noise to distort lines
            float n = noise(uv * 8.0 + time * 0.1); // Change uTime to time
            p += p * n * 0.5;
      
            float intensity = smoothstep(0.4, 0.45, len);
            gl_FragColor = vec4(vec3(intensity), 1.0);
          }
        `,
    });
    const materialRef = useRef();

    useFrame(({ clock }) => {
        if (materialRef.current) {
          // Update the 'time' uniform with the elapsed time from the clock
          materialRef.current.uniforms.time.value = clock.getElapsedTime();
          // Update the 'resolution' uniform with the canvas size
          materialRef.current.uniforms.resolution.value.copy(size);
        }
      });      
    return (
        <Cylinder args={[20, 20, -1200, 1200]} position={[-100, 5, 0]} rotation={[0, 0, - Math.PI * 3/2]} material = {shaderMaterial}>
            {/* <meshPhysicalMaterial color="green" side={THREE.DoubleSide}/> */}
        </Cylinder>
    )
}