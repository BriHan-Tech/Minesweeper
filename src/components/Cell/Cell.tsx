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
interface Args {
  props: iCell;
  onCellClick: any;
}

const Cell = ({ props, onCellClick }: Args) => {
  const [isRightClicked, setIsRightClicked] = useState<boolean>(false);

  const handleClick = () => {
    if (isRightClicked) return;
    if (!props.isMine && !props.isClicked) new Audio(click).play();
    if (props.isMine) new Audio(explosion).play();
    props.isClicked = true;
    onCellClick(props);
  };

  const handleRightClick = (e: any) => {
    e.preventDefault();
    if (props.isClicked) return;
    !isRightClicked ? new Audio(flag).play() : new Audio(removeFlag).play();
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
        <span>
          {props.isMine ? "💣" : props.numMines > 0 ? props.numMines : ""}
        </span>
      )}
      {isRightClicked && <span>🚩</span>}
    </div>
  );
};

export default Cell;
