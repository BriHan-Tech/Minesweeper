import { useEffect, useState, createContext } from "react";
import { AnimatePresence } from "framer-motion";

import "./App.scss";
import Board from "../Board/Board";
import Timer from "../Timer/Timer";
import Settings from "../Settings/Settings";
import { GameContext } from "./GameContext";
import { GameSettingsContext } from "./GameSettingsContext";
import { iGameSettings } from "../../interfaces/iGameSettings";
import GameFinishedPopup from "../GameFinishedPopup/GameFinishedPopup";

const App = () => {
  // "" = Game has not started
  // S = Game starting
  // P = Progressing (Game is in progress)
  // L = Game Lost
  // W = Game Won
  const [gameStatus, setGameStatus] = useState<string>("");
  const [gameSettings, setGameSettings] = useState<iGameSettings>({
    COLS: 8,
    ROWS: 10,
    NUM_MINES: 5,
  });

  return (
    <GameSettingsContext.Provider value={{ gameSettings, setGameSettings }}>
      <GameContext.Provider value={{ gameStatus, setGameStatus }}>
        <AnimatePresence initial={false} onExitComplete={() => null}>
          {gameStatus === "" && <Settings />}
          {(gameStatus === "W" || gameStatus === "L") && <GameFinishedPopup />}
        </AnimatePresence>

        <div className="container">
          <div className="toolbar">
            <Timer />
            <button
              className="toolbar__reset_button"
              onClick={() => {
                setGameStatus("");
              }}
            >
              Reset
            </button>
          </div>
          <Board />
        </div>
      </GameContext.Provider>
    </GameSettingsContext.Provider>
  );
};

export default App;
