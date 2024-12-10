import {
  EMPTY_CELL_VALUE,
  GRID_SIZE,
  INITIAL_CELL_VALUE,
} from "../constants/constants";
import { getEmptyCells } from "./cell";

export const getBoardAfterAddingRandomTile = (grid, allCells = false) => {
  if (allCells) {
    // For new game, pick any cell randomly
    const randomRow = Math.floor(Math.random() * GRID_SIZE); // for example 0.33 * 6 = 2
    const randomCol = Math.floor(Math.random() * GRID_SIZE);
    grid[randomRow][randomCol] = INITIAL_CELL_VALUE;
    return grid;
  }

  // For existing game, use empty cells
  const { emptyCells, emptyCellsExist } = getEmptyCells(grid);
  if (emptyCellsExist) {
    //emptyCells' structure: [{row: 0, col: 0}, {row: 1, col: 1}, {row: 2, col: 2}]
    const randomIndex = Math.floor(Math.random() * emptyCells.length); // for example 0.12 * 30 = 3
    const { row: randomRow, col: randomCol } = emptyCells[randomIndex]; // emptyCells[3] = {row: 3, col: 3}
    grid[randomRow][randomCol] = INITIAL_CELL_VALUE;
  }
  return grid;
};

export const generateInitialBoard = () => {
  const newGrid = Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(EMPTY_CELL_VALUE));
  getBoardAfterAddingRandomTile(newGrid, true);
  return newGrid;
};
