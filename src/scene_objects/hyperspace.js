import React from "react";
import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, CylinderGeometry, SphereGeometry } from "three";

extend({ ShaderMaterial, CylinderGeometry, SphereGeometry });

function HyperSpace() {
  const { size } = useThree();

  useFrame((state, delta) => {
    shaderMaterial.uniforms.u_time.value += delta;
    // Update the 'resolution' uniform with the canvas size
    shaderMaterial.uniforms.u_resolution.value.set(size.width, size.height);
  });

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
    },
    vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    void main() {
      vUv = vec2(position.x/20.0, position.y/100.0);
      vNormal = normalize(normalMatrix * normal);
      vPosition = vec3(modelMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
        `,
    fragmentShader: `
        
    // Author:
    // Title:
    
    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    varying vec2 vUv;

    // 2D Random
    float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                             vec2(12.9898,78.233)))
                     * 43758.5453123);
    }
    
    float random (in float x) {
        return fract(sin(x)*1e4);
    }
    
    // Based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
    float noise (in vec3 p) {
        const vec3 step = vec3(110.0, 241.0, 171.0);
    
        vec3 i = floor(p);
        vec3 f = fract(p);
    
        // For performance, compute the base input to a
        // 1D random from the integer part of the
        // argument and the incremental change to the
        // 1D based on the 3D -> 1D wrapping
        float n = dot(i, step);
    
        vec3 u = f * f * (3.0 - 2.0 * f);
        return mix( mix(mix(random(n + dot(step, vec3(0,0,0))),
                            random(n + dot(step, vec3(1,0,0))),
                            u.x),
                        mix(random(n + dot(step, vec3(0,1,0))),
                            random(n + dot(step, vec3(1,1,0))),
                            u.x),
                    u.y),
                    mix(mix(random(n + dot(step, vec3(0,0,1))),
                            random(n + dot(step, vec3(1,0,1))),
                            u.x),
                        mix(random(n + dot(step, vec3(0,1,1))),
                            random(n + dot(step, vec3(1,1,1))),
                            u.x),
                    u.y),
                u.z);
    }
    
    #define OCTAVES 9
    float fbm (in vec2 st) {
        // Initial values
        float value = 0.0;
        float amplitude = .2;
        float frequency = 0.;
        //
        // Loop of octaves
        for (int i = 0; i < OCTAVES; i++) {
            value += amplitude * noise(vec3(st,0.12));
            st *= 2.;
            amplitude *= .5;
        }
        return value;
    }




    void main() {
        // Time variable (can be provided as a uniform or computed based on the application)
        // Scrolling offset speed (adjust as needed)
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
    


        // Calculate the spiral angle based on time and the spiral speed
        float angle = u_time * 0.01;
    
        // Calculate the x and y components of the direction vector using sine and cosine functions
        // float dx = cos(angle) * 0.2; // 0.2 is the initial x-component of the direction vector
        // float dy = sin(angle) * 0.2; // 0.2 is the initial y-component of the direction vector
    
        // Create the direction vector with the updated components
        vec3 direction = vec3(0.0, 0.0 + -0.2, 0.9);



        // vec3 pos = vec3(st*5.560,u_time*0.604);
    
        // vec2 direction = vec2(0.00, -0.034); // Move right
    // vec2 direction = vec2(-1.0, 0.0); // Move left
    // vec2 direction = vec2(0.5, 0.0); // Move right, slower
    
        vec3 displacement = direction * u_time *3.0;
        vec3 pos = (vec3(vUv,1.0)) + displacement;
    
        
        
        // Calculate the noise value based on the screen's horizontal coordinate and time
        // float noiseValue = noise(gl_FragCoord.xy * 0.01 + u_time * scrollSpeed);
    
         vec3 color =  vec3(0.0, 0.2, 0.6);
         color += fbm(pos.xy*8.00);

        gl_FragColor = vec4(color, 1.0);
    }
        `,
  });

  const radius = 20;
  const height = -1200;
  const radialSegments = 50;
  const heightSegments = 1; 
  const geometry = new THREE.CylinderGeometry(
    radius,
    radius,
    height,
    radialSegments,
    heightSegments
  );

  const position = geometry.attributes.position;
  const uv = geometry.attributes.uv;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const angle = Math.atan2(z, x);
    uv.setXY(i, angle / (2 * Math.PI) + 0.5, position.getY(i) / height);
  }
  return (
    <group>
      <mesh material={shaderMaterial} rotation={[0, 0, (-Math.PI * 3) / 2]} >
        <cylinderGeometry args={[radius, radius, height, radialSegments, heightSegments]} />
      </mesh>

      <mesh position={[height/2.20, 0, 0]} rotation={[0, (-Math.PI*3) / 2, 0]}>
        <circleGeometry args={[radius/1.1, radialSegments]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      <mesh position={[-height/2.20, 0, 0]} rotation={[0, (Math.PI *3) / 2, 0]} >
        <circleGeometry args={[radius, radialSegments]} />
        <meshStandardMaterial emissive="white" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>




  );
}

export default HyperSpace;