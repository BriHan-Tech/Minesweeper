import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";

import Backdrop from "../Backdrop/Backdrop";
import Slider from "../Slider/Slider";
import { dropDown } from "../../animations/popUpAnimations";
import { GameSettingsContext } from "../App/GameSettingsContext";
import { GameContext } from "../App/GameContext";
import {
  calculateMaxMines,
  calculateMaxCols,
  calculateMaxRows,
} from "../../logic/boardSizeCalculations";
import { CELL_SIZE, MIN_COLS, MIN_ROWS, MIN_MINES } from "../../constants";
import { iGameSettings } from "../../interfaces/iGameSettings";
import { iGameSettingsContext } from "../../interfaces/iGameSettings";
import "./Settings.scss";

// Animation configuration for the dropdown
const dropDownAnimation = {
  ...dropDown,
  visible: { ...dropDown.visible, y: "0%" },
};

const Settings = () => {
  // Context
  const { setGameStatus } = useContext<any>(GameContext);
  const { gameSettings, setGameSettings } =
    useContext<iGameSettingsContext>(GameSettingsContext);

  // For number of cols/rows calculations
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  // Duplicate of gameSettings that is changed when user interacts
  // with this component
  const [boardSettings, setBoardSettings] = useState<iGameSettings>(
    JSON.parse(JSON.stringify(gameSettings))
  );

  // Maximum values states
  const [maxMines, setMaxMines] = useState<number>(
    calculateMaxMines(boardSettings)
  );
  const [maxCols, setMaxCols] = useState<number>(
    calculateMaxCols(windowWidth, MIN_COLS)
  );
  const [maxRows, setMaxRows] = useState<number>(
    calculateMaxRows(windowHeight, MIN_ROWS)
  );

  // Function used to start the game
  const startGame = (): void => {
    setGameSettings(boardSettings);
    setGameStatus("S");
  };

  // Effect to handle window resize and update window width state
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect to update maximum cols when window width changes
  useEffect(() => {
    setMaxCols(calculateMaxCols(windowWidth, MIN_COLS));
  }, [windowWidth]);

  // Effect to update maximum rows when window height changes
  useEffect(() => {
    setMaxRows(calculateMaxRows(windowHeight, MIN_ROWS));
  }, [windowHeight]);

  // Effect to update maximum number of mines when board setting change
  useEffect(() => {
    setMaxMines(calculateMaxMines(boardSettings));
  }, [boardSettings]);

  return (
    // Main backdrop container
    <Backdrop>
      {/* Settings popup container */}
      <motion.div
        className="settings-popup"
        variants={dropDownAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Title */}
        <h1 className="settings-popup__title">
          👋 <br /> Welcome to Minesweeper!
        </h1>
        {/* Settings Section */}
        <div className="settings-popup__settings">
          {/* Number of Columns Slider */}
          <div className="settings-popup__settings__slider">
            <h3 className="settings-popup__settings__slider__label">
              Number of Columns
            </h3>
            <Slider
              min={MIN_COLS}
              max={maxCols}
              value={boardSettings.COLS}
              onChange={(val: number) => {
                setBoardSettings((prev: iGameSettings) => {
                  let tmp: iGameSettings = JSON.parse(JSON.stringify(prev));
                  tmp.COLS = val;
                  return tmp;
                });
              }}
            />
          </div>
          {/* Number of Rows Slider */}
          <div className="settings-popup__settings__slider">
            <h3 className="settings-popup__settings__slider__label">
              Number of Rows
            </h3>
            <Slider
              min={MIN_ROWS}
              max={maxRows}
              value={boardSettings.ROWS}
              onChange={(val: number) => {
                setBoardSettings((prev: iGameSettings) => {
                  let tmp: iGameSettings = JSON.parse(JSON.stringify(prev));
                  tmp.ROWS = val;
                  return tmp;
                });
              }}
            />
          </div>
          {/* Number of Mines Slider */}
          <div className="settings-popup__settings__slider">
            <h3 className="settings-popup__settings__slider__label">
              Number of Mines
            </h3>
            <Slider
              min={MIN_MINES}
              max={maxMines}
              value={boardSettings.NUM_MINES}
              onChange={(val: number) => {
                setBoardSettings((prev: iGameSettings) => {
                  let tmp: iGameSettings = JSON.parse(JSON.stringify(prev));
                  tmp.NUM_MINES = val;
                  return tmp;
                });
              }}
            />
          </div>
        </div>

        {/* Start Game Button */}
        <button className="btn" onClick={startGame}>
          Start Game!
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default Settings;
