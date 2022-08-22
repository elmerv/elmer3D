import { Environment, Stage } from '@react-three/drei' 
import { useLoader } from '@react-three/fiber'; 
import { Robot } from '../components/Robot'; 
import { TextureLoader } from 'three/src/loaders/TextureLoader'; 
 
export const Scene = ({currentColor}) => { 
  const [colorMap, normalMap, roughnessMap, metalnessMap] = useLoader(TextureLoader, [ 
    './small-robot/textures/Body_baseColor.jpeg',
    './small-robot/textures/Body_normal.jpeg', 
    '.small-robot/textures/Body_metallicRoughness.png', 
    '.small-robot/textures/Body_emissive.jpeg', 
  ]) 
  return ( 
    <mesh> 
        <Robot  
            map={colorMap} 
            normalMap={normalMap} 
            roughnessMap={roughnessMap} 
            metalnessMap={metalnessMap}
            emissiveMap = {emissiveMap}  
        /> 
    </mesh> 
  ) 
} 
