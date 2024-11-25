import { GRID_SIZE, INITIAL_CELL_VALUE } from "../constants/constants";

const cellHasValue = (row, col, grid) => {
  return grid[row][col] !== 0;
};

const getEmptyCells = (grid) => {
  const emptyCells = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!cellHasValue(row, col, grid)) {
        emptyCells.push({ row, col });
      }
    }
  }
  const emptyCellsExist = emptyCells.length > 0;
  return { emptyCells, emptyCellsExist };
};

export const getBoardAfterAddingRandomTile = (currentGrid) => {
  const { emptyCells, emptyCellsExist } = getEmptyCells(currentGrid);

  if (emptyCellsExist) {
    // Get random index from available empty cells
    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    const randomEmptyCellCoordinates = emptyCells[randomIndex];

    const { row: randomRow, col: randomCol } = randomEmptyCellCoordinates;

    currentGrid[randomRow][randomCol] = INITIAL_CELL_VALUE;
  }
  return currentGrid;
};

export const checkGameOver = (currentGrid) => {
  const { emptyCellsExist } = getEmptyCells(currentGrid);

  if (emptyCellsExist) {
    return false;
  }

  //TODO: to lepiej skumac
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

export const moveIsPossible = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  grid,
  mergedCells
) => {
  const sourceGridValue = grid[fromRow][fromCol]; // Value of the cell we want to move
  const targetGridValue = grid[toRow][toCol]; // Value of the destination cell

  if (sourceGridValue === 0) return false; // Can't move an empty cell

  const targetValueIsEmpty = targetGridValue === 0;
  if (targetValueIsEmpty) return true;

  const valuesShouldBeMerged = targetGridValue === sourceGridValue;

  // keep track of merged cells to prevent merging the same cells twice
  const areCellsAlreadyMerged =
    mergedCells[toRow][toCol] || mergedCells[fromRow][fromCol];

  return valuesShouldBeMerged && !areCellsAlreadyMerged;
};

export const moveCellTo = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  grid,
  mergedCells
) => {
  const sourceGridValue = grid[fromRow][fromCol]; // Value of the cell we want to move
  const targetGridValue = grid[toRow][toCol]; // Value of the destination cell

  const targetValueIsEmpty = targetGridValue === 0;

  if (targetValueIsEmpty) {
    // Move to empty cell
    grid[toRow][toCol] = sourceGridValue;
    //reset source cell
    grid[fromRow][fromCol] = 0;
    return;
  }

  // We can safely assume that the cells have the same value (check moveIsPossible implementation)
  grid[toRow][toCol] = targetGridValue * 2;
  //reset source cell
  grid[fromRow][fromCol] = 0;
  // Mark cells as merged
  mergedCells[toRow][toCol] = true;
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
          if (cellHasValue(row, col, newGrid)) {
            let currentRow = row;

            while (currentRow > 0) {
              const movementMetaData = [
                currentRow,
                col,
                currentRow - 1,
                col,
                newGrid,
                mergedCells,
              ];

              if (moveIsPossible(...movementMetaData)) {
                moveCellTo(...movementMetaData);
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
          if (cellHasValue(row, col, newGrid)) {
            let currentRow = row;

            while (currentRow < GRID_SIZE - 1) {
              const movementMetaData = [
                currentRow,
                col,
                currentRow + 1,
                col,
                newGrid,
                mergedCells,
              ];
              if (moveIsPossible(...movementMetaData)) {
                moveCellTo(...movementMetaData);
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
          if (cellHasValue(row, col, newGrid)) {
            let currentCol = col;

            while (currentCol > 0) {
              const movementMetaData = [
                row,
                currentCol,
                row,
                currentCol - 1,
                newGrid,
                mergedCells,
              ];
              if (moveIsPossible(...movementMetaData)) {
                moveCellTo(...movementMetaData);
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
          if (cellHasValue(row, col, newGrid)) {
            let currentCol = col;

            while (currentCol < GRID_SIZE - 1) {
              const movementMetaData = [
                row,
                currentCol,
                row,
                currentCol + 1,
                newGrid,
                mergedCells,
              ];
              if (moveIsPossible(...movementMetaData)) {
                moveCellTo(...movementMetaData);
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
