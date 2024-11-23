import { useEffect, useState } from "react";
import { Grid } from "../Grid";
import {
  generateInitialBoard,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  spawnNewTile,
} from "./utilities";

const INITIAL_BOARD = generateInitialBoard();

export const Game = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);

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
        const boardAfterMoveDownAndSpawningNewTile =
          spawnNewTile(boardAfterMoveDown);

        setBoard(boardAfterMoveDownAndSpawningNewTile);
        break;
      case "ArrowLeft":
        const boardAfterMoveLeft = moveLeft(board);
        const boardAfterMoveLeftAndSpawningNewTile =
          spawnNewTile(boardAfterMoveLeft);

        setBoard(boardAfterMoveLeftAndSpawningNewTile);
        break;
      case "ArrowRight":
        const boardAfterMoveRight = moveRight(board);
        const boardAfterMoveRightAndSpawningNewTile =
          spawnNewTile(boardAfterMoveRight);

        setBoard(boardAfterMoveRightAndSpawningNewTile);
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
