import React, { useEffect, useState } from "react";

import iCell from "../../models/iCell";
import "./Cell.scss";

const Cell = (props: iCell) => {
  const [isClicked, setIsClicked] = useState<boolean>(true);
  const [isRightClicked, setIsRightClicked] = useState<boolean>(false);

  const handleClick = () => {
    if (isRightClicked) return;
    setIsClicked(true);
  };

  const handleRightClick = (e: any) => {
    e.preventDefault();
    if (isClicked) return;
    setIsRightClicked((prev: boolean) => !prev);
  };

  return (
    <div
      className="cell"
      style={{
        backgroundColor: props.isClear ? "white" : "#AAD751",
      }}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {isClicked && <span>{props.isMine ? "💣" : props.numMines}</span>}
      {isRightClicked && <span>🚩</span>}
    </div>
  );
};

export default Cell;
