import { GRID_SIZE, INITIAL_CELL_VALUE } from "../constants";

const getIndexOfFirstEmptyCellFromTop = (board) => {
  return board.findIndex((row) => row.some((cell) => cell === null));
};

export const getRandomCellCoordinates = () => {
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

export const moveUp = (board) => {
  const clonedBoard = [...board];

  clonedBoard.forEach((row, rowIndex) => {
    const shouldSkipFirstRow = rowIndex === 0;
    if (shouldSkipFirstRow) return;

    row.forEach((cellValue, cellIndex) => {
      if (cellValue) {
        const indexOfEmptyCell = getIndexOfFirstEmptyCellFromTop(clonedBoard);

        clonedBoard[indexOfEmptyCell][cellIndex] = cellValue;
        row[cellIndex] = null;
      }
    });
  });

  return clonedBoard;
};

export const moveDown = (board) => {};

export const moveLeft = (board) => {
  const clonedBoard = [...board];
};

export const moveRight = (board) => {
  const clonedBoard = [...board];
};
