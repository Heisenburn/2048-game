import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import {
  GAME_OVER_MESSAGE,
  GAME_WIN_MESSAGE,
  NEW_GAME_BUTTON_TEXT,
} from "../../constants/constants";
import { useGameLogic } from "../../hooks/useGameLogic";
import { Game } from "./Game";

jest.mock("../../hooks/useGameLogic");

describe("Game Component", () => {
  const mockGrid = [
    [0, 2, 0, 0, 2, 0],
    [2, 4, 2, 2, 4, 2],
    [0, 2, 0, 0, 2, 0],
    [0, 2, 0, 0, 2, 0],
    [2, 4, 2, 2, 4, 2],
    [0, 2, 0, 0, 2, 0],
  ];

  const mockInitializeGame = jest.fn();

  beforeEach(() => {
    // Reset mock before each test
    useGameLogic.mockReset();
  });

  test("renders game board and new game button", () => {
    useGameLogic.mockReturnValue({
      grid: mockGrid,
      isGameOver: false,
      isGameWon: false,
      initializeGame: mockInitializeGame,
    });

    render(<Game />);

    expect(
      screen.getByRole("button", { name: NEW_GAME_BUTTON_TEXT })
    ).toBeInTheDocument();
  });

  test("calls initializeGame when new game button is clicked", () => {
    useGameLogic.mockReturnValue({
      grid: mockGrid,
      isGameOver: false,
      isGameWon: false,
      initializeGame: mockInitializeGame,
    });

    render(<Game />);

    fireEvent.click(screen.getByText(NEW_GAME_BUTTON_TEXT));
    expect(mockInitializeGame).toHaveBeenCalledTimes(1);
  });

  test("displays game over message when game is over", () => {
    useGameLogic.mockReturnValue({
      grid: mockGrid,
      isGameOver: true,
      isGameWon: false,
      initializeGame: mockInitializeGame,
    });

    render(<Game />);

    expect(screen.getByText(GAME_OVER_MESSAGE)).toBeInTheDocument();
  });

  test("displays win message when game is won", () => {
    useGameLogic.mockReturnValue({
      grid: mockGrid,
      isGameOver: false,
      isGameWon: true,
      initializeGame: mockInitializeGame,
    });

    render(<Game />);

    expect(screen.getByText(GAME_WIN_MESSAGE)).toBeInTheDocument();
  });

  test("does not display any status message during active game", () => {
    useGameLogic.mockReturnValue({
      grid: mockGrid,
      isGameOver: false,
      isGameWon: false,
      initializeGame: mockInitializeGame,
    });

    render(<Game />);

    expect(screen.queryByText(GAME_OVER_MESSAGE)).not.toBeInTheDocument();
    expect(screen.queryByText(GAME_WIN_MESSAGE)).not.toBeInTheDocument();
  });

  test("renders grid with correct dimensions", () => {
    useGameLogic.mockReturnValue({
      grid: mockGrid,
      isGameOver: false,
      isGameWon: false,
      initializeGame: mockInitializeGame,
    });

    render(<Game />);

    const gridContainer = screen.getByTestId("grid-container");
    expect(gridContainer).toBeInTheDocument();
    expect(mockGrid.length).toBe(6);
    expect(mockGrid[0].length).toBe(6);
  });
});
