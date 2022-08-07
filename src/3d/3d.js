import React from 'react'
import { useRef, useState } from 'react'
import {OrbitControls } from "@react-three/drei";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import {useFrame, Canvas, useLoader } from '@react-three/fiber'
function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
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
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
function ModelLoader(props){
    const obj = useLoader(OBJLoader, 'StandPose.obj')
    return <primitive {...props} object={obj} />
}
export default function Scene(){
    return(
    <div style={{ position: "relative", width: "100%", height: 800 }}>
      <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <OrbitControls />
          {/* {/* <Box position={[-1.2, 0, 0]} /> */}
          <Box position={[0, 0, 0]}  scale = {6}/>
          <ModelLoader rotation = {[0,90,0]} scale = {0.002}></ModelLoader>
          <mesh position={[0, 0.2, 0]} rotation = {[180,0,0]}>
            <planeBufferGeometry attach="geometry"  args={[5, 5]}/>
            <meshPhongMaterial attach="material" color="green" />
          </mesh>
      </Canvas>
    </div>
    )
}

