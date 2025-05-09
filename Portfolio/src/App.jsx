import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AboutMe from "./components/About Me";
import Projects from "./components/Projects";
import Devlogs from "./components/Devlogs";
import Resume from "./components/Resume";
import hellOrbitImage from "./images/ProjectBanners/HellOrbit.png";
import "./App.css";

function App() {
  const projects = [
    {
      name: "Hell Orbit",
      description: "Fast-paced JS browser roguelike.",
      image: hellOrbitImage,
      tech: {
        JavaScript: "text-yellow-500",
        P5js: "text-pink-800",
        Bootstrap5: "text-purple-800",
        FontAwesome: "text-blue-500",
      },
      repo: "https://github.com/ZxsmDev/HellOrbit",
    },
  ];

  const pages = ["About Me", "Projects", "Devlogs", "Resume"];
  const lastThreeProjects = projects.slice(-3).map((project) => ({
    ...project,
  }));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home pages={pages} lastThreeProjects={lastThreeProjects} />}
        />
        <Route path="/About Me" element={<AboutMe />} />
        <Route path="/projects" element={<Projects projects={projects} />} />
        <Route path="/devlogs" element={<Devlogs />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
