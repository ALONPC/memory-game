import React from "react";

import { Route, Routes } from "react-router-dom";
import { Welcome } from "./screens/Welcome/Welcome";
import { MemoryGame } from "./screens/MemoryGame/MemoryGame";

function App() {
  return (
    <div class="dark">
      <div className="layout">
        <Routes>
          <Route path="/" element={<Welcome></Welcome>}></Route>
          <Route path="/welcome" element={<Welcome></Welcome>}></Route>
          <Route path="/memoryGame" element={<MemoryGame></MemoryGame>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
