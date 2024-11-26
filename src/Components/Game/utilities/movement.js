import { GRID_SIZE } from "../constants/constants";
import { cellHasValue, getCellValue, resetCell, setCellValue } from "./cell";

export const canMergeCells = (
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
  const newGrid = grid.map((row) => [...row]);
  const mergedCells = Array(GRID_SIZE)
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
