import { GRID_SIZE, INITIAL_CELL_VALUE } from "../constants/constants";

export const addNewTile = (currentGrid) => {
  // Find all empty cells
  const emptyCells = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (currentGrid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  // Add new tile if there are empty cells
  if (emptyCells.length > 0) {
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    currentGrid[randomCell.row][randomCell.col] = INITIAL_CELL_VALUE;
  }
  return currentGrid;
};

export const checkGameOver = (currentGrid) => {
  // Game is not over if there are empty cells
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (currentGrid[row][col] === 0) {
        return false;
      }
    }
  }

  // Game is not over if there are possible merges
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const hasDownwardMerge =
        row < GRID_SIZE - 1 &&
        currentGrid[row][col] === currentGrid[row + 1][col];
      const hasRightwardMerge =
        col < GRID_SIZE - 1 &&
        currentGrid[row][col] === currentGrid[row][col + 1];

      if (hasDownwardMerge || hasRightwardMerge) {
        return false;
      }
    }
  }

  return true;
};

export const getBoardAfterMove = (direction, grid) => {
  let newGrid = grid.map((row) => [...row]);
  // Track merged cells
  let mergedCells = Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(false));

  const isMovingCellPossible = (fromRow, fromCol, toRow, toCol) => {
    const sourceValue = newGrid[fromRow][fromCol];
    const targetValue = newGrid[toRow][toCol];

    if (sourceValue === 0) return false;

    if (targetValue === 0) {
      // Move to empty cell
      newGrid[toRow][toCol] = sourceValue;
      newGrid[fromRow][fromCol] = 0;
      return true;
    }

    // Check if either source or target cell has been merged this move
    if (
      targetValue === sourceValue &&
      !mergedCells[toRow][toCol] &&
      !mergedCells[fromRow][fromCol]
    ) {
      // Merge identical values
      newGrid[toRow][toCol] = targetValue * 2;
      newGrid[fromRow][fromCol] = 0;
      mergedCells[toRow][toCol] = true;
      return true;
    }

    return false;
  };

  // Process moves based on direction
  switch (direction) {
    case "up": {
      // For each column
      for (let col = 0; col < GRID_SIZE; col++) {
        // Start from second row (index 1) and move upward
        for (let row = 1; row < GRID_SIZE; row++) {
          // If we find a non-empty cell
          if (newGrid[row][col] !== 0) {
            let currentRow = row;
            // Keep moving the cell up while possible
            while (
              currentRow > 0 &&
              isMovingCellPossible(currentRow, col, currentRow - 1, col)
            ) {
              currentRow--;
            }
          }
        }
      }
      break;
    }

    case "down": {
      // For each column
      for (let col = 0; col < GRID_SIZE; col++) {
        // Start from second-to-last row and move downward
        for (let row = GRID_SIZE - 2; row >= 0; row--) {
          // If we find a non-empty cell
          if (newGrid[row][col] !== 0) {
            let currentRow = row;
            // Keep moving the cell down while possible
            while (
              currentRow < GRID_SIZE - 1 &&
              isMovingCellPossible(currentRow, col, currentRow + 1, col)
            ) {
              currentRow++;
            }
          }
        }
      }
      break;
    }

    case "left": {
      // For each row
      for (let row = 0; row < GRID_SIZE; row++) {
        // Start from second column (index 1) and move leftward
        for (let col = 1; col < GRID_SIZE; col++) {
          // If we find a non-empty cell
          if (newGrid[row][col] !== 0) {
            let currentCol = col;
            // Keep moving the cell left while possible
            while (
              currentCol > 0 &&
              isMovingCellPossible(row, currentCol, row, currentCol - 1)
            ) {
              currentCol--;
            }
          }
        }
      }
      break;
    }

    case "right": {
      // For each row
      for (let row = 0; row < GRID_SIZE; row++) {
        // Start from second-to-last column and move rightward
        for (let col = GRID_SIZE - 2; col >= 0; col--) {
          // If we find a non-empty cell
          if (newGrid[row][col] !== 0) {
            let currentCol = col;
            // Keep moving the cell right while possible
            while (
              currentCol < GRID_SIZE - 1 &&
              isMovingCellPossible(row, currentCol, row, currentCol + 1)
            ) {
              currentCol++;
            }
          }
        }
      }
      break;
    }
  }

  return { newGrid };
};
