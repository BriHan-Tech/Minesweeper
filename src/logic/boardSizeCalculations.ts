import { iGameSettings } from "../interfaces/iGameSettings";
import { CELL_SIZE } from "../constants";

/**
 * Calculate the maximum number of mines allowed on the board
 * based on board settings.
 *
 * @param {iGameSettings} boardSettings
 * @returns {number}
 */
export const calculateMaxMines = (boardSettings: iGameSettings): number => {
  return Math.min(
    Math.floor((boardSettings.COLS * boardSettings.ROWS) / 2),
    boardSettings.COLS * boardSettings.ROWS - 30
  );
};

/**
 * Calculate maximum number of columns based on scren size.
 * Math.max() prevents bug where minimum > maximum.
 *
 * @param {number} windowWidth
 * @param {number} minCols
 * @returns {number}
 */
export const calculateMaxCols = (
  windowWidth: number,
  minCols: number
): number => {
  return Math.max(Math.floor(windowWidth / CELL_SIZE) - 1, minCols);
};

/**
 * Calculate maximum number of rows based on screen size.
 * Math.max() prevents bug where minimum > maximum.
 *
 * @param {number} windowHeight
 * @param {number} minRows
 * @returns {number}
 */
export const calculateMaxRows = (
  windowHeight: number,
  minRows: number
): number => {
  return Math.max(Math.floor(windowHeight / CELL_SIZE) - 1, minRows);
};
