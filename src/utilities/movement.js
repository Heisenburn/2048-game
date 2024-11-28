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

export const moveIsPossible = ({
  fromRow,
  fromCol,
  toRow,
  toCol,
  grid,
  mergedCells,
}) => {
  const sourceCellValue = getCellValue(fromRow, fromCol, grid);
  const destinationCellValue = getCellValue(toRow, toCol, grid);

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

export const moveCellTo = ({
  fromRow,
  fromCol,
  toRow,
  toCol,
  grid,
  mergedCells,
}) => {
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

  const shouldMerge = canMergeCells(
    sourceCellValue,
    destinationCellValue,
    mergedCells,
    fromRow,
    fromCol,
    toRow,
    toCol
  );

  if (shouldMerge) {
    setCellValue(toRow, toCol, destinationCellValue * 2, grid);
    //reset source cell
    resetCell(fromRow, fromCol, grid);
    // Mark cells as merged
    mergedCells[toRow][toCol] = true;
  }
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
              const moveParams = {
                fromRow: currentRow,
                fromCol: col,
                toRow: currentRow - 1,
                toCol: col,
                grid: newGrid,
                mergedCells,
              };

              if (moveIsPossible(moveParams)) {
                moveCellTo(moveParams);
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
              const moveParams = {
                fromRow: currentRow,
                fromCol: col,
                toRow: currentRow + 1,
                toCol: col,
                grid: newGrid,
                mergedCells,
              };
              if (moveIsPossible(moveParams)) {
                moveCellTo(moveParams);
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
              const moveParams = {
                fromRow: row,
                fromCol: currentCol,
                toRow: row,
                toCol: currentCol - 1,
                grid: newGrid,
                mergedCells,
              };
              if (moveIsPossible(moveParams)) {
                moveCellTo(moveParams);
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
              const moveParams = {
                fromRow: row,
                fromCol: currentCol,
                toRow: row,
                toCol: currentCol + 1,
                grid: newGrid,
                mergedCells,
              };
              if (moveIsPossible(moveParams)) {
                moveCellTo(moveParams);
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

  return newGrid;
};
