import React from 'react'
import './App.css';
import Scene from './3d/3d'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <div className="App" style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Canvas shadows={true} style={{ background: "black" }}>
        <Scene></Scene>
      </Canvas>

    </div>
  );
}

export default App;
