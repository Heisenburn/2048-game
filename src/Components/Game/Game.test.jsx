import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import {
  GAME_OVER_MESSAGE,
  GAME_WIN_MESSAGE,
  NEW_GAME_BUTTON_TEXT,
} from "./constants";
import Game from "./Game";
import { checkGameOver, getBoardAfterMove } from "./utilities";

jest.mock("./utilities", () => ({
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
    expect(screen.getByText(NEW_GAME_BUTTON_TEXT)).toBeInTheDocument();
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
    // Initial state check
    render(<Game />);
    expect(screen.queryByText(GAME_OVER_MESSAGE)).not.toBeInTheDocument();

    // Game continues normally when not game over
    checkGameOver.mockReturnValue(false);
    getBoardAfterMove.mockReturnValue({ newGrid: [[]] });
    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(screen.queryByText(GAME_OVER_MESSAGE)).not.toBeInTheDocument();

    // Game over state
    checkGameOver.mockReturnValue(true);
    fireEvent.keyDown(document, { key: "ArrowLeft" });
    expect(screen.getByText(GAME_OVER_MESSAGE)).toBeInTheDocument();

    // New game button resets the game over state
    fireEvent.click(screen.getByText(NEW_GAME_BUTTON_TEXT));
    expect(screen.queryByText(GAME_OVER_MESSAGE)).not.toBeInTheDocument();
  });

  test("handles winning state correctly", () => {
    render(<Game />);
    expect(screen.queryByText(GAME_WIN_MESSAGE)).not.toBeInTheDocument();

    // Simulate a winning move
    getBoardAfterMove.mockReturnValue({
      newGrid: [[2048]],
      hasWon: true,
    });

    fireEvent.keyDown(document, { key: "ArrowRight" });
    expect(screen.getByText(GAME_WIN_MESSAGE)).toBeInTheDocument();

    // New game button resets the winning state
    fireEvent.click(screen.getByText(NEW_GAME_BUTTON_TEXT));
    expect(screen.queryByText(GAME_WIN_MESSAGE)).not.toBeInTheDocument();
  });
});
