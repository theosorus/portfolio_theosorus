import "./App.css";
import NavBar from "./components/NavBar";
import Skills from "./components/Skills";

function App() {
  return (
    <>
      <main className="flex flex-col items-center pt-14">
        <NavBar />
        <Skills></Skills>
      </main>
    </>
  );
}

export default App;
