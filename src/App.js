import Cookies from "js-cookie";

import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Welcome } from "./screens/Welcome/Welcome";
import { MemoryGame } from "./screens/MemoryGame/MemoryGame";

function App() {
  const goToFirstScreen = () => {
    return Cookies.get("playerName") ? (
      <MemoryGame></MemoryGame>
    ) : (
      <Welcome></Welcome>
    );
  };

  return (
    <div class="dark">
      <div className="layout">
        <Routes>
          <Route path="/" element={goToFirstScreen()}></Route>
          <Route path="/welcome" element={<Welcome></Welcome>}></Route>
          <Route path="/memoryGame" element={<MemoryGame></MemoryGame>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
