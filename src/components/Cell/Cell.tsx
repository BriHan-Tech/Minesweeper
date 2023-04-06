import { useState } from "react";

import iCell from "../../interfaces/iCell";
import { CELL_SIZE } from "../../constants";
import click from "../../assets/sounds/click.wav";
import explosion from "../../assets/sounds/explosion.wav";
import flag from "../../assets/sounds/flag.wav";
import removeFlag from "../../assets/sounds/remove_flag.wav";

import "./Cell.scss";

/**
 * Interface representing the argument object that is passed
 * into this component
 */
interface iCellArgs {
  props: iCell;
  onCellClick: any;
}

/**
 * Cell Component
 * Component represents a single cell in the minesweeper game grid. It handles
 * cick and right-clic events, plays sounds for click, explosion, flag, and removeFlag actions,
 * and renders cell content absed on its state.
 *
 * @param {iCell} props - cell data such as isMine, isclicked, numMines, etc.
 * @param {function} onCellClick - Event handler function for cell click event
 * @return {JSX.Element} - The rendered Cell Component
 */
const Cell = ({ props, onCellClick }: iCellArgs): JSX.Element => {
  // State hook to manage whether the cell is flagged or not
  const [isRightClicked, setIsRightClicked] = useState<boolean>(false);

  const handleClick = () => {
    // If right-clicked, do nothing
    if (isRightClicked) return;
    // Play click sound if the cell is not a mine and not already clicked
    if (!props.isMine && !props.isClicked) new Audio(click).play();
    // Play explosion sound if the cell is a mine
    if (props.isMine) new Audio(explosion).play();
    // Marks cell as clicked
    props.isClicked = true;
    // call the onCellClick event handler
    onCellClick(props);
  };

  const handleRightClick = (e: any) => {
    // Prevent default context menu
    e.preventDefault();
    // If already clicked, return
    if (props.isClicked) return;
    // Play flag or removeFlag sound based on right-clicked state
    !isRightClicked ? new Audio(flag).play() : new Audio(removeFlag).play();
    // Toggle right-clicked state
    setIsRightClicked((prev: boolean) => !prev);
  };

  return (
    <div
      className="cell"
      style={{
        backgroundColor: props.isClicked ? "white" : "#AAD751",
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
      }}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {props.isClicked && (
        // Render mine emoji or number of neighboring mines
        <span>
          {props.isMine ? "💣" : props.numMines > 0 ? props.numMines : ""}
        </span>
      )}
      {
        // Render flag emoji when right-clicked
        isRightClicked && <span>🚩</span>
      }
    </div>
  );
};

export default Cell;
