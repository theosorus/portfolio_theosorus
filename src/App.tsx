import "./App.css";
import NavBar from "./components/NavBar";
import Projects from "./components/ProjectsPage";
import AboutMe from "./components/AboutMe";
import LandPage from "./components/LandPage";
import Career from "./components/Career";
import Footer from "./components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Analytics } from "@vercel/analytics/react"
// import Skills from "./components/Skills";

gsap.registerPlugin(ScrollTrigger);

(window as any).gsap = gsap;
(window as any).ScrollTrigger = ScrollTrigger;

function App() {
  return (

    <>
    <Analytics />
    <main className="flex flex-col items-center pt-14 bg-bg">
      <NavBar />
      <LandPage />
      <AboutMe />
      <Career />
      <Projects />
      <Footer />
    </main>
    </>
  );
}

export default App;
