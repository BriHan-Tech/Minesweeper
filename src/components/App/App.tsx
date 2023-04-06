import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Board from "../Board/Board";
import Toolbar from "../Toolbar/Toolbar";
import Settings from "../Settings/Settings";
import GameFinishedPopup from "../GameFinishedPopup/GameFinishedPopup";
import { GameContext } from "./GameContext";
import { GameSettingsContext } from "./GameSettingsContext";
import { iGameSettings } from "../../interfaces/iGameSettings";
import "./App.scss";

const App = () => {
  // "" = Game has not started
  // S = Game starting
  // P = Progressing (Game is in progress)
  // L = Game Lost
  // W = Game Won
  const [gameStatus, setGameStatus] = useState<string>("");

  // Game settings state
  const [gameSettings, setGameSettings] = useState<iGameSettings>({
    COLS: 8,
    ROWS: 10,
    NUM_MINES: 5,
  });

  return (
    <GameSettingsContext.Provider value={{ gameSettings, setGameSettings }}>
      <GameContext.Provider value={{ gameStatus, setGameStatus }}>
        {/* AnimatePresence component for managing animations */}
        <AnimatePresence initial={false} onExitComplete={() => null}>
          {/* Render settings component when game has not been started */}
          {gameStatus === "" && <Settings />}
          {/* Render GameFinishedPoopup component when game is won or lost*/}
          {(gameStatus === "W" || gameStatus === "L") && <GameFinishedPopup />}
        </AnimatePresence>

        {/* Render game interface when game is starting/in progress/lost/won */}
        {gameStatus !== "" && (
          <div className="container">
            {/* Render toolbar */}
            <Toolbar />
            {/* Render board component */}
            <Board />
          </div>
        )}
      </GameContext.Provider>
    </GameSettingsContext.Provider>
  );
};

export default App;
