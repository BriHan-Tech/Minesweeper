import React, { useState, useRef, useEffect, useContext } from "react";

import Cell from "../Cell/Cell";
import iCell from "../../models/iCell";

import "./Board.scss";
import boardSetup from "../../logic/boardSetup";
import { clickedCellWithNumMinesZero } from "../../logic/gameLogic";
import { GameContext } from "../App/GameContext";

const COLS = 10;
const ROWS = 8;
const NUM_MINES = 10;

const Board = () => {
  const [board, setBoard] = useState<iCell[][]>([]);
  const { gameStatus, setGameStatus } = useContext(GameContext);

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
    if (gameStatus.length == 0) {
      populateBoard(tmpCell.x, tmpCell.y);
      setGameStatus("P");
      return;
    }

    // If userc clicks on mine
    if (tmpCell.isMine == true) {
      alert("Game Over!");
      setGameStatus("L");
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
   * Each cell is represented by an object of type iCell.
   */
  const newBoard = () => {
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
  };

  /**
   * On component load, a new board is initialized.
   */
  useEffect(() => {
    newBoard();
  }, []);

  /**
   * When user wants to reset board, the board is reinitialized.
   */
  useEffect(() => {
    if (gameStatus == "R") {
      newBoard();
      setGameStatus("");
    }
  }, [gameStatus]);

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
