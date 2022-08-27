import React, {Suspense} from 'react'
import { useRef, useState } from 'react'
import {OrbitControls, PerspectiveCamera, Stars, Plane, useTexture, Text3D, Shadow} from "@react-three/drei";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {useFrame, Canvas, useLoader } from '@react-three/fiber'
import { BackSide, DoubleSide, FrontSide, ShadowMaterial, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'
import { Robot } from '../components/Robot';
import * as THREE from "three";

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
  
      <boxGeometry args={[9, 9, 9]} />
      <meshPhongMaterial side = {DoubleSide} color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
function ModelLoader(props){
    const gltf = useLoader(GLTFLoader, 'StandPose.gltf');
    // const props = useTexture({
    //   map: 'PavingStones092_1K_Color.jpg',
    //   displacementMap: 'PavingStones092_1K_Displacement.jpg',
    //   normalMap: 'PavingStones092_1K_Normal.jpg',
    //   roughnessMap: 'PavingStones092_1K_Roughness.jpg',
    //   aoMap: 'PavingStones092_1K_AmbientOcclusion.jpg',
    // });
    // return <primitive {...props} object={obj} />
    return <primitive {...props} object={gltf.scene} scale = {0.001}/>

      // <mesh>
        {/* <meshStandardMaterial {...props} /> */}

      // </mesh>
        
}

function CameraHelper(){
  const camera = new PerspectiveCamera(60,1,1,3);
  return <cameraHelper args = {[camera]}/>;
}
export default function Scene(){
    const [colorMap, normalMap, roughnessMap, metalnessMap, emissiveMap, aoMap] = useLoader(THREE.TextureLoader, [ 
      './small-robot/textures/Body_albedo.jpg',
      './small-robot/textures/Body_normal.jpg', 
      './small-robot/textures/Body_roughness.jpg', 
      './small-robot/textures/Body_metallic.jpg',
      './small-robot/textures/Body_emissive.jpg',
      './small-robot/textures/Body_AO.jpg'
    ]) 
    // const texture = useTexture('./Snow_002_DISP.png')

    const texture = useLoader(THREE.TextureLoader, './Snow_002_DISP.png');
    const normalTexture = useLoader(THREE.TextureLoader, './Snow_002_NORM.jpg');
    const colorTexture = useLoader(THREE.TextureLoader, './snowdirt_03.jpg');

    return(
    <div style={{ position: "relative", width: "100%", height: "90vh" }}>
      <Canvas shadows = {true} style={{ background: "black" }} >
          {/* <ambientLight intensity={1} /> */}
          <directionalLight castShadow position={[8, 15, 5]} shadow-mapSize-height = {512} shadow-mapSize-width = {512} /> 
          {/* <pointLight castShadow intensity = {2} position={[0, 3, 4]} /> */}
          {/* {/* <Box position={[-1.2, 0, 0]} /> */}
          {/* <Box receiveShadow position={[0, 0, 0]}  scale = {6}/> */}

          <mesh castShadow>          
            <Robot
            colorMap={colorMap} 
            normalMap={normalMap} 
            roughnessMap={roughnessMap} 
            metalnessMap={metalnessMap}
            emissiveMap = {emissiveMap}
            aoMap = {aoMap}
            />
          </mesh>

          <Text3D castShadow font={'IBM Plex Sans_Bold.json'} position = {[0,3,4]} rotation-y = {Math.PI/2}>
            Welcome!
            <meshStandardMaterial />
          </Text3D>
          {/* <ModelLoader scale = {0.002}></ModelLoader> */}
          <Stars />
          <Plane position = {[0,1.6,0]} receiveShadow rotation-x={Math.PI / 2} args={[64, 64, 1024, 1024]}>
            <meshStandardMaterial side = {BackSide} attach="material" color = "white" displacementScale={4} displacementMap ={texture} map = {colorTexture} normalMap = {normalTexture} metalness={0.2} />
          </Plane>
          {/* <axesHelper /> */}
          <OrbitControls />
          <PerspectiveCamera position={[9, 0.5, 0]} makeDefault />

      </Canvas>
    </div>
    )
}

