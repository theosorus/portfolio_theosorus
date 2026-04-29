import "./App.css";
import NavBar from "./components/NavBar";
import Projects from "./components/ProjectsPage";
import AboutMe from "./components/AboutMe";
import LandPage from "./components/LandPage";
import Career from "./components/Career";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="flex flex-col items-center pt-14 bg-bg">
      <NavBar />
      <LandPage />
      <AboutMe />
      <Career />
      <Projects />
      <Footer />
    </main>
  );
}

export default App;
