import { useEffect, useState } from "react";
import { DIRECTIONS, WINNING_CELL_VALUE } from "../constants/constants";
import {
  checkGameOver,
  generateInitialBoard,
  getBoardAfterAddingRandomTile,
  getBoardAfterMove,
} from "../utilities";

export const useGameLogic = (initialGrid) => {
  const [grid, setGrid] = useState(initialGrid);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const initializeGame = () => {
    setGrid(generateInitialBoard());
    setIsGameOver(false);
    setIsGameWon(false);
  };

  useEffect(() => {
    if (isGameOver || isGameWon) return;

    const handleKeyPress = async (event) => {
      const moveDirection = DIRECTIONS[event.key];
      if (!moveDirection) return;

      const { newGrid } = getBoardAfterMove(moveDirection, grid);

      const isWinningCellPresent = newGrid.some((row) =>
        row.some((cell) => cell === WINNING_CELL_VALUE)
      );

      if (isWinningCellPresent) {
        setGrid(newGrid);
        return setIsGameWon(true);
      }

      const updatedGrid = getBoardAfterAddingRandomTile(newGrid);
      if (checkGameOver(updatedGrid)) {
        return setIsGameOver(true);
      }

      setGrid(updatedGrid);
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [grid, isGameOver, isGameWon]);

  return {
    grid,
    isGameOver,
    isGameWon,
    initializeGame,
  };
};
