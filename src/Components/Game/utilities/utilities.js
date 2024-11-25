import { GRID_SIZE, INITIAL_CELL_VALUE } from "../constants/constants";

export const getBoardAfterAddingRandomTile = (currentGrid) => {
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

export const checkIfMovingIsPossible = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  grid,
  mergedCells
) => {
  const sourceValue = grid[fromRow][fromCol];
  const targetValue = grid[toRow][toCol];

  if (sourceValue === 0) return false;

  if (targetValue === 0) return true;

  return (
    targetValue === sourceValue &&
    !mergedCells[toRow][toCol] &&
    !mergedCells[fromRow][fromCol]
  );
};

export const moveCellTo = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  grid,
  mergedCells
) => {
  const sourceValue = grid[fromRow][fromCol];
  const targetValue = grid[toRow][toCol];

  if (targetValue === 0) {
    // Move to empty cell
    grid[toRow][toCol] = sourceValue;
    grid[fromRow][fromCol] = 0;
    return true;
  }

  // Merge identical values
  grid[toRow][toCol] = targetValue * 2;
  grid[fromRow][fromCol] = 0;
  mergedCells[toRow][toCol] = true;
  return true;
};

export const getBoardAfterMove = (direction, grid) => {
  let newGrid = grid.map((row) => [...row]);
  let mergedCells = Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(false));

  switch (direction) {
    case "up": {
      // For each column
      for (let col = 0; col < GRID_SIZE; col++) {
        // Start from second row since it is not possible to move the first row up
        for (let row = 1; row < GRID_SIZE; row++) {
          // If we find a non-empty cell
          if (newGrid[row][col] !== 0) {
            let currentRow = row;
            // Keep moving the cell up while possible
            while (currentRow > 0) {
              const moveCellMetaData = [
                currentRow,
                col,
                currentRow - 1,
                col,
                newGrid,
                mergedCells,
              ];
              if (checkIfMovingIsPossible(...moveCellMetaData)) {
                moveCellTo(...moveCellMetaData);
                currentRow--;
              } else {
                break;
              }
            }
          }
        }
      }
      break;
    }

    case "down": {
      // For each column
      for (let col = 0; col < GRID_SIZE; col++) {
        // Start from second-to-last row since it is not possible to move the last row down
        for (let row = GRID_SIZE - 2; row >= 0; row--) {
          // If we find a non-empty cell
          if (newGrid[row][col] !== 0) {
            let currentRow = row;
            // Keep moving the cell down while possible
            while (currentRow < GRID_SIZE - 1) {
              const moveCellMetaData = [
                currentRow,
                col,
                currentRow + 1,
                col,
                newGrid,
                mergedCells,
              ];
              if (checkIfMovingIsPossible(...moveCellMetaData)) {
                moveCellTo(...moveCellMetaData);
                currentRow++;
              } else {
                break;
              }
            }
          }
        }
      }
      break;
    }

    case "left": {
      // For each row
      for (let row = 0; row < GRID_SIZE; row++) {
        // Start from second column since it is not possible to move the first column left
        for (let col = 1; col < GRID_SIZE; col++) {
          // If we find a non-empty cell
          if (newGrid[row][col] !== 0) {
            let currentCol = col;
            // Keep moving the cell left while possible
            while (currentCol > 0) {
              const moveCellMetaData = [
                row,
                currentCol,
                row,
                currentCol - 1,
                newGrid,
                mergedCells,
              ];
              if (checkIfMovingIsPossible(...moveCellMetaData)) {
                moveCellTo(...moveCellMetaData);
                currentCol--;
              } else {
                break;
              }
            }
          }
        }
      }
      break;
    }

    case "right": {
      // For each row
      for (let row = 0; row < GRID_SIZE; row++) {
        // Start from second-to-last column since it is not possible to move the last column right
        for (let col = GRID_SIZE - 2; col >= 0; col--) {
          // If we find a non-empty cell
          if (newGrid[row][col] !== 0) {
            let currentCol = col;
            // Keep moving the cell right while possible
            while (currentCol < GRID_SIZE - 1) {
              const moveCellMetaData = [
                row,
                currentCol,
                row,
                currentCol + 1,
                newGrid,
                mergedCells,
              ];
              if (checkIfMovingIsPossible(...moveCellMetaData)) {
                moveCellTo(...moveCellMetaData);
                currentCol++;
              } else {
                break;
              }
            }
          }
        }
      }
      break;
    }
  }

  return { newGrid };
};
