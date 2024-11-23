import { GRID_SIZE, INITIAL_CELL_VALUE } from "../constants";

export const getRandomCellCoordinates = () => {
  //get random place from 0 to 6
  const randomRow = Math.floor(Math.random() * GRID_SIZE);
  const randomCol = Math.floor(Math.random() * GRID_SIZE);
  return { randomRow, randomCol };
};

export const generateInitialBoard = () => {
  // [
  //   [null, null, null, null, null, null],
  //   [null, 2 (random), null, null, null, null],
  //   [null, null, null, null, null, null],
  //   [null, null, null, null, null, null],
  //   [null, null, null, null, null, null],
  //   [null, null, null, null, null, null],
  // ];
  const board = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(null)
  );

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

const moveInDirection = (board, isMovingDown) => {
  const clonedBoard = [...board];
  const startIndex = isMovingDown ? GRID_SIZE - 2 : 1;
  const endIndex = isMovingDown ? -1 : GRID_SIZE;
  const step = isMovingDown ? -1 : 1;

  for (let rowIndex = startIndex; rowIndex !== endIndex; rowIndex += step) {
    const row = clonedBoard[rowIndex];
    const shouldSkipEntireRow = !rowHasValues(row);
    if (shouldSkipEntireRow) continue;

    row.forEach((cellValue, columnIndex) => {
      if (cellValue) {
        const rowWithNotEmptyCell = getFirstRowWithValue(
          clonedBoard,
          columnIndex,
          rowIndex,
          isMovingDown
        );

        const allCellsAreEmpty = rowWithNotEmptyCell === null;

        if (allCellsAreEmpty) {
          const targetRowIndex = isMovingDown ? GRID_SIZE - 1 : 0;
          clonedBoard[targetRowIndex][columnIndex] = cellValue;
          row[columnIndex] = null;
          return;
        }

        const shouldMerge =
          rowWithNotEmptyCell !== null &&
          clonedBoard[rowWithNotEmptyCell][columnIndex] === cellValue;

        if (shouldMerge) {
          clonedBoard[rowWithNotEmptyCell][columnIndex] = cellValue * 2;
          row[columnIndex] = null;
          return;
        }
        if (
          (isMovingDown ? rowWithNotEmptyCell - 1 : rowWithNotEmptyCell + 1) ===
          rowIndex
        ) {
          return;
        }

        const targetRowIndex = isMovingDown
          ? rowWithNotEmptyCell - 1
          : rowWithNotEmptyCell + 1;
        clonedBoard[targetRowIndex][columnIndex] = cellValue;
        row[columnIndex] = null;
      }
    });
  }

  return clonedBoard;
};

export const moveUp = (board) => {
  return moveInDirection(board, false);
};

export const moveDown = (board) => {
  return moveInDirection(board, true);
};

export const moveLeft = (board) => {
  const clonedBoard = [...board];
};

export const moveRight = (board) => {
  const clonedBoard = [...board];
};
