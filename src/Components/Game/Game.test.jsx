import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Game from "./Game";
import { checkGameOver, getBoardAfterMove } from "./utilities/utilities";

// Mock the utility functions
jest.mock("./utilities/utilities", () => ({
  getBoardAfterMove: jest.fn(),
  checkGameOver: jest.fn(),
  addNewTile: jest.fn((grid) => grid),
}));

describe("Game Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<Game />);
    expect(screen.getByText("New Game")).toBeInTheDocument();
  });

  test("starts a new game when New Game button is clicked", () => {
    render(<Game />);
    const newGameButton = screen.getByText("New Game");
    fireEvent.click(newGameButton);
    // Verify the game is reset (grid should be reinitialized)
    expect(screen.queryByText("Game Over")).not.toBeInTheDocument();
  });

  test("shows game over message when game is over", () => {
    checkGameOver.mockReturnValue(true);
    render(<Game />);

    // Simulate a move that ends the game
    getBoardAfterMove.mockReturnValue({ newGrid: [[0]], moved: true });
    fireEvent.keyDown(document, { key: "ArrowRight" });

    expect(
      screen.getByText("Game Over! Click New Game to play again.")
    ).toBeInTheDocument();
  });

  test("handles arrow key presses", () => {
    render(<Game />);
    const mockGrid = [
      [2, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    getBoardAfterMove.mockReturnValue({ newGrid: mockGrid, moved: true });

    // Test all arrow keys
    const directions = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    directions.forEach((direction) => {
      fireEvent.keyDown(document, { key: direction });
      expect(getBoardAfterMove).toHaveBeenCalled();
    });
  });

  test("does not process moves when game is over", () => {
    checkGameOver.mockReturnValue(true);
    render(<Game />);

    // Simulate game over state
    getBoardAfterMove.mockReturnValue({ newGrid: [[0]], moved: true });
    fireEvent.keyDown(document, { key: "ArrowRight" });

    // Try another move
    getBoardAfterMove.mockClear();
    fireEvent.keyDown(document, { key: "ArrowLeft" });

    expect(getBoardAfterMove).toHaveBeenCalledTimes(1);
  });
});
