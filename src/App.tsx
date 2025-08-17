import "./App.css";
import NavBar from "./components/NavBar";
import Skills from "./components/Skills";
import Projects from "./components/ProjectsPage";
import PreviewProjects from "./components/PreviewProjects";
import AboutMe from "./components/AboutMe";
import projectsData from './data/projects.json';
import { Project } from "./type";
import LandPage from "./components/LandPage";
import Career from "./components/Career";
import Footer from "./components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

(window as any).gsap = gsap;
(window as any).ScrollTrigger = ScrollTrigger;

function App() {
  return (
    <>
      <main className="flex flex-col items-center pt-14">
        <NavBar />
        
        <LandPage />
        <AboutMe />
        <Career />
        <Projects/>
        <Footer />
        
        
        
        {/* Uncomment the following lines if you want to include Skills and PreviewProjects components */}
        {/* <Skills /> */}


        


      </main>
    </>
  );
}

export default App;
