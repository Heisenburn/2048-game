import { act, renderHook } from "@testing-library/react";
import { DIRECTIONS, WINNING_CELL_VALUE } from "../constants/constants";
import * as utilities from "../utilities";
import { useGameLogic } from "./useGameLogic";

jest.mock("../utilities");

describe("useGameLogic", () => {
  const mockInitialGrid = [
    [0, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    utilities.getBoardAfterMove.mockReturnValue({ newGrid: mockInitialGrid });
    utilities.getBoardAfterAddingRandomTile.mockReturnValue(mockInitialGrid);
    utilities.checkGameOver.mockReturnValue(false);
  });

  test("initializes game state correctly", () => {
    utilities.generateInitialBoard.mockReturnValue(mockInitialGrid);
    const { result } = renderHook(() => useGameLogic(mockInitialGrid));

    expect(result.current.grid).toEqual(mockInitialGrid);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.isGameWon).toBe(false);
  });

  test("handles game reset", () => {
    utilities.generateInitialBoard.mockReturnValue(mockInitialGrid);
    const { result } = renderHook(() => useGameLogic(mockInitialGrid));

    act(() => {
      result.current.initializeGame();
    });

    expect(result.current.grid).toEqual(mockInitialGrid);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.isGameWon).toBe(false);
  });

  test("handles valid key press", () => {
    const { result } = renderHook(() => useGameLogic(mockInitialGrid));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });

    expect(utilities.getBoardAfterMove).toHaveBeenCalledWith(
      DIRECTIONS["ArrowRight"],
      mockInitialGrid
    );
  });

  test("handles winning condition", () => {
    const winningGrid = [[WINNING_CELL_VALUE]];
    utilities.getBoardAfterMove.mockReturnValue({ newGrid: winningGrid });

    const { result } = renderHook(() => useGameLogic(mockInitialGrid));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });

    expect(result.current.isGameWon).toBe(true);
  });

  test("handles game over condition", () => {
    utilities.checkGameOver.mockReturnValue(true);

    const { result } = renderHook(() => useGameLogic(mockInitialGrid));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });

    expect(result.current.isGameOver).toBe(true);
  });
});
