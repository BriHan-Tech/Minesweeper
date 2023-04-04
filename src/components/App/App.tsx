import { useEffect, useState, createContext } from "react";

import "./App.scss";
import Board from "../Board/Board";
import Timer from "../Timer/Timer";
import { GameContext } from "./GameContext";

const App = () => {
  // "" = Game has not started
  // P = Progressing (Game is in progress)
  // L = Game Lost
  // W = Game Won
  // R = Reset Game
  const [gameStatus, setGameStatus] = useState<string>("");

  return (
    <div className="container">
      <GameContext.Provider value={{ gameStatus, setGameStatus }}>
        <div className="toolbar">
          <Timer />
          <button
            className="toolbar__reset_button"
            onClick={() => {
              setGameStatus("R");
            }}
          >
            Reset
          </button>
        </div>
        <Board />
      </GameContext.Provider>
    </div>
  );
};

export default App;
