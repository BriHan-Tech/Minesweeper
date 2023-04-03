/**
 * Interface for the prop passed into the Cell Component.
 * The Cell Component contains:
 *    x: number                 Col the cell is in
 *    y: number                 Row the cell is in
 *    isClear: boolean          Cell should be blank or not
 *    isBomb: boolean           Cell is a bomb or not
 *    numBombs: number          Number of bombs surrounding the cell
 */
export default interface iCell {
  x: number;
  y: number;
  isClear: boolean;
  isMine: boolean;
  numMines: number;
}
