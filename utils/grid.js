/**
 * Grid/Matrix utilities for Advent of Code
 */

/**
 * Creates a 2D grid filled with a default value
 * @param {number} rows - Number of rows
 * @param {number} cols - Number of columns
 * @param {*} defaultValue - Default value to fill
 * @returns {Array[]} 2D array
 */
export function createGrid(rows, cols, defaultValue = 0) {
  return Array(rows).fill(null).map(() => Array(cols).fill(defaultValue));
}

/**
 * Gets all adjacent positions (4 directions: up, down, left, right)
 * @param {number} row - Current row
 * @param {number} col - Current column
 * @param {number} maxRow - Maximum row index
 * @param {number} maxCol - Maximum column index
 * @returns {Array<[number, number]>} Array of [row, col] tuples
 */
export function getAdjacent4(row, col, maxRow, maxCol) {
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  return directions
    .map(([dr, dc]) => [row + dr, col + dc])
    .filter(([r, c]) => r >= 0 && r <= maxRow && c >= 0 && c <= maxCol);
}

/**
 * Gets all adjacent positions (8 directions including diagonals)
 * @param {number} row - Current row
 * @param {number} col - Current column
 * @param {number} maxRow - Maximum row index
 * @param {number} maxCol - Maximum column index
 * @returns {Array<[number, number]>} Array of [row, col] tuples
 */
export function getAdjacent8(row, col, maxRow, maxCol) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  return directions
    .map(([dr, dc]) => [row + dr, col + dc])
    .filter(([r, c]) => r >= 0 && r <= maxRow && c >= 0 && c <= maxCol);
}

/**
 * Rotates a 2D grid 90 degrees clockwise
 * @param {Array[]} grid - 2D array
 * @returns {Array[]} Rotated 2D array
 */
export function rotateGrid90(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const rotated = createGrid(cols, rows);
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = grid[r][c];
    }
  }
  return rotated;
}

/**
 * Transposes a 2D grid
 * @param {Array[]} grid - 2D array
 * @returns {Array[]} Transposed 2D array
 */
export function transposeGrid(grid) {
  return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
}

/**
 * Finds all positions in grid matching a predicate
 * @param {Array[]} grid - 2D array
 * @param {Function} predicate - Function to test each element
 * @returns {Array<[number, number, *]>} Array of [row, col, value] tuples
 */
export function findInGrid(grid, predicate) {
  const results = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (predicate(grid[r][c], r, c)) {
        results.push([r, c, grid[r][c]]);
      }
    }
  }
  return results;
}

/**
 * Prints a grid to console (useful for debugging)
 * @param {Array[]} grid - 2D array
 */
export function printGrid(grid) {
  console.log(grid.map(row => row.join('')).join('\n'));
}
