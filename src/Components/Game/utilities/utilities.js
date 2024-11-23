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

export const spawnNewTile = (board) => {
  const newBoard = [...board];
  const { randomRow, randomCol } = getRandomCellCoordinates();

  let tempRandomRow = randomRow;
  let tempRandomCol = randomCol;

  let isEmptyTileFound = false;

  while (!isEmptyTileFound) {
    const isCellEmpty = board[tempRandomRow][tempRandomCol] === null;
    if (isCellEmpty) {
      isEmptyTileFound = true;
    } else {
      tempRandomRow = getRandomCellCoordinates().randomRow;
      tempRandomCol = getRandomCellCoordinates().randomCol;
    }
  }

  newBoard[tempRandomRow][tempRandomCol] = INITIAL_CELL_VALUE;
  return newBoard;
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

const moveVertically = (board, isMovingDown) => {
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

        const allCellsBelowOrAboveAreEmpty = rowWithNotEmptyCell === null;

        if (allCellsBelowOrAboveAreEmpty) {
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
        const shouldSkipMove =
          (isMovingDown ? rowWithNotEmptyCell - 1 : rowWithNotEmptyCell + 1) ===
          rowIndex;

        if (shouldSkipMove) {
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
  return moveVertically(board, false);
};

export const moveDown = (board) => {
  return moveVertically(board, true);
};

const getIndexOfFirstNonEmptyCell = (row, columnIndex) => {
  return row.slice(0, columnIndex).findLastIndex((cell) => cell !== null);
};

export const moveLeft = (board) => {
  const clonedBoard = [...board];

  clonedBoard.forEach((row, rowIndex) => {
    const shouldSkipEntireRow = !rowHasValues(row);
    if (shouldSkipEntireRow) return;

    //move from right to left thus starting from last column (GRID-SIZE - 1)
    for (let columnIndex = GRID_SIZE - 1; columnIndex >= 0; columnIndex--) {
      const cellValue = row[columnIndex];
      const shouldSkipFirstColumn = columnIndex === 0;
      if (!cellValue || shouldSkipFirstColumn) {
        continue;
      }
      const indexOfColumnWithNotEmptyValue = getIndexOfFirstNonEmptyCell(
        row,
        columnIndex
      );

      const allCellsOnLeftAreEmpty = indexOfColumnWithNotEmptyValue === -1;

      if (allCellsOnLeftAreEmpty) {
        row[0] = cellValue;
        row[columnIndex] = null;

        return;
      }

      //TODO: przesuniecie na maxa w lewo gdy mamy
      // [8, null, null, 2, 2, null]
      //to zamiast zrobic
      // [8, 4, null, null, null, null]
      // to sie robi
      // [8, null, null, 4, null, null]
      debugger;

      const shouldMerge =
        indexOfColumnWithNotEmptyValue !== -1 &&
        clonedBoard[rowIndex][indexOfColumnWithNotEmptyValue] === cellValue;

      if (shouldMerge) {
        //first merge without moving
        clonedBoard[rowIndex][indexOfColumnWithNotEmptyValue] = cellValue * 2;
        row[columnIndex] = null;

        //then move to the left
        const numbers = row.filter((item) => item !== null);
        const nulls = Array.from(
          { length: row.length - numbers.length },
          () => null
        );
        clonedBoard[rowIndex] = [...numbers, ...nulls];

        return;
      }

      const shouldSkipMove =
        row.slice(0, columnIndex).every((cell) => !!cell) &&
        indexOfColumnWithNotEmptyValue !== -1;

      if (shouldSkipMove) {
        return;
      }

      const targetColumnIndex = indexOfColumnWithNotEmptyValue + 1;
      clonedBoard[rowIndex][targetColumnIndex] = cellValue;
      row[columnIndex] = null;
    }
  });

  return clonedBoard;
};

export const moveRight = (board) => {
  const clonedBoard = [...board];
};
