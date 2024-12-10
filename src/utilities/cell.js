import { EMPTY_CELL_VALUE, GRID_SIZE } from "../constants/constants";

export const getCellValue = (row, col, grid) => grid[row][col];

export const setCellValue = (row, col, value, grid) => {
  grid[row][col] = value;
};

export const resetCell = (row, col, grid) =>
  setCellValue(row, col, EMPTY_CELL_VALUE, grid);

export const cellHasValue = (row, col, grid) => {
  return grid[row][col] !== EMPTY_CELL_VALUE;
};

export const getEmptyCells = (grid) => {
  const emptyCells = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!cellHasValue(row, col, grid)) {
        emptyCells.push({ row, col });
      }
    }
  }
  const emptyCellsExist = emptyCells.length > EMPTY_CELL_VALUE;
  return { emptyCells, emptyCellsExist };
};
