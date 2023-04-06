import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Board from "../Board/Board";
import Timer from "../Timer/Timer";
import Settings from "../Settings/Settings";
import GameFinishedPopup from "../GameFinishedPopup/GameFinishedPopup";
import { GameContext } from "./GameContext";
import { GameSettingsContext } from "./GameSettingsContext";
import { iGameSettings } from "../../interfaces/iGameSettings";
import { CELL_SIZE } from "../../constants";
import reset from "../../assets/imgs/reset.svg";
import mineLineArt from "../../assets/imgs/mine-lineart.svg";
import "./App.scss";

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
          <div
            className="toolbar"
            style={{
              width: `${CELL_SIZE * gameSettings.COLS}px`,
            }}
          >
            <div className="toolbar__left">
              <span className="toolbar__left__mine-count">
                <img
                  src={mineLineArt}
                  alt="mines"
                  className="toolbar__left__mine-count__icon"
                />
                {gameSettings.NUM_MINES}
              </span>
              <Timer />
            </div>
            <motion.button
              className="toolbar__reset-btn"
              style={{
                backgroundImage: `url(${reset})`,
              }}
              whileHover={{
                rotate: 360,
                transition: { duration: 0.1, ease: "linear" },
              }}
              onClick={() => {
                setGameStatus("");
              }}
            ></motion.button>
          </div>
          <Board />
        </div>
      </GameContext.Provider>
    </GameSettingsContext.Provider>
  );
};

export default App;
