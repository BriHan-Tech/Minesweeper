import React, { useState, useRef, useEffect } from "react";

import Cell from "../Cell/Cell";
import iCell from "../../models/iCell";

import "./Board.scss";

const COLS = 10;
const ROWS = 8;
const NUM_MINES = 10;

const Board = () => {
  const [board, setBoard] = useState<iCell[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  console.log(board);

  const clickZero = (x: number, y: number) => {
    setBoard((prev) => {
      // Set up DFS
      let tmp = [...prev];
      let stack = [{ x: x, y: y }];
      let history = new Set();

      // DFS
      while (stack.length > 0) {
        const pos = stack[0];
        stack.shift();

        // If the position can be cleared and the position
        // has not already been cleared
        if (
          pos.x >= 0 &&
          pos.x < COLS &&
          pos.y >= 0 &&
          pos.y < ROWS &&
          tmp[pos.x][pos.y].numMines <= 0 &&
          !history.has(JSON.stringify(pos))
        ) {
          tmp[pos.x][pos.y].isClear = true;
          history.add(JSON.stringify({ x: pos.x, y: pos.y }));

          stack.push({ x: pos.x - 1, y: pos.y });
          stack.push({ x: pos.x + 1, y: pos.y });
          stack.push({ x: pos.x, y: pos.y - 1 });
          stack.push({ x: pos.x, y: pos.y + 1 });
        }
      }
      return tmp;
    });
  };

  /**
   * Runs when the user clicks on the first cell.
   *
   * @param initX - x position of first click
   * @param initY - y position of first click
   */
  const populateBoard = (initX: number, initY: number) => {
    // 2D Array to keep track of Mines planted
    let mineField: number[][] = Array(COLS)
      .fill(0)
      .map(() => Array(ROWS).fill(0));

    // Set the mines to be platned
    setMines(mineField, initX, initY);
    countMines(mineField);

    // Set mines on board
    setBoard((prev) => {
      let tmp = [...prev];
      tmp.map((col, i) =>
        col.map((cell, j) => {
          cell.numMines = mineField[i][j];
          cell.isMine = mineField[i][j] >= 1000;
          return cell;
        })
      );
      return tmp;
    });

    // Set the intitial click of the board
    clickZero(initX, initY);
  };

  /**
   * Goes around the minefield, assigning numbers to cells.
   *
   * @param {number[][]} mineField - 2D array that represents the minefield
   */
  const countMines = (mineField: number[][]) => {
    // Find cells with mines
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        // If Cell has mine
        if (mineField[i][j] >= 1000) {
          // Label the cells around it with mine count
          for (let x = i - 1; x <= i + 1; x++) {
            for (let y = j - 1; y <= j + 1; y++) {
              if (x >= 0 && y >= 0 && x < COLS && y < ROWS) {
                mineField[x][y]++;
              }
            }
          }
        }
      }
    }
  };

  /**
   * Plants mines in the minefield appropriately.
   * That means there is a 3-by-3 block around the user's first click
   * where mines can not be planted.
   *
   * Cells with 1000 or over mean that there IS a mine there
   *
   * @param {number[][]} mineField - 2D array that represents minefield
   * @param {number} initX  - x position of initial user click
   * @param {number} initY  - y position of initial user click
   */
  const setMines = (mineField: number[][], initX: number, initY: number) => {
    // Create a square around the initial click
    // These cells, labeled -1 can NOT have a mine in them.
    for (let i = initX - 2; i <= initX + 2; i++) {
      for (let j = initY - 2; j <= initY + 2; j++) {
        if (i >= 0 && j >= 0 && i < COLS && j < ROWS) {
          mineField[i][j] = -1;
        }
      }
    }

    // Put mines in 2D Array
    // Mines are symbolized with the number 1000
    for (let i = 0; i < NUM_MINES; i++) {
      let x: number = Math.floor(Math.random() * COLS);
      let y: number = Math.floor(Math.random() * ROWS);

      while (mineField[x][y] >= 1000 || mineField[x][y] === -1) {
        x = Math.floor(Math.random() * COLS);
        y = Math.floor(Math.random() * ROWS);
      }
      mineField[x][y] = 1000;
    }

    // Clean Up
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        mineField[i][j] = Math.max(0, mineField[i][j]);
      }
    }
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
              isClear: false,
              numMines: 0,
            })
            .map((cell, j) => ({ ...cell, y: j }))
        )
    );

    populateBoard(0, 0);
  }, []);

  return (
    <>
      <div className="board">
        {board.map((col, i) => (
          <div className="col" key={i}>
            {col.map((cell, j) => (
              <Cell {...cell} key={JSON.stringify(cell)} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
