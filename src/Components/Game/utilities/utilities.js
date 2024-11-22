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

const getFirstRowWithValue = (board, columnIndex, rowIndex) => {
  for (let row = rowIndex - 1; row >= 0; row--) {
    if (board[row][columnIndex] !== null) {
      return row;
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

        //TODO: blad
        //4
        //2
        //i klikniesz strzalke do gory to 2 przesuwa sie randomowo

        const indexOfRowBelowCellWithValue = rowWithNotEmptyCellAbove + 1;
        clonedBoard[indexOfRowBelowCellWithValue][columnIndex] = cellValue;
        row[columnIndex] = null;
      }
    });
  }

  return clonedBoard;
};

export const moveDown = (board) => {};

export const moveLeft = (board) => {
  const clonedBoard = [...board];
};

export const moveRight = (board) => {
  const clonedBoard = [...board];
};
