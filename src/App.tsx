import "./App.css";
import NavBar from "./components/NavBar";
import Skills from "./components/Skills";
import Projects from "./components/ProjectsPage";
import PreviewProjects from "./components/PreviewProjects";

import projectsData from './data/projects.json';
import { Project } from "./type";
import LandPage from "./components/LandPage";
import ContactUs from "./components/Contact";

function App() {
  return (
    <>
      <main className="flex flex-col items-center pt-14">
        <NavBar />
        {/* <Projects/> */}
        {/* <Skills></Skills> */}
        {/* <PreviewProjects></PreviewProjects> */}
        {/* <LandPage></LandPage> */}
        <ContactUs></ContactUs>
        

      </main>
    </>
  );
}

export default App;
