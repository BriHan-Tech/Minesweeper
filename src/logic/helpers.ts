import iPos from "../models/iPos";

/**
 * Checks whether the current position is in bounds or not
 *
 * @param col - Max number of columns
 * @param row - Max number of rows
 * @param pos - Position in question
 * @returns {boolean} - Whether the current position is in bounds or not
 */
export const isInBounds = (col: number, row: number, pos: iPos): boolean => {
  if (pos.x >= 0 && pos.x < col && pos.y >= 0 && pos.y < row) {
    return true;
  }
  return false;
};
