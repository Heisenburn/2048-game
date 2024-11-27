import { useCallback, useEffect, useState } from "react";
import { DIRECTIONS, WINNING_CELL_VALUE } from "../constants/constants";
import {
  checkGameOver,
  generateInitialBoard,
  getBoardAfterAddingRandomTile,
  getBoardAfterMove,
} from "../utilities";

const checkWinningCondition = (board) => {
  return board.some((row) => row.some((cell) => cell === WINNING_CELL_VALUE));
};

const processWinningMove = (newGrid, setGrid, setIsGameWon) => {
  setGrid(newGrid);
  setIsGameWon(true);
};

const processRegularMove = (newGrid, setGrid, setIsGameOver) => {
  const updatedGrid = getBoardAfterAddingRandomTile(newGrid);
  if (checkGameOver(updatedGrid)) {
    setIsGameOver(true);
    return;
  }
  setGrid(updatedGrid);
};

export const useGameLogic = (initialGrid) => {
  const [grid, setGrid] = useState(initialGrid);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const handleKeyPress = useCallback(
    (event) => {
      if (isGameOver || isGameWon) return;

      const moveDirection = DIRECTIONS[event.key];

      //ignore not arrow key presses
      if (!moveDirection) return;

      const newGrid = getBoardAfterMove(moveDirection, grid);

      if (checkWinningCondition(newGrid)) {
        processWinningMove(newGrid, setGrid, setIsGameWon);
        return;
      }

      processRegularMove(newGrid, setGrid, setIsGameOver);
    },
    [grid, isGameOver, isGameWon]
  );

  const initializeGame = () => {
    setGrid(generateInitialBoard());
    setIsGameOver(false);
    setIsGameWon(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return {
    grid,
    isGameOver,
    isGameWon,
    initializeGame,
  };
};
