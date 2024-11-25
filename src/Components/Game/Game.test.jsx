import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Game from "./Game";
import { checkGameOver, getBoardAfterMove } from "./utilities/utilities";

jest.mock("./utilities/utilities", () => ({
  getBoardAfterMove: jest.fn(),
  checkGameOver: jest.fn(),
  getBoardAfterAddingRandomTile: jest.fn((grid) => grid),
}));

describe("Game", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<Game />);
    expect(screen.getByText("New Game")).toBeInTheDocument();
  });

  test("handles arrow key presses", () => {
    render(<Game />);

    getBoardAfterMove.mockReturnValue({ newGrid: [[]] });

    const directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    directions.forEach((direction) => {
      fireEvent.keyDown(document, { key: direction });
      expect(getBoardAfterMove).toHaveBeenCalled();
    });
  });

  test("handles game over state correctly", () => {
    const gameOverMsg = "Game Over! Click new game to continue.";

    // Initial state check
    render(<Game />);
    expect(screen.queryByText(gameOverMsg)).not.toBeInTheDocument();

    // Game continues normally when not game over
    checkGameOver.mockReturnValue(false);
    getBoardAfterMove.mockReturnValue({ newGrid: [[]] });
    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(screen.queryByText(gameOverMsg)).not.toBeInTheDocument();

    // Game over state
    checkGameOver.mockReturnValue(true);
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(screen.getByText(gameOverMsg)).toBeInTheDocument();

    // New game button resets the game over state
    fireEvent.click(screen.getByText("New Game"));
    expect(screen.queryByText(gameOverMsg)).not.toBeInTheDocument();
  });
});
