import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";

import Backdrop from "../Backdrop/Backdrop";
import Slider from "../Slider/Slider";
import { dropDown } from "../../animations/popUpAnimations";
import { GameSettingsContext } from "../App/GameSettingsContext";
import { GameContext } from "../App/GameContext";
import { CELL_SIZE, MIN_COLS, MIN_ROWS, MIN_MINES } from "../../constants";
import { iGameSettings } from "../../interfaces/iGameSettings";
import { iGameSettingsContext } from "../../interfaces/iGameSettings";
import "./Settings.scss";

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

  // Duplicate of gameSettings that is changed
  const [boardSettings, setBoardSettings] = useState<iGameSettings>(
    JSON.parse(JSON.stringify(gameSettings))
  );

  const calculateMaxMines = (): number => {
    return Math.min(
      Math.floor((boardSettings.COLS * boardSettings.ROWS) / 2),
      boardSettings.COLS * boardSettings.ROWS - 30
    );
  };

  const calculateMaxCols = (): number => {
    return Math.floor(windowWidth / CELL_SIZE) - 1;
  };

  const calculateMaxRows = (): number => {
    return Math.floor(windowHeight / CELL_SIZE) - 1;
  };

  // Maximum values
  const [maxMines, setMaxMines] = useState<number>(calculateMaxMines());
  const [maxCols, setMaxCols] = useState<number>(calculateMaxCols());
  const [maxRows, setMaxRows] = useState<number>(calculateMaxRows());

  const startGame = (): void => {
    setGameSettings(boardSettings);
    setGameStatus("S");
  };

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

  useEffect(() => {
    setMaxCols(calculateMaxCols());
  }, [windowWidth]);

  useEffect(() => {
    setMaxRows(calculateMaxRows());
  }, [windowHeight]);

  useEffect(() => {
    setMaxMines(calculateMaxMines());
  }, [boardSettings]);

  return (
    <Backdrop>
      <motion.div
        className="settings-popup"
        variants={dropDownAnimation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="settings-popup__title">
          👋 <br /> Welcome to Minesweeper!
        </h1>
        <div className="settings-popup__settings">
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

        <button className="btn" onClick={startGame}>
          Start Game!
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default Settings;
