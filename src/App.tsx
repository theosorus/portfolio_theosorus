import "./App.css";
import NavBar from "./components/NavBar";
import Skills from "./components/Skills";
import Projects from "./components/Projects"; 

function App() {
  return (
    <>
      <main className="flex flex-col items-center pt-14">
        <NavBar />
        <Projects/>
      </main>
    </>
  );
}

export default App;
