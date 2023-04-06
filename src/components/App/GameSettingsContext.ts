import { createContext } from "react";
import {
  iGameSettingsContext,
  iGameSettings,
} from "../../interfaces/iGameSettings";

const defaultValue: iGameSettingsContext = {
  gameSettings: {
    COLS: 8,
    ROWS: 10,
    NUM_MINES: 5,
  },
  setGameSettings: {},
};

export const GameSettingsContext =
  createContext<iGameSettingsContext>(defaultValue);
