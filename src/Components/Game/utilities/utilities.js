import { GRID_SIZE, INITIAL_CELL_VALUE } from "../constants";

export const getRandomCellCoordinates = () => {
  //get random place from 0 to 6
  const randomRow = Math.floor(Math.random() * GRID_SIZE);
  const randomCol = Math.floor(Math.random() * GRID_SIZE);
  return { randomRow, randomCol };
};

export const generateInitialBoard = () => {
  const board = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
  const { randomRow, randomCol } = getRandomCellCoordinates();
  board[randomRow][randomCol] = INITIAL_CELL_VALUE;
  return board;
};

const getFirstRowWithValue = (
  board,
  columnIndex,
  rowIndex,
  searchDown = false
) => {
  if (searchDown) {
    // Search downwards from the current row
    for (let row = rowIndex + 1; row < GRID_SIZE; row++) {
      if (board[row][columnIndex] !== null) {
        return row;
      }
    }
  } else {
    // upward search
    for (let row = rowIndex - 1; row >= 0; row--) {
      if (board[row][columnIndex] !== null) {
        return row;
      }
    }
  }
  return null;
};
const rowHasValues = (row) => {
  return row.some((cell) => cell !== null);
};

export const moveUp = (board) => {
  const clonedBoard = [...board];

  // Start from index 1 to skip first row
  for (let rowIndex = 1; rowIndex < GRID_SIZE; rowIndex++) {
    const row = clonedBoard[rowIndex];
    const shouldSkipEntireRow = !rowHasValues(row);
    if (shouldSkipEntireRow) continue;

    row.forEach((cellValue, columnIndex) => {
      if (cellValue) {
        const rowWithNotEmptyCellAbove = getFirstRowWithValue(
          clonedBoard,
          columnIndex,
          rowIndex
        );

        const allCellsAboveAreEmpty = rowWithNotEmptyCellAbove === null;

        if (allCellsAboveAreEmpty) {
          clonedBoard[0][columnIndex] = cellValue;
          row[columnIndex] = null;
          return;
        }

        const shouldMerge =
          rowWithNotEmptyCellAbove !== null &&
          clonedBoard[rowWithNotEmptyCellAbove][columnIndex] === cellValue;

        if (shouldMerge) {
          clonedBoard[rowWithNotEmptyCellAbove][columnIndex] = cellValue * 2;
          row[columnIndex] = null;
          return;
        }
        if (rowWithNotEmptyCellAbove + 1 === rowIndex) {
          return;
        }

        const indexOfRowBelowCellWithValue = rowWithNotEmptyCellAbove + 1;
        clonedBoard[indexOfRowBelowCellWithValue][columnIndex] = cellValue;
        row[columnIndex] = null;
      }
    });
  }

  return clonedBoard;
};
export const moveDown = (board) => {
  const clonedBoard = [...board];

  // Start from second to last row and move upwards
  for (let rowIndex = GRID_SIZE - 2; rowIndex >= 0; rowIndex--) {
    const row = clonedBoard[rowIndex];
    const shouldSkipEntireRow = !rowHasValues(row);
    if (shouldSkipEntireRow) continue;

    row.forEach((cellValue, columnIndex) => {
      if (cellValue) {
        const rowWithNotEmptyCellBelow = getFirstRowWithValue(
          clonedBoard,
          columnIndex,
          rowIndex,
          true // Added parameter to search downwards
        );

        const allCellsBelowAreEmpty = rowWithNotEmptyCellBelow === null;

        if (allCellsBelowAreEmpty) {
          clonedBoard[GRID_SIZE - 1][columnIndex] = cellValue;
          row[columnIndex] = null;
          return;
        }

        const shouldMerge =
          rowWithNotEmptyCellBelow !== null &&
          clonedBoard[rowWithNotEmptyCellBelow][columnIndex] === cellValue;

        if (shouldMerge) {
          clonedBoard[rowWithNotEmptyCellBelow][columnIndex] = cellValue * 2;
          row[columnIndex] = null;
          return;
        }
        if (rowWithNotEmptyCellBelow - 1 === rowIndex) {
          return;
        }

        const indexOfRowAboveCellWithValue = rowWithNotEmptyCellBelow - 1;
        clonedBoard[indexOfRowAboveCellWithValue][columnIndex] = cellValue;
        row[columnIndex] = null;
      }
    });
  }

  return clonedBoard;
};
export const moveLeft = (board) => {
  const clonedBoard = [...board];
};

export const moveRight = (board) => {
  const clonedBoard = [...board];
};
