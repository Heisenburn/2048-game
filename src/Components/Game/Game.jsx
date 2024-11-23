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
    const moveAndSpawn = (moveFunction) => {
      const newBoard = moveFunction(board);
      setBoard(newBoard);

      setTimeout(() => {
        const newBoardWithTile = spawnNewTile(newBoard);
        setBoard(newBoardWithTile);
      }, 300);
    };

    switch (event.key) {
      case "ArrowUp":
        moveAndSpawn(moveUp);
        break;
      case "ArrowDown":
        moveAndSpawn(moveDown);
        break;
      case "ArrowLeft":
        moveAndSpawn(moveLeft);
        break;
      case "ArrowRight":
        moveAndSpawn(moveRight);
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

  return <Grid board={board} />;
};
