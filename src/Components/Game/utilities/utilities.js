import { GRID_SIZE, INITIAL_CELL_VALUE } from "../constants/constants";

const getCellValue = (row, col, grid) => grid[row][col];

const setCellValue = (row, col, value, grid) => {
  grid[row][col] = value;
};

const resetCell = (row, col, grid) => setCellValue(row, col, 0, grid);

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

const canMergeCells = (
  sourceCellValue,
  destinationCellValue,
  mergedCells = null,
  sourceRow = null,
  sourceCol = null,
  destRow = null,
  destCol = null
) => {
  const shouldMerge = destinationCellValue === sourceCellValue;

  // If mergedCells is not provided, we're just checking if values match (for gameOver check)
  if (!mergedCells) {
    return shouldMerge;
  }

  // Check if either cell has already been merged this turn
  const isDestinationCellMerged = mergedCells[destRow][destCol];
  const isSourceCellMerged = mergedCells[sourceRow][sourceCol];

  return shouldMerge && !isDestinationCellMerged && !isSourceCellMerged;
};

export const moveIsPossible = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  grid,
  mergedCells
) => {
  const sourceCellValue = getCellValue(fromRow, fromCol, grid);
  const destinationCellValue = getCellValue(toRow, toCol, grid);

  const isSourceCellEmpty = sourceCellValue === 0;
  if (isSourceCellEmpty) return false; // Can't move an empty cell

  const isTargetCellEmpty = destinationCellValue === 0;
  if (isTargetCellEmpty) return true;

  return canMergeCells(
    sourceCellValue,
    destinationCellValue,
    mergedCells,
    fromRow,
    fromCol,
    toRow,
    toCol
  );
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
      // since checking both cells would mean checking the same cell twice
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

export const moveCellTo = (
  fromRow,
  fromCol,
  toRow,
  toCol,
  grid,
  mergedCells
) => {
  const sourceCellValue = getCellValue(fromRow, fromCol, grid);
  const destinationCellValue = getCellValue(toRow, toCol, grid);

  const targetCellIsEmpty = destinationCellValue === 0;

  if (targetCellIsEmpty) {
    // Move to empty cell
    setCellValue(toRow, toCol, sourceCellValue, grid);
    //reset source cell
    resetCell(fromRow, fromCol, grid);
    return;
  }

  // We can safely assume that the cells have the same value (check moveIsPossible implementation)
  setCellValue(toRow, toCol, destinationCellValue * 2, grid);
  //reset source cell
  resetCell(fromRow, fromCol, grid);
  // Mark cells as merged
  mergedCells[toRow][toCol] = true;
};

export const getBoardAfterMove = (direction, grid) => {
  let newGrid = grid.map((row) => [...row]);

  //TODO: mergedCells jest per ruch i sie resetuje
  // [
  //   [false, false, false, false, false, true],
  //   [false, false, false, false, false, false],
  //   (...)
  // ];
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
