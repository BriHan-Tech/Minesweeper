import { useContext, useState, useEffect, ChangeEvent } from "react";
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
  const { setGameStatus } = useContext<any>(GameContext);
  const { gameSettings, setGameSettings } =
    useContext<iGameSettingsContext>(GameSettingsContext);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [boardSettings, setBoardSettings] = useState<iGameSettings>(
    JSON.parse(JSON.stringify(gameSettings))
  );

  const maxCols = (): number => {
    return Math.floor(windowWidth / CELL_SIZE);
  };

  const maxRows = (): number => {
    return Math.floor(windowHeight / CELL_SIZE);
  };

  const maxMines = (): number => {
    return Math.min(
      Math.floor((boardSettings.COLS * boardSettings.ROWS) / 2),
      boardSettings.COLS * boardSettings.ROWS - 30
    );
  };

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
              max={maxCols()}
              value={boardSettings.COLS}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setBoardSettings((prev: iGameSettings) => {
                  let tmp: iGameSettings = JSON.parse(JSON.stringify(prev));
                  tmp.COLS =
                    Number(e.target.value) < MIN_COLS
                      ? MIN_COLS
                      : Number(e.target.value) > maxCols()
                      ? maxCols()
                      : Number(e.target.value);
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
              max={maxRows()}
              value={boardSettings.ROWS}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setBoardSettings((prev: iGameSettings) => {
                  let tmp: iGameSettings = JSON.parse(JSON.stringify(prev));
                  tmp.ROWS =
                    Number(e.target.value) < MIN_ROWS
                      ? MIN_COLS
                      : Number(e.target.value) > maxRows()
                      ? maxRows()
                      : Number(e.target.value);
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
              max={maxMines()}
              value={boardSettings.NUM_MINES}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setBoardSettings((prev: iGameSettings) => {
                  let tmp: iGameSettings = JSON.parse(JSON.stringify(prev));
                  tmp.NUM_MINES =
                    Number(e.target.value) < MIN_MINES
                      ? MIN_MINES
                      : Number(e.target.value) > maxMines()
                      ? maxMines()
                      : Number(e.target.value);
                  return tmp;
                });
              }}
            />
          </div>
        </div>

        <button className="popup__btn" onClick={startGame}>
          Start Game!
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default Settings;
