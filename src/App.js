import React from 'react'
import './App.css';
import Scene from './scene/scene'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, SSAO, Bloom, GodRays} from "@react-three/postprocessing";

function App() {
  return (
    <div className="App" style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Canvas shadows={true} style={{ background: "black" }}>
        <Scene></Scene>

        <EffectComposer>
          <Bloom intensity={0.3}  luminanceThreshold={0} luminanceSmoothing={0.2}  height={150} />
        </EffectComposer>
      </Canvas>
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "80%",
          color: "blue"
        }}
      >
        <Example/>
      </div> */}
    </div>
  );
}

export default App;
