import { EMPTY_CELL_VALUE, GRID_SIZE } from "../constants/constants";
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

  //mergedCells can be null only when checking gameOver
  if (!mergedCells) {
    return shouldMerge;
  }

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
  const isTargetCellEmpty = destinationCellValue === EMPTY_CELL_VALUE;

  const canMerge = isTargetCellEmpty
    ? false
    : canMergeCells(
        sourceCellValue,
        destinationCellValue,
        mergedCells,
        fromRow,
        fromCol,
        toRow,
        toCol
      );

  return {
    isPossible: isTargetCellEmpty || canMerge,
    sourceCellValue,
    destinationCellValue,
    isTargetCellEmpty,
    canMerge,
  };
};

export const moveCellTo = ({
  fromRow,
  fromCol,
  toRow,
  toCol,
  grid,
  mergedCells,
  moveDetails,
}) => {
  const { sourceCellValue, destinationCellValue, isTargetCellEmpty, canMerge } =
    moveDetails;

  if (isTargetCellEmpty) {
    setCellValue(toRow, toCol, sourceCellValue, grid);
    resetCell(fromRow, fromCol, grid);
    return;
  }

  if (canMerge) {
    setCellValue(toRow, toCol, destinationCellValue * 2, grid);
    resetCell(fromRow, fromCol, grid);
    mergedCells[toRow][toCol] = true;
  }
};

export const getBoardAfterMove = (direction, grid) => {
  const newGrid = grid.map((row) => [...row]); //creates a shallow copy

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
              const moveDetails = moveIsPossible(moveParams);

              if (moveDetails.isPossible) {
                moveCellTo({ ...moveParams, moveDetails });
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
              const moveDetails = moveIsPossible(moveParams);

              if (moveDetails.isPossible) {
                moveCellTo({ ...moveParams, moveDetails });
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
              const moveDetails = moveIsPossible(moveParams);

              if (moveDetails.isPossible) {
                moveCellTo({ ...moveParams, moveDetails });
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
              const moveDetails = moveIsPossible(moveParams);

              if (moveDetails.isPossible) {
                moveCellTo({ ...moveParams, moveDetails });
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
