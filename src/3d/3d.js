import React from 'react'
import { useRef, useState } from 'react'
import {OrbitControls, PerspectiveCamera, Stars, Plane, useTexture} from "@react-three/drei";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {useFrame, Canvas, useLoader } from '@react-three/fiber'
import { DoubleSide, TextureLoader } from 'three';
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
      <meshStandardMaterial side = {DoubleSide} color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
function ModelLoader(props){
    const obj = useLoader(OBJLoader, 'StandPose.obj');
    const props = useTexture({
      map: 'PavingStones092_1K_Color.jpg',
      displacementMap: 'PavingStones092_1K_Displacement.jpg',
      normalMap: 'PavingStones092_1K_Normal.jpg',
      roughnessMap: 'PavingStones092_1K_Roughness.jpg',
      aoMap: 'PavingStones092_1K_AmbientOcclusion.jpg',
    });
    return (
      <mesh>
        <primitive {...props} object={obj} />
        <meshStandardMaterial {...props} />

      </mesh>
        
    )
}

function CameraHelper(){
  const camera = new PerspectiveCamera(60,1,1,3);
  return <cameraHelper args = {[camera]}/>;
}
export default function Scene(){
    return(
    <div style={{ position: "relative", width: "100%", height: 800 }}>
      <Canvas  style={{ background: "black" }} >
          <ambientLight intensity={2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> 
          <pointLight position={[-10, -10, -10]} />
          {/* {/* <Box position={[-1.2, 0, 0]} /> */}
          {/* <Box position={[0, 0, 0]}  scale = {6}/> */}
          <ModelLoader rotation = {[0,90,0]} scale = {0.002}></ModelLoader>
          {/* <mesh position={[0, 0, 0]}  rotation={[Math.PI / 2, 0, 0]}>
            <planeBufferGeometry attach="geometry"  args={[5, 5]}/>
            <meshStandardMaterial side = {DoubleSide} color="green" />
          </mesh> */}
          <Stars />
          <Plane rotation-x={Math.PI / 2} args={[100, 100, 4, 4]}>
            <meshBasicMaterial color="blue" wireframe />
          </Plane>
          <axesHelper />
          <OrbitControls />
          <PerspectiveCamera position={[5, 3, 5]} makeDefault />

    </Canvas>
    </div>
    )
}

