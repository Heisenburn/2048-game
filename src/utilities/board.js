import { INITIAL_CELL_VALUE, GRID_SIZE } from "../constants/constants";
import { getEmptyCells } from "./cell";

export const getBoardAfterAddingRandomTile = (currentGrid) => {
  const { emptyCells, emptyCellsExist } = getEmptyCells(currentGrid);
  //emptyCells structure: [[row, col], [row, col], [row, col]]

  if (emptyCellsExist) {
    // Get random index from available empty cells
    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    const randomEmptyCellCoordinates = emptyCells[randomIndex];

    const { row: randomRow, col: randomCol } = randomEmptyCellCoordinates;

    currentGrid[randomRow][randomCol] = INITIAL_CELL_VALUE;
  }
  return currentGrid;
};

export const generateInitialBoard = () => {
  const newGrid = Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(0));
  getBoardAfterAddingRandomTile(newGrid);
  return newGrid;
};
