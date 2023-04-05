import { isInBounds } from "./helpers";

import iCell from "../interfaces/iCell";
import iPos from "../interfaces/iPos";

/**
 *
 * @param clickPos
 * @param board
 * @returns
 */
export const clickedCellWithNumMinesZero = (
  clickPos: iPos,
  board: iCell[][]
): iCell[][] => {
  // Set up DFS
  // Set up a deep copy of the board
  let tmp: iCell[][] = JSON.parse(JSON.stringify(board));
  let stack: iPos[] = [clickPos];
  let history: Set<string> = new Set();

  // DFS
  while (stack.length > 0) {
    const pos: iPos = stack[0];
    stack.shift();

    // If the position can be cleared and the position
    // has not already been cleared
    if (
      isInBounds(board.length, board[0].length, pos) &&
      tmp[pos.x][pos.y].numMines <= 0 &&
      !history.has(JSON.stringify(pos))
    ) {
      tmp[pos.x][pos.y].isClicked = true;

      for (let x = pos.x - 1; x <= pos.x + 1; x++) {
        for (let y = pos.y - 1; y <= pos.y + 1; y++) {
          if (isInBounds(board.length, board[0].length, { x: x, y: y })) {
            tmp[x][y].isClicked = true;
            stack.push({ x: x, y: y });
          }
        }
      }

      history.add(JSON.stringify({ x: pos.x, y: pos.y }));
    }
  }
  return tmp;
};

/**
 * Gets a board and checks if the user won or not
 *
 * @param {iCell[][]} board - the board to be checked
 * @returns {boolean} - user win
 */
export const isGameWon = (board: iCell[][]): boolean => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (!board[i][j].isClicked && !board[i][j].isMine) return false;
    }
  }
  return true;
};
