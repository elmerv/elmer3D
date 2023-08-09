import React from "react";
import "./App.css";
import HyperSpaceScene from "./scenes/hyperspace_scene";
import IntroScene from "./scenes/intro_scene";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import SectionLabel from "./content-components/sectionLabel";
import SectionComponent from "./content-components/sectionComponent";
import SectionHeaderImage from "./content-components/sectionHeaderImage";
import SectionCGHw from "./content-components/sectionCGHw";

function App() {
  const hyperSpaceContent = (
    <div className="App" style={{ width: "100%", height: "40vh" }}>
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
  );
  const JetTrackerCotent = (
    <div className="App" style={{ width: "100%", height: "40vh" }}>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/8M5LUVmH0e0"
        title="JetStreamer Video Demo - CSE  115A"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );

  const projectInfo = {
    hyperSpace: {
      projectTitle: "HyperSpace with Shader (GLSL) and Three.JS",
      projectDescription: `This project is still in the works. My goal is to create an accurate representation of the hyperspace effect
      using GLSL and Three.JS. The canvas contains orbital controls so you can see how everything works. I relied on the book of shader to implement
      noise and I added the effect of direction. I also used bloompass postprocessing to add glowing effect at the end of hyperspace. I need to figure out how to move noise
      in a spiral direction and how to make noise mix between different shades of blue. `,
    },
    JetTracker: {
      projectTitle: "JetTracker Capstone Project @ UCSC",
      projectDescription: `Jet Tracker is a capstone project I worked on with a team of 4. Jet Tracker keeps celebrities accountable for 
      their C02 jet emissions by tracking their flights every month and how much C02 is used in each flight. I worked on setting up the mongodb database during our early sprints, but
      transitioned into frontend in order to make sure our data was viewable in a user-friendly way.`,
    },
  };
  return (
    <>
      <div className="App" style={{ width: "100%", height: "75vh" }}>
        <Canvas shadows={true} style={{ background: "black" }}>
          <IntroScene></IntroScene>
        </Canvas>
      </div>
      <SectionHeaderImage></SectionHeaderImage>
      <SectionLabel content="Projects"></SectionLabel>

      <SectionComponent
        content={hyperSpaceContent}
        projectTitle={projectInfo.hyperSpace.projectTitle}
        projectDescription={projectInfo.hyperSpace.projectDescription}
      ></SectionComponent>
      <SectionComponent
        content={JetTrackerCotent}
        projectTitle={projectInfo.JetTracker.projectTitle}
        projectDescription={projectInfo.JetTracker.projectDescription}
      ></SectionComponent>
      <SectionLabel content=" CSE 160: Introduction to Computer Graphics Coursework"></SectionLabel>
      <SectionCGHw></SectionCGHw>
    </>
  );
}

export default App;
