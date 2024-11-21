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

const generateNewTile = () => {
  const { randomRow, randomCol } = getRandomCellCoordinates();
  return {
    randomRow,
    randomCol,
  };
};

export const Game = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);

  const getBoardAfterSpawningNewTile = (board) => {
    let newTile;
    const { randomRow, randomCol } = generateNewTile();
    while (board[randomRow][randomCol] !== null) {
      newTile = generateNewTile();
    }
    board[randomRow][randomCol] = INITIAL_CELL_VALUE;
    return board;
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        //steps
        const boardAfterMoveUp = moveUp(board);
        const boardAfterSpawningNewTile =
          getBoardAfterSpawningNewTile(boardAfterMoveUp);

        setBoard(boardAfterSpawningNewTile);
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
