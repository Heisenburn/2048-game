import React, { useEffect, useState } from "react";
import { Grid } from "../Grid";
import {
  DIRECTIONS,
  GAME_OVER_MESSAGE,
  GAME_WIN_MESSAGE,
  GRID_SIZE,
  NEW_GAME_BUTTON_TEXT,
  WINNING_CELL_VALUE,
} from "./constants";
import {
  Container,
  GameBoard,
  GameStatus,
  Header,
  NewGameButton,
} from "./Game.styles";
import {
  checkGameOver,
  getBoardAfterAddingRandomTile,
  getBoardAfterMove,
} from "./utilities";

const generateInitialBoard = () => {
  const newGrid = Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(0));
  getBoardAfterAddingRandomTile(newGrid);
  return newGrid;
};

const INITIAL_GRID = generateInitialBoard();

export const Game = () => {
  const [grid, setGrid] = useState(INITIAL_GRID);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const initializeGame = () => {
    setGrid(generateInitialBoard());
    setIsGameOver(false);
    setIsGameWon(false);
  };

  useEffect(() => {
    if (isGameOver || isGameWon) return;

    const handleKeyPress = async (event) => {
      const moveDirection = DIRECTIONS[event.key];

      //prevent non-arrow key presses
      if (moveDirection) {
        const { newGrid } = getBoardAfterMove(moveDirection, grid);

        const isWinningCellPresent = newGrid.some((row) =>
          row.some((cell) => cell === WINNING_CELL_VALUE)
        );

        if (isWinningCellPresent) {
          setGrid(newGrid);
          return setIsGameWon(true);
        }

        const updatedGrid = getBoardAfterAddingRandomTile(newGrid);

        if (checkGameOver(updatedGrid)) {
          return setIsGameOver(true);
        }

        setGrid(updatedGrid);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [grid, isGameOver, isGameWon]);

  return (
    <Container>
      <Header>
        <NewGameButton onClick={initializeGame}>
          {NEW_GAME_BUTTON_TEXT}
        </NewGameButton>
      </Header>

      <GameBoard>
        <Grid grid={grid} />
      </GameBoard>

      {isGameWon ? (
        <GameStatus>{GAME_WIN_MESSAGE}</GameStatus>
      ) : isGameOver ? (
        <GameStatus>{GAME_OVER_MESSAGE}</GameStatus>
      ) : null}
    </Container>
  );
};
