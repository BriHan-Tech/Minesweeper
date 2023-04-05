import { useEffect, useState, createContext } from "react";
import { AnimatePresence } from "framer-motion";

import "./App.scss";
import Board from "../Board/Board";
import Timer from "../Timer/Timer";
import Settings from "../Settings/Settings";
import { GameContext } from "./GameContext";
import { iGameSettings } from "../../interfaces/iGameSettings";
import GameFinishedPopup from "../GameFinishedPopup/GameFinishedPopup";

const App = () => {
  // "" = Game has not started
  // P = Progressing (Game is in progress)
  // L = Game Lost
  // W = Game Won
  // R = Reset Game
  const [gameStatus, setGameStatus] = useState<string>("");
  // const [gameSettings, setGameSettings] = useState<iGameSettings | null>(null);

  return (
    <GameContext.Provider value={{ gameStatus, setGameStatus }}>
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {(gameStatus == "W" || gameStatus == "L") && <GameFinishedPopup />}
      </AnimatePresence>

      <div className="container">
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
      </div>
    </GameContext.Provider>
  );
};

export default App;
