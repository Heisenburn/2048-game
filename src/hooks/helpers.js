import { DIRECTIONS } from "../constants/constants";
import {
  checkGameOver,
  checkWinningCondition,
  generateInitialBoard,
  getBoardAfterAddingRandomTile,
  getBoardAfterMove,
} from "../utilities";

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

export const initializeGame = (setGrid, setIsGameOver, setIsGameWon) => {
  setGrid(generateInitialBoard());
  setIsGameOver(false);
  setIsGameWon(false);
};

export const handleKeyPress =
  (grid, setGrid, setIsGameOver, setIsGameWon) =>
  ({ key }) => {
    const moveDirection = DIRECTIONS[key];
    const notArrowIsPressed = !moveDirection;

    if (notArrowIsPressed) return;

    const newGrid = getBoardAfterMove(moveDirection, grid);

    if (checkWinningCondition(newGrid)) {
      processWinningMove(newGrid, setGrid, setIsGameWon);
      return;
    }

    processRegularMove(newGrid, setGrid, setIsGameOver);
  };
