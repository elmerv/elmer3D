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
    varying vec3 vUv;
    void main() {
      vUv = position;
      vNormal = normalize(normalMatrix * normal);
      vPosition = vec3(modelMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix* vec4(position, 1.0);
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
    varying vec3 vUv;

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
    
    #define OCTAVES 20
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

    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
         return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r)
    {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise(vec3 v)
      {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    
    // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;
    
    // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
    
      //   x0 = x0 - 0.0 + 0.0 * C.xxx;
      //   x1 = x0 - i1  + 1.0 * C.xxx;
      //   x2 = x0 - i2  + 2.0 * C.xxx;
      //   x3 = x0 - 1.0 + 3.0 * C.xxx;
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
      vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
    
    // Permutations
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    
    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
      float n_ = 0.142857142857; // 1.0/7.0
      vec3  ns = n_ * D.wyz - D.xzx;
    
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
    
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
    
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
    
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
    
      //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
      //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
    
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
    
    //Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
    
    // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
      }







    void main() {
        // Time variable (can be provided as a uniform or computed based on the application)
        // Scrolling offset speed (adjust as needed)    
    

        float scrollSpeed = 1.0; // Adjust the scrolling speed as needed
        float timeOffset = u_time * scrollSpeed;

        // Create the direction vector with the updated components
        vec3 direction = vec3(0.0, 20.0, 10.0);
    
        vec3 displacement = direction * u_time;

        vec3 pos = vUv + displacement;
         vec3 color =  vec3(0.0, 0.2, 0.6);
         color += snoise(pos/15.0);

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