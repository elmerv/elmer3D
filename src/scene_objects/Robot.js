import React, { useLayoutEffect }from 'react';
import { useGLTF } from '@react-three/drei';

export const Robot = ({colorMap, normalMap, roughnessMap, metalnessMap, emissiveMap, aoMap}) => {
    const { scene, nodes, materials } = useGLTF('StandPose.gltf');
    useLayoutEffect(() => {
      Object.assign(materials[""], { 
        metalnessMap: metalnessMap,
        normalMap: normalMap,
        aoMap: aoMap,
        roughnessMap: roughnessMap,
        map: colorMap,
        emissiveMap: emissiveMap})
    }, [scene, nodes, materials, colorMap, normalMap, roughnessMap, metalnessMap, emissiveMap, aoMap]);
    return <primitive rotation-y = {Math.PI} object={scene} scale = {0.003} />
};