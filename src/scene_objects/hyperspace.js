import { Cylinder } from "@react-three/drei"
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";

export default function HyperSpace(){
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms:{
            time: { value: 0 },
        }, 
        vertexShader: `
        `,
        fragmentShader: `
            uniform float uTime;
            uniform vec2 uResolution;
        
            float noise(vec2 uv) {
                return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
            }
            void main() {
                vec2 uv = gl_FragCoord.xy / uvResolution.xy;
                vec2 p = uv - 0.5;
                float len = length(p) * 2.0;

                // Adding noise to distort lines
                float n = noise(uv * 8.0 + uTime * 0.1);
                p += p * n * 0.5;

                float intensity = smoothstep(0.4, 0.45, len);
                gl_FragColor = vec4(vec3(intensity), 1.0);
            }
        `
        
    })
    return (
        <Cylinder args={[20, 20, 1200, 1200]} position={[-100, 5, 0]} rotation={[0, 0, - Math.PI * 3/2]}>
            <meshPhysicalMaterial color="green" side={THREE.DoubleSide}/>
        </Cylinder>
    )
}