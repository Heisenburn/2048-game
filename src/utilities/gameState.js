import { GRID_SIZE, WINNING_CELL_VALUE } from "../constants/constants";
import { getEmptyCells } from "./cell";
import { canMergeCells } from "./movement";

export const checkWinningCondition = (board) => {
  return board.some((row) => row.some((cell) => cell === WINNING_CELL_VALUE));
};

export const checkGameOver = (currentGrid) => {
  const { emptyCellsExist } = getEmptyCells(currentGrid);

  if (emptyCellsExist) {
    return false;
  }

  // Game is not over if there are possible merges
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const isNotLastRow = row < GRID_SIZE - 1;
      const isNotLastCol = col < GRID_SIZE - 1;
      const currentValue = currentGrid[row][col];

      // Only need to check one direction for horizontal and vertical
      // since checking both directions would mean checking the same cell twice
      if (isNotLastRow) {
        const valueBelow = currentGrid[row + 1][col];
        if (canMergeCells(currentValue, valueBelow)) return false;
      }

      if (isNotLastCol) {
        const valueRight = currentGrid[row][col + 1];
        if (canMergeCells(currentValue, valueRight)) return false;
      }
    }
  }

  return true;
};
