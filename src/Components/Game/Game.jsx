import React, { useEffect, useState } from "react";
import { Grid } from "../Grid/Grid";
import { GRID_SIZE } from "./constants/constants";
import {
  Container,
  GameBoard,
  GameOver,
  Header,
  NewGameButton,
} from "./Game.styles";
import {
  addNewTile,
  checkGameOver,
  getBoardAfterMove,
} from "./utilities/utilities";

const generateInitialBoard = () => {
  const newGrid = Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(0));
  addNewTile(newGrid);
  return newGrid;
};

// [
//   [0, 0, 0, 0, 0, 2 (random)],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
// ];

const INITIAL_GRID = generateInitialBoard();

const Game = () => {
  const [grid, setGrid] = useState(INITIAL_GRID);
  const [gameOver, setGameOver] = useState(false);

  const initializeGame = () => {
    setGrid(generateInitialBoard());
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) return;

    const handleKeyPress = async (event) => {
      const directions = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      const moveDirection = directions[event.key];

      //prevent non-arrow key presses
      if (moveDirection) {
        const { newGrid } = getBoardAfterMove(moveDirection, grid);
        const updatedGrid = addNewTile(newGrid);

        if (checkGameOver(updatedGrid)) {
          return setGameOver(true);
        }
        setGrid(updatedGrid);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [grid, gameOver]);

  return (
    <Container>
      <Header>
        <NewGameButton onClick={initializeGame}>New Game</NewGameButton>
      </Header>

      <GameBoard>
        <Grid grid={grid} />
      </GameBoard>

      {gameOver && (
        <GameOver>Game Over! Click New Game to play again.</GameOver>
      )}
    </Container>
  );
};

export default Game;
