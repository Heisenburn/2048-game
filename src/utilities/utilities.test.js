import {
  EMPTY_CELL_VALUE,
  GRID_SIZE,
  INITIAL_CELL_VALUE,
} from "../constants/constants";
import { getBoardAfterAddingRandomTile } from "./board";
import { checkGameOver } from "./gameState";
import { getBoardAfterMove } from "./movement";

describe("Game Utilities", () => {
  describe("getBoardAfterAddingRandomTile", () => {
    it("should add a new tile to an empty cell", () => {
      const mockGrid = [
        [2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterAddingRandomTile(mockGrid);

      // No way to test randomness of the new tile, so we just check that 2 tiles were added
      // Count number of non-zero cells
      const nonZeroCells = result
        .flat()
        .filter((cell) => cell !== EMPTY_CELL_VALUE).length;
      expect(nonZeroCells).toBe(2); // Original tile + new tile
    });

    it("should not add a tile when grid is full", () => {
      const fullGrid = Array(GRID_SIZE)
        .fill()
        .map(() => Array(GRID_SIZE).fill(INITIAL_CELL_VALUE));
      const result = getBoardAfterAddingRandomTile(fullGrid);

      expect(result).toEqual(fullGrid);
    });
  });

  describe("checkGameOver", () => {
    it("should return false when empty does exist", () => {
      const mockGrid = [
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
        [2, 4, 0, 4, 2, 4], // Contains empty cell
        [4, 2, 4, 2, 4, 2],
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
      ];

      expect(checkGameOver(mockGrid)).toBe(false);
    });

    it("should return false when merges are possible", () => {
      const mockGrid = [
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
        [2, 4, 2, 2, 2, 4], // Contains mergeable tiles
        [4, 2, 4, 2, 4, 2],
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
      ];

      expect(checkGameOver(mockGrid)).toBe(false);
    });

    it("should return true when no moves are possible", () => {
      const gameOverGrid = [
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
      ];

      expect(checkGameOver(gameOverGrid)).toBe(true);
    });
  });

  describe("getBoardAfterMove", () => {
    it("should correctly move tiles up", () => {
      const mockGrid = [
        [0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const expectedGrid = [
        [4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterMove("up", mockGrid);
      expect(result).toEqual(expectedGrid);
    });

    it("should correctly move tiles down", () => {
      const mockGrid = [
        [2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const expectedGrid = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [4, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterMove("down", mockGrid);
      expect(result).toEqual(expectedGrid);
    });

    it("should correctly move tiles left", () => {
      const mockGrid = [
        [0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const expectedGrid = [
        [4, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterMove("left", mockGrid);
      expect(result).toEqual(expectedGrid);
    });

    it("should correctly move tiles right", () => {
      const mockGrid = [
        [0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const expectedGrid = [
        [0, 0, 0, 0, 0, 4],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterMove("right", mockGrid);
      expect(result).toEqual(expectedGrid);
    });

    it("should handle multiple merges in the same row", () => {
      const mockGrid = [
        [2, 2, 2, 2, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const expectedGrid = [
        [0, 0, 0, 0, 4, 4],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterMove("right", mockGrid);
      expect(result).toEqual(expectedGrid);
    });

    it("should handle multiple merges in the same column", () => {
      const mockGrid = [
        [2, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const expectedGrid = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [4, 0, 0, 0, 0, 0],
        [4, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterMove("down", mockGrid);
      expect(result).toEqual(expectedGrid);
    });

    it("should not merge different value tiles", () => {
      const mockGrid = [
        [2, 4, 2, 4, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const expectedGrid = [
        [0, 0, 2, 4, 2, 4],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterMove("right", mockGrid);
      expect(result).toEqual(expectedGrid);
    });

    it("should only merge once per move and not merge the resulting tile again", () => {
      const mockGrid = [
        [8, 4, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const expectedGrid = [
        [8, 8, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterMove("left", mockGrid);
      expect(result).toEqual(expectedGrid);
    });

    it("should detect win condition when merging two 1024 tiles", () => {
      const mockGrid = [
        [0, 0, 0, 0, 0, 0],
        [1024, 0, 0, 0, 0, 0],
        [1024, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const expectedGrid = [
        [2048, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterMove("up", mockGrid);
      expect(result).toEqual(expectedGrid);
      expect(result.flat().includes(2048)).toBe(true);
    });
  });
});
