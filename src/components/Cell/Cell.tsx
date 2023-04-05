import React, { useEffect, useState } from "react";

import iCell from "../../interfaces/iCell";
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
    props.isClicked = true;
    onCellClick(props);
  };

  const handleRightClick = (e: any) => {
    e.preventDefault();
    if (props.isClicked) return;
    setIsRightClicked((prev: boolean) => !prev);
  };

  return (
    <div
      className="cell"
      style={{
        backgroundColor: props.isClicked ? "white" : "#AAD751",
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
