import { useState, useEffect, useContext } from "react";

import Cell from "../Cell/Cell";
import iCell from "../../interfaces/iCell";

import boardSetup from "../../logic/boardSetup";
import { clickedCellWithNumMinesZero, isGameWon } from "../../logic/gameLogic";
import { GameContext } from "../App/GameContext";
import { GameSettingsContext } from "../App/GameSettingsContext";
import winningSoundEffect from "../../assets/sounds/win.wav";

import "./Board.scss";

const Board = () => {
  // State hook to manage the game board
  const [board, setBoard] = useState<iCell[][]>([]);
  // Context hook to manage game status
  const { gameStatus, setGameStatus } = useContext(GameContext);
  // Context hook to manage game settings
  const { gameSettings } = useContext(GameSettingsContext);

  let COLS = gameSettings.COLS; // Number of columns on the game board
  let ROWS = gameSettings.ROWS; // Number of rows on the game board
  let NUM_MINES = gameSettings.NUM_MINES; // Number of mines in the game board

  /**
   * Called when a cell is clicked.
   * Passed into Cell Component
   *
   * @param {iCell} cell - cell the user clicked on
   */
  const handleCellClick = (cell: iCell) => {
    // Hard copy cell
    let tmpCell = JSON.parse(JSON.stringify(cell));

    // If this is the first click of the game
    if (gameStatus === "S") {
      populateBoard(tmpCell.x, tmpCell.y);
      setGameStatus("P");
      return;
    }

    // If user clicks on mine
    if (tmpCell.isMine === true) {
      setGameStatus("L");
      return;
    }

    if (tmpCell.numMines === 0) {
      // If the user clicked a cell with no surrounding mines
      setBoard((prev) =>
        clickedCellWithNumMinesZero({ x: tmpCell.x, y: tmpCell.y }, prev)
      );
    } else {
      // If the user clicked a regular cell
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
   * @param {number} initX - x position of first click
   * @param {number} initY - y position of first click
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
    if (gameStatus === "S") {
      newBoard();
    }
  }, [gameStatus]);

  /**
   * Every time the board changes, we check if the user has won.
   */
  useEffect(() => {
    // If the game status is 'progressing' and the game has been won
    if (gameStatus === "P" && isGameWon(board)) {
      new Audio(winningSoundEffect).play(); // Play winning audio
      setGameStatus("W");
    }
  }, [board]);

  return (
    <div className="board">
      {board.map((col, i) => (
        <div className="col" key={i}>
          {col.map((cell, j) => (
            <Cell
              props={cell}
              onCellClick={handleCellClick}
              key={JSON.stringify(cell)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
