export interface iGameSettings {
  COLS: number;
  ROWS: number;
  NUM_MINES: number;
}

export interface iGameSettingsContext {
  gameSettings: iGameSettings;
  setGameSettings: React.Dispatch<React.SetStateAction<iGameSettings>> | any;
}
