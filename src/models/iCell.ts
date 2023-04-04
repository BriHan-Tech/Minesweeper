/**
 * Interface for the prop passed into the Cell Component.
 * The Cell Component contains:
 *    x: number                 Col the cell is in
 *    y: number                 Row the cell is in
 *    isClicked: boolean        Cell is clicked
 *    isMine: boolean           Cell is a mine
 *    numMines: number          Number of mines surrounding the cell
 */
export default interface iCell {
  x: number;
  y: number;
  isClicked: boolean;
  isMine: boolean;
  numMines: number;
}
