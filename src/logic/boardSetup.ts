import { clickedCellWithNumMinesZero } from "./gameLogic";
import { isInBounds } from "./helpers";

import iCell from "../interfaces/iCell";
import iPos from "../interfaces/iPos";

let COLS: number;
let ROWS: number;
let NUM_MINES: number;

/**
 * Initializes and sets up board when the user first clicks.
 * Note that the deep copy of the board is essential.
 *
 * @param {iCell[][]} board - 2D array for current state of board
 * @param {number} num_mines - number of mines that should be on the board
 * @param {iPos} initialCick - the position of the users first click
 * @returns {iCell[][]} - 2D array with the correct board setup
 */
const boardSetup = (
  board: iCell[][],
  num_mines: number,
  initialCick: iPos
): iCell[][] => {
  COLS = board.length;
  ROWS = board[0].length;
  NUM_MINES = num_mines;

  // Get a deep copy of the board
  let tmp: iCell[][] = JSON.parse(JSON.stringify(board));

  // 2D Array to keep track of Mines planted
  let mineField: number[][] = Array(COLS)
    .fill(0)
    .map(() => Array(ROWS).fill(0));

  // Set up the 2D array with mines
  _setMines(mineField, initialCick.x, initialCick.y);

  // Get the mine counts of each cell
  _getMineCounts(mineField);

  // Populate the board with number and mine.
  tmp.map((col, i) =>
    col.map((cell, j) => {
      cell.numMines = mineField[i][j];
      cell.isMine = mineField[i][j] >= 1000;
      return cell;
    })
  );

  // Let the board be clicked at the original position
  return clickedCellWithNumMinesZero(initialCick, tmp);
};

/**
 * Private function that goes around the minefield, assigning numbers to cells.
 *
 * @param {number[][]} mineField - 2D array that represents the minefield
 */
const _getMineCounts = (mineField: number[][]) => {
  // Find cells with mines
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      // If Cell has mine
      if (mineField[i][j] >= 1000) {
        // Label the cells around it with mine count
        for (let x = i - 1; x <= i + 1; x++) {
          for (let y = j - 1; y <= j + 1; y++) {
            if (isInBounds(COLS, ROWS, { x: x, y: y })) {
              mineField[x][y]++;
            }
          }
        }
      }
    }
  }
};

/**
 * Private function that plants mines in the minefield appropriately.
 * That means there is a 3-by-3 block around the user's first click
 * where mines can not be planted.
 *
 * Cells with 1000 or over mean that there IS a mine there
 *
 * @param {number[][]} mineField - 2D array that represents minefield
 * @param {number} initX  - x position of initial user click
 * @param {number} initY  - y position of initial user click
 */
const _setMines = (mineField: number[][], initX: number, initY: number) => {
  // Create a square around the initial click
  // These cells, labeled -1 can NOT have a mine in them.
  for (let i = initX - 2; i <= initX + 2; i++) {
    for (let j = initY - 2; j <= initY + 2; j++) {
      if (i >= 0 && j >= 0 && i < COLS && j < ROWS) {
        mineField[i][j] = -1;
      }
    }
  }

  // Put mines in 2D Array
  // Mines are symbolized with the number 1000
  for (let i = 0; i < NUM_MINES; i++) {
    let x: number = Math.floor(Math.random() * COLS);
    let y: number = Math.floor(Math.random() * ROWS);

    while (mineField[x][y] >= 1000 || mineField[x][y] === -1) {
      x = Math.floor(Math.random() * COLS);
      y = Math.floor(Math.random() * ROWS);
    }
    mineField[x][y] = 1000;
  }

  // Clean Up
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      mineField[i][j] = Math.max(0, mineField[i][j]);
    }
  }
};

export default boardSetup;
