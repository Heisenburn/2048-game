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
  //debug by setting initial board to a specific board
  const [board, setBoard] = useState([
    [null, null, null, 2, 2, 2],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ]);

  const handleKeyDown = (event) => {
    let timeoutId;

    const moveAndSpawn = (moveFunction) => {
      const newBoard = moveFunction(board);
      setBoard(newBoard);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newBoardWithTile = spawnNewTile(newBoard);
        setBoard(newBoardWithTile);
      }, 500);
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

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <Grid board={board} />;
};
