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
        const shouldSkipMove = rowWithNotEmptyCellAbove + 1 === rowIndex; //cell cannot merge and cannot move up
        if (shouldSkipMove) {
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
          true
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
        const shouldSkipMove = rowWithNotEmptyCellBelow - 1 === rowIndex; //cell cannot merge and cannot move down
        if (shouldSkipMove) {
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
