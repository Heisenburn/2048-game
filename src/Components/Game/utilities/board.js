import { INITIAL_CELL_VALUE } from "../constants/constants";
import { getEmptyCells } from "./cell";

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
