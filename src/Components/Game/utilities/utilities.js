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

const getRowOfFirstEmptyCellAbove = (board, columnIndex) => {
  for (let row = 0; row < board.length; row++) {
    if (board[row][columnIndex] === null) {
      return row;
    }
  }
};

export const moveUp = (board) => {
  const clonedBoard = [...board];

  clonedBoard.forEach((row, rowIndex) => {
    const shouldSkipFirstRow = rowIndex === 0;
    if (shouldSkipFirstRow) return;

    row.forEach((cellValue, columnIndex) => {
      if (cellValue) {
        //minus 1 because we want to get the row above the top most empty one
        const indexOfRowForEmptyCellAbove =
          getRowOfFirstEmptyCellAbove(clonedBoard, columnIndex) - 1;

        const shouldMerge =
          indexOfRowForEmptyCellAbove !== -1 &&
          clonedBoard[indexOfRowForEmptyCellAbove][columnIndex] === cellValue;

        if (shouldMerge) {
          clonedBoard[indexOfRowForEmptyCellAbove][columnIndex] = cellValue * 2;
          row[columnIndex] = null;
          return;
        }

        //plus 1 because we want to get the row above the top most empty one
        clonedBoard[indexOfRowForEmptyCellAbove + 1][columnIndex] = cellValue;
        row[columnIndex] = null;
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
