import React, { useLayoutEffect }from 'react';
import { useGLTF } from '@react-three/drei';

export const Robot = ({colorMap, normalMap, roughnessMap, metalnessMap, emissiveMap, aoMap}) => {
    const { scene, nodes, materials } = useGLTF('StandPose.gltf');
    console.log(nodes, scene, materials);
    useLayoutEffect(() => {
      Object.assign(materials[""], { 
        metalnessMap: metalnessMap,
        normalMap: normalMap,
        aoMap: aoMap,
        roughnessMap: roughnessMap,
        map: colorMap,
        emissiveMap: emissiveMap})
    }, [scene, nodes, materials, colorMap, normalMap, roughnessMap, metalnessMap, emissiveMap, aoMap]);

    console.log(materials);
    console.log(scene);
    return <primitive rotation-y = {Math.PI} object={scene} scale = {0.003} />
};