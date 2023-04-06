import { createContext } from "react";
import { iGameStatus } from "../../interfaces/iGameStatus";

export enum GameState {
  Prologue,
  Starting,
  Progressing,
  Lost,
  Won,
}

export const GameContext = createContext<iGameStatus>({
  gameStatus: GameState.Prologue,
  setGameStatus: {},
});
