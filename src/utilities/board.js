import { GRID_SIZE, INITIAL_CELL_VALUE } from "../constants/constants";
import { getEmptyCells } from "./cell";

const addRandomTileToGrid = (grid, allCells = false) => {
  if (allCells) {
    // For new game, pick any cell randomly
    const randomRow = Math.floor(Math.random() * GRID_SIZE);
    const randomCol = Math.floor(Math.random() * GRID_SIZE);
    grid[randomRow][randomCol] = INITIAL_CELL_VALUE;
    return grid;
  }

  // For existing game, use empty cells
  const { emptyCells, emptyCellsExist } = getEmptyCells(grid);
  if (emptyCellsExist) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row: randomRow, col: randomCol } = emptyCells[randomIndex];
    grid[randomRow][randomCol] = INITIAL_CELL_VALUE;
  }
  return grid;
};

export const getBoardAfterAddingRandomTile = (
  currentGrid,
  isNewGame = false
) => {
  return addRandomTileToGrid(currentGrid, isNewGame);
};

export const generateInitialBoard = () => {
  const newGrid = Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(0));
  getBoardAfterAddingRandomTile(newGrid, true);
  return newGrid;
};
