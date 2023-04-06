import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Board from "../Board/Board";
import Toolbar from "../Toolbar/Toolbar";
import Settings from "../Settings/Settings";
import GameFinishedPopup from "../GameFinishedPopup/GameFinishedPopup";
import { GameContext, GameState } from "./GameContext";
import { GameSettingsContext } from "./GameSettingsContext";
import { iGameSettings } from "../../interfaces/iGameSettings";

import "./App.scss";

/**
 * Main component for the Minesweeper game
 *
 * @returns {JSX.Element} The JSX element representing the Minesweeper game.
 */
const App = (): JSX.Element => {
  const [gameStatus, setGameStatus] = useState<number>(GameState.Prologue);

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
          {gameStatus === GameState.Prologue && <Settings />}
          {/* Render GameFinishedPoopup component when game is won or lost*/}
          {(gameStatus === GameState.Won || gameStatus === GameState.Lost) && (
            <GameFinishedPopup />
          )}
        </AnimatePresence>

        {/* Render game interface when game is starting/in progress/lost/won */}
        {gameStatus !== GameState.Prologue && (
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
