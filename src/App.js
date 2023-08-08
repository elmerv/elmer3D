import React from "react";
import "./App.css";
import HyperSpaceScene from "./scenes/hyperspace_scene";
import IntroScene from "./scenes/intro_scene";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  SSAO,
  Bloom,
  GodRays,
} from "@react-three/postprocessing";
import SectionLabel from "./content-components/sectionLabel";
import SectionComponent from "./content-components/sectionComponent";
import SectionHeaderImage from "./content-components/sectionHeaderImage";
function App() {
  const hyperSpaceContent = (
    <div
    className="App"
    style={{ width: "100%", height: "40vh" }}
  >
    <Canvas shadows={true} style={{ background: "black" }}>
      <HyperSpaceScene></HyperSpaceScene>
      <EffectComposer>
        <Bloom
          intensity={1.0}
          luminanceThreshold={1}
          luminanceSmoothing={0.2}
          height={150}
        />
      </EffectComposer>
    </Canvas>
  </div>
  )
  const projectInfo = {
    hyperSpace: {
      projectTitle: "HyperSpace with Shader (GLSL) and Three.JS",
      projectDescription: `This project is still in the works. My goal is to create an accurate representation of the hyperspace effect
      using GLSL and Three.JS. The canvas contains orbital controls so you can see how everything works. I relied on the book of shader to implement
      noise and I added the effect of direction. I also used bloompass postprocessing to add glowing effect at the end of hyperspace. I need to figure out how to move noise
      in a spiral direction and how to make noise mix between different shades of blue. `
    }
  }
  return (
    <>
      <div
        className="App"
        style={{ width: "100%", height: "60vh" }}
      >
        <Canvas shadows={true} style={{ background: "black" }}>
          <IntroScene></IntroScene>
        </Canvas>
      </div>
      <SectionHeaderImage></SectionHeaderImage>
      <SectionLabel content = "Projects" ></SectionLabel>

      <SectionComponent children = {hyperSpaceContent} projectTitle = {projectInfo.hyperSpace.projectTitle} projectDescription = {projectInfo.hyperSpace.projectDescription}></SectionComponent>
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
    </>
  );
}

export default App;
