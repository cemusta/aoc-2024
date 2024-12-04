import * as log from "@std/log";

function parseInput(input: string): string[][] {
  return Deno.readTextFileSync(input)
    .split("\n")
    .map((line) => line.split(""));
}

const directions = [
  [0, 1], // Right
  [1, 0], // Down
  [0, -1], // Left
  [-1, 0], // Up
  [1, 1], // Down-Right
  [1, -1], // Down-Left
  [-1, 1], // Up-Right
  [-1, -1], // Up-Left
];

function countWordOccurrences(grid: string[][], word: string): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const isValid = (x: number, y: number): boolean =>
    x >= 0 && y >= 0 && x < rows && y < cols;

  const searchFrom = (
    x: number,
    y: number,
    dirX: number,
    dirY: number
  ): boolean => {
    for (let i = 0; i < word.length; i++) {
      const newX = x + dirX * i;
      const newY = y + dirY * i;
      if (!isValid(newX, newY) || grid[newX][newY] !== word[i]) {
        return false;
      }
    }
    return true;
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // If the first character matches, check all directions
      if (grid[i][j] === word[0]) {
        for (const [dx, dy] of directions) {
          if (searchFrom(i, j, dx, dy)) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

function countMultiplePatterns(
  grid: string[][],
  patterns: string[][][]
): Record<string, number> {
  const gridRows = grid.length;
  const gridCols = grid[0].length;

  const patternToString = (pattern: string[][]): string =>
    pattern.map((row) => row.join("")).join("\n");

  const matchesPattern = (
    startX: number,
    startY: number,
    pattern: string[][]
  ): boolean => {
    const patternRows = pattern.length;
    const patternCols = pattern[0].length;

    for (let i = 0; i < patternRows; i++) {
      for (let j = 0; j < patternCols; j++) {
        // Skip '.' in the pattern as it can match anything
        if (
          pattern[i][j] !== "." &&
          grid[startX + i]?.[startY + j] !== pattern[i][j]
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const results: Record<string, number> = {};

  for (const pattern of patterns) {
    const patternRows = pattern.length;
    const patternCols = pattern[0].length;
    const patternKey = patternToString(pattern);
    let count = 0;

    for (let i = 0; i <= gridRows - patternRows; i++) {
      for (let j = 0; j <= gridCols - patternCols; j++) {
        if (matchesPattern(i, j, pattern)) {
          count++;
        }
      }
    }

    results[patternKey] = count;
  }

  return results;
}

export function part1(input: string): number {
  const grid = parseInput(input);

  const count = countWordOccurrences(grid, "XMAS");

  log.info(`Day 4 - part 1: ${count}`);

  return count;
}

const patterns = [
  [
    ["M", ".", "M"],
    [".", "A", "."],
    ["S", ".", "S"],
  ],
  [
    ["M", ".", "S"],
    [".", "A", "."],
    ["M", ".", "S"],
  ],
  [
    ["S", ".", "S"],
    [".", "A", "."],
    ["M", ".", "M"],
  ],
  [
    ["S", ".", "M"],
    [".", "A", "."],
    ["S", ".", "M"],
  ],
];

export function part2(input: string): number {
  const grid = parseInput(input);

  const result = countMultiplePatterns(grid, patterns);

  const sum = Object.values(result).reduce((acc, val) => acc + val, 0);

  log.info(`Day 4 - part 2: ${JSON.stringify(sum)}`);

  return sum;
}

if (import.meta.main) {
  part1("./src/day4/input.txt");
  part2("./src/day4/input.txt");
}
