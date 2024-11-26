import React from "react";
import {
  GAME_OVER_MESSAGE,
  GAME_WIN_MESSAGE,
  NEW_GAME_BUTTON_TEXT,
} from "../../constants/constants";
import { useGameLogic } from "../../hooks/useGameLogic";
import { generateInitialBoard } from "../../utilities/board";
import { Grid } from "../Grid";
import {
  Container,
  GameBoard,
  GameStatus,
  Header,
  NewGameButton,
} from "./Game.styles";

const INITIAL_GRID = generateInitialBoard();

export const Game = () => {
  const { grid, isGameOver, isGameWon, initializeGame } =
    useGameLogic(INITIAL_GRID);

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
