import "./App.css";
import NavBar from "./components/NavBar";
import Projects from "./components/ProjectsPage";
import AboutMe from "./components/AboutMe";
import LandPage from "./components/LandPage";
import Career from "./components/Career";
import Footer from "./components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 import TravelGlobe from "./components/TravelGlobe";
// import Skills from "./components/Skills";

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
         <TravelGlobe />
        {/* <Skills /> */}
        <Projects/>
        <Footer />
        
        
        
        {/* Uncomment the following lines if you want to include Skills and PreviewProjects components */}
        {/* <Skills /> */}


        


      </main>
    </>
  );
}

export default App;
