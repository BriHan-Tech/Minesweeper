import React, { useState, useRef, useEffect } from "react";

import Cell from "../Cell/Cell";
import iCell from "../../models/iCell";

import "./Board.scss";
import boardSetup from "../../logic/boardSetup";
import { clickedCellWithNumMinesZero } from "../../logic/gameLogic";

const COLS = 10;
const ROWS = 8;
const NUM_MINES = 10;

const Board = () => {
  const [board, setBoard] = useState<iCell[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStart, setGameStart] = useState<boolean>(false);

  /**
   * Called when a cell is clicked.
   * Passed into Cell Component
   *
   * @param {iCell} cell - cell the user clicked on
   */
  const handleCellChange = (cell: iCell) => {
    // Hard copy cell
    let tmpCell = JSON.parse(JSON.stringify(cell));

    // If this is the first click of the game
    if (gameStart == false) {
      populateBoard(tmpCell.x, tmpCell.y);
      setGameStart(true);
      return;
    }

    // If userc clicks on mine
    if (tmpCell.isMine == true) {
      alert("Game Over!");
      setGameOver(true);
      return;
    }

    if (tmpCell.numMines == 0) {
      setBoard((prev) =>
        clickedCellWithNumMinesZero({ x: tmpCell.x, y: tmpCell.y }, prev)
      );
    } else {
      setBoard((prev) => {
        let tmpBoard = JSON.parse(JSON.stringify(prev));
        tmpBoard[tmpCell.x][tmpCell.y] = tmpCell;
        return tmpBoard;
      });
    }
  };

  /**
   * Populates the board with mines and labels the cells with
   * number of mines that surround them.
   * Called when user makes their first click
   *
   * @param initX - x position of first click
   * @param initY - y position of first click
   */
  const populateBoard = (initX: number, initY: number) => {
    setBoard((prev) => {
      return boardSetup(prev, NUM_MINES, { x: initX, y: initY });
    });
  };

  /**
   * Sets board to a 2D-array of cells when the board is first loaded.
   * The 2D array is initialized as: array[col][row]
   * Note that the x value is the distance between the cell and the left-hand side of the screen,
   * which is represented by col.
   * Each cell is represented by an object with properties x, y, isBomb, isFlagged, and numMines.
   */
  useEffect(() => {
    setBoard(
      Array(COLS)
        .fill(null)
        .map((col, i) =>
          Array(ROWS)
            .fill({
              x: i,
              y: 0,
              isMine: false,
              isClicked: false,
              numMines: 0,
            })
            .map((cell, j) => ({ ...cell, y: j }))
        )
    );
  }, []);

  return (
    <>
      <div className="board">
        {board.map((col, i) => (
          <div className="col" key={i}>
            {col.map((cell, j) => (
              // Remember to pass in function here
              <Cell
                props={cell}
                onCellChange={handleCellChange}
                key={JSON.stringify(cell)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
