import { GRID_SIZE } from "../constants/constants";

export const getCellValue = (row, col, grid) => grid[row][col];

export const setCellValue = (row, col, value, grid) => {
  grid[row][col] = value;
};

export const resetCell = (row, col, grid) => setCellValue(row, col, 0, grid);

export const cellHasValue = (row, col, grid) => {
  return grid[row][col] !== 0;
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
  const emptyCellsExist = emptyCells.length > 0;
  return { emptyCells, emptyCellsExist };
};
