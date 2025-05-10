import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AboutMe from "./components/About Me";
import Projects from "./components/Projects";
import Devlogs from "./components/Devlogs";
import "./App.css";

import projectData from "./data/projects.json";

import {
  faGithub,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function App() {
  const projects = projectData;

  const pages = ["About Me", "Projects", "Devlogs"];

  const lastThreeProjects = projects.slice(-3).map((project) => ({
    ...project,
  }));

  const lastFiveDevlogs = projects.map((project) => ({
    name: project.name,
    devlogs: project.devlogs.slice(0, 5).map((log) => ({
      logNumber: log.logNumber,
      content: log.content,
      date: log.date,
    })),
  }));

  const links = [
    { name: "Github", link: "https://github.com/ZxsmDev", icon: faGithub },
    { name: "LinkedIn", link: "https://www.linkedin.com", icon: faLinkedin },
    { name: "Twitter", link: "https://twitter.com", icon: faXTwitter },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              pages={pages}
              lastThreeProjects={lastThreeProjects}
              links={links}
              lastFiveDevlogs={lastFiveDevlogs}
            />
          }
        />
        <Route path="/About Me" element={<AboutMe />} />
        <Route path="/projects" element={<Projects projects={projects} />} />
        <Route path="/devlogs" element={<Devlogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
