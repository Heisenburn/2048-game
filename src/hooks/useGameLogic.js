import { useCallback, useEffect, useState } from "react";
import { handleKeyPress, initializeGame } from "./helpers";

export const useGameLogic = (initialGrid) => {
  const [grid, setGrid] = useState(initialGrid);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const handleKeyDown = useCallback(
    handleKeyPress(
      grid,
      isGameOver,
      isGameWon,
      setGrid,
      setIsGameOver,
      setIsGameWon
    ),
    [grid, isGameOver, isGameWon]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    //cleanup on unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    grid,
    isGameOver,
    isGameWon,
    initializeGame: () => initializeGame(setGrid, setIsGameOver, setIsGameWon),
  };
};
