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

declare global {
  interface Window {
    gsap: typeof gsap;
    ScrollTrigger: typeof ScrollTrigger;
  }
}

// Exposed for debugging from the browser console; no code reads these.
// Guarded because the prerender step evaluates this module under Node.
if (typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

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
