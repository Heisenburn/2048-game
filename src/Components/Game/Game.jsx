import { useEffect, useState } from "react";
import { Grid } from "../Grid";
import { INITIAL_CELL_VALUE } from "./constants";
import {
  generateInitialBoard,
  getRandomCellCoordinates,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "./utilities";

const INITIAL_BOARD = generateInitialBoard();
// [
//   [null, null, null, null, null, null],
//   [null, 2, null, null, null, null],
//   [null, null, null, 4, null, null],
//   [null, null, null, null, null, null],
//   [null, null, null, null, null, null],
//   [null, null, null, null, null, null],
// ];
export const Game = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);

  const spawnNewTile = (board) => {
    const newBoard = [...board];
    const { randomRow, randomCol } = getRandomCellCoordinates();

    let tempRandomRow = randomRow;
    let tempRandomCol = randomCol;

    let isEmptyTileFound = false;

    while (!isEmptyTileFound) {
      const isCellEmpty = board[tempRandomRow][tempRandomCol] === null;
      if (isCellEmpty) {
        isEmptyTileFound = true;
      } else {
        tempRandomRow = getRandomCellCoordinates().randomRow;
        tempRandomCol = getRandomCellCoordinates().randomCol;
      }
    }

    newBoard[tempRandomRow][tempRandomCol] = INITIAL_CELL_VALUE;
    return newBoard;
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        //steps
        const boardAfterMoveUp = moveUp(board);
        const boardAfterMoveUpAndSpawningNewTile =
          spawnNewTile(boardAfterMoveUp);

        setBoard(boardAfterMoveUpAndSpawningNewTile);
        break;
      case "ArrowDown":
        const boardAfterMoveDown = moveDown(board);
        setBoard(boardAfterMoveDown);
        break;
      case "ArrowLeft":
        const boardAfterMoveLeft = moveLeft(board);
        setBoard(boardAfterMoveLeft);
        break;
      case "ArrowRight":
        const boardAfterMoveRight = moveRight(board);
        setBoard(boardAfterMoveRight);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <Grid board={board} setBoard={setBoard} />;
};
