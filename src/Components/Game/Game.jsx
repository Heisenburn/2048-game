import { useEffect, useState } from "react";
import { Grid } from "../Grid";
import {
  generateInitialBoard,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "./utilities";

const INITIAL_BOARD = generateInitialBoard();

export const Game = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);

  console.log(board);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp":
        const boardAfterMoveUp = moveUp(board);
        setBoard(boardAfterMoveUp);
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
