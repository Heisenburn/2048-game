import { addNewTile, checkGameOver, getBoardAfterMove } from "./utilities";

// Mock constants
jest.mock("../constants/constants", () => ({
  GRID_SIZE: 6,
  INITIAL_CELL_VALUE: 2,
}));

describe("Game Utilities", () => {
  describe("addNewTile", () => {
    it("should add a new tile to an empty cell", () => {
      const mockGrid = [
        [2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const result = addNewTile(mockGrid);

      // No way to test randomness of the new tile, so we just check that 2 tiles were added
      // Count number of non-zero cells
      const nonZeroCells = result.flat().filter((cell) => cell !== 0).length;
      expect(nonZeroCells).toBe(2); // Original tile + new tile
    });

    it("should not add a tile when grid is full", () => {
      const fullGrid = Array(6)
        .fill()
        .map(() => Array(6).fill(2));
      const result = addNewTile(fullGrid);

      expect(result).toEqual(fullGrid);
    });
  });

  describe("checkGameOver", () => {
    it("should return false when empty cells exist", () => {
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
      const mockGrid = [
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
      ];

      expect(checkGameOver(mockGrid)).toBe(true);
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

      const result = getBoardAfterMove("up", mockGrid, false);
      expect(result.newGrid).toEqual(expectedGrid);
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

      const result = getBoardAfterMove("down", mockGrid, false);
      expect(result.newGrid).toEqual(expectedGrid);
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

      const result = getBoardAfterMove("left", mockGrid, false);
      expect(result.newGrid).toEqual(expectedGrid);
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

      const result = getBoardAfterMove("right", mockGrid, false);
      expect(result.newGrid).toEqual(expectedGrid);
    });

    it("should return undefined when game is over", () => {
      const mockGrid = [
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
        [2, 4, 2, 4, 2, 4],
        [4, 2, 4, 2, 4, 2],
      ];

      const result = getBoardAfterMove("right", mockGrid, true);
      expect(result).toBeUndefined();
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

      const result = getBoardAfterMove("right", mockGrid, false);
      expect(result.newGrid).toEqual(expectedGrid);
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

      const result = getBoardAfterMove("right", mockGrid, false);
      expect(result.newGrid).toEqual(expectedGrid);
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

      const result = getBoardAfterMove("down", mockGrid, false);
      expect(result.newGrid).toEqual(expectedGrid);
    });

    it("should only merge once per move", () => {
      const mockGrid = [
        [4, 0, 0, 0, 0, 0],
        [4, 0, 0, 0, 0, 0],
        [8, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const expectedGrid = [
        [8, 0, 0, 0, 0, 0],
        [8, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ];

      const result = getBoardAfterMove("up", mockGrid, false);
      expect(result.newGrid).toEqual(expectedGrid);
    });
  });
});
