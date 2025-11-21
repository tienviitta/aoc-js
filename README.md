# 🎄 Advent of Code - Node.js Setup

A complete Node.js environment for participating in [Advent of Code](https://adventofcode.com/), with automatic input fetching, utility functions, and testing support.

## Features

- ✨ Automatic puzzle input fetching and caching
- 📁 Multi-year support with organized structure
- 🧰 Comprehensive utility libraries (grids, graphs, math, etc.)
- 🧪 Built-in testing with Node.js test runner
- 📝 Solution template for quick starts
- 🚀 Simple runner script

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your Session Cookie

To automatically fetch puzzle inputs, you need your Advent of Code session cookie:

#### Chrome / Edge:
1. Go to [adventofcode.com](https://adventofcode.com/) and log in
2. Press `F12` to open Developer Tools
3. Go to the **Application** tab (Chrome) or **Storage** tab (Edge)
4. In the left sidebar, expand **Cookies** and click on `https://adventofcode.com`
5. Find the cookie named `session`
6. Copy the **Value** (a long hex string)

#### Firefox:
1. Go to [adventofcode.com](https://adventofcode.com/) and log in
2. Press `F12` to open Developer Tools
3. Go to the **Storage** tab
4. In the left sidebar, expand **Cookies** and click on `https://adventofcode.com`
5. Find the cookie named `session`
6. Copy the **Value** (a long hex string)

#### Safari:
1. Enable Developer Menu: Safari → Preferences → Advanced → "Show Develop menu in menu bar"
2. Go to [adventofcode.com](https://adventofcode.com/) and log in
3. Go to Develop → Show Web Inspector
4. Go to the **Storage** tab
5. Expand **Cookies** and click on `https://adventofcode.com`
6. Find the cookie named `session`
7. Copy the **Value** (a long hex string)

### 3. Configure Your Session Cookie

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and replace `your_session_cookie_here` with your actual session cookie:

```
AOC_SESSION_COOKIE=your_actual_session_cookie_value_here
```

⚠️ **Important**: Keep your session cookie private! The `.env` file is already in `.gitignore`.

### 4. Create a New Solution

Copy the template for a new day:

```bash
# Create year folder if needed
mkdir 2024

# Copy template
cp template.js 2024/day01.js
```

Edit `2024/day01.js` and implement your solution in the `part1` and `part2` functions.

### 5. Run Your Solution

```bash
# Run a specific day
node run.js 2024 1

# Or use npm script
npm run solution -- 2024 1

# Or run the file directly
node 2024/day01.js
```

The input will be automatically fetched and cached in `2024/day01-input.txt`.

## Project Structure

```
aoc/
├── package.json          # Project configuration
├── run.js               # Solution runner script
├── template.js          # Template for new solutions
├── .env                 # Your session cookie (create this)
├── .env.example         # Example env file
├── utils/               # Utility functions
│   ├── inputFetcher.js  # Auto-fetch puzzle inputs
│   ├── grid.js          # Grid/matrix utilities
│   ├── graph.js         # Graph algorithms (BFS, DFS, Dijkstra, A*)
│   └── helpers.js       # General utilities
├── tests/               # Test files
│   └── day01.test.js    # Example test
└── 2024/                # Year folder
    ├── day01.js         # Solution file
    └── day01-input.txt  # Cached input (auto-generated)
```

## Utility Functions

### Input Parsing (`utils/inputFetcher.js`)

```javascript
import { getInput, parseLines, parseGrid, parseNumbers, parseGroups } from './utils/inputFetcher.js';

// Automatically fetch input
const input = await getInput(2024, 1);

// Parse into lines
const lines = parseLines(input);

// Parse into 2D character grid
const grid = parseGrid(input);

// Parse numbers (one per line)
const numbers = parseNumbers(input);

// Parse groups separated by blank lines
const groups = parseGroups(input);
```

### Grid Utilities (`utils/grid.js`)

```javascript
import { createGrid, getAdjacent4, getAdjacent8, rotateGrid90, findInGrid } from './utils/grid.js';

// Create a 10x10 grid filled with zeros
const grid = createGrid(10, 10, 0);

// Get adjacent cells (4 directions)
const neighbors = getAdjacent4(row, col, maxRow, maxCol);

// Get adjacent cells (8 directions including diagonals)
const allNeighbors = getAdjacent8(row, col, maxRow, maxCol);

// Find all positions matching a condition
const stars = findInGrid(grid, (cell) => cell === '*');
```

### Graph Algorithms (`utils/graph.js`)

```javascript
import { bfs, dijkstra, aStar, manhattanDistance } from './utils/graph.js';

// Breadth-first search
const result = bfs(start, getNeighbors, isGoal);

// Dijkstra's algorithm
const path = dijkstra(start, getNeighborsWithCost, isGoal);

// A* pathfinding
const path = aStar(start, goal, getNeighborsWithCost, heuristic);

// Manhattan distance
const dist = manhattanDistance([x1, y1], [x2, y2]);
```

### General Helpers (`utils/helpers.js`)

```javascript
import { sum, product, range, combinations, permutations, gcd, lcm, memoize } from './utils/helpers.js';

// Sum and product
const total = sum([1, 2, 3, 4]);
const prod = product([2, 3, 4]);

// Generate range
const nums = range(0, 10); // [0, 1, 2, ..., 9]

// Combinations and permutations
const combs = combinations([1, 2, 3], 2); // [[1,2], [1,3], [2,3]]
const perms = permutations([1, 2, 3]); // All permutations

// Math utilities
const g = gcd(12, 18); // 6
const l = lcm(12, 18); // 36

// Memoization
const fib = memoize((n) => n <= 1 ? n : fib(n-1) + fib(n-2));
```

## Testing

Run tests using Node.js built-in test runner:

```bash
npm test
```

Create a test file in `tests/` folder:

```javascript
import test from 'node:test';
import assert from 'node:assert';
import { part1, part2 } from '../2024/day01.js';

test('2024 Day 1 - Part 1', () => {
  const result = part1(EXAMPLE_INPUT);
  assert.strictEqual(result, expectedValue);
});
```

## Tips

1. **Use the example input**: Paste the example from the puzzle description into `EXAMPLE_INPUT` constant
2. **Test first**: Verify your solution works with the example before running on real input
3. **Utility functions**: Check the utility files for helpful functions before implementing from scratch
4. **Caching**: Inputs are automatically cached, so they're only fetched once
5. **Year folders**: Create a new folder for each year (e.g., `2023/`, `2024/`, `2025/`)

## Common Patterns

### Reading Input Files

```javascript
// Input is automatically fetched when you run the solution
const input = await getInput(year, day);
```

### Example Solution Structure

```javascript
import { getInput, parseLines } from '../utils/inputFetcher.js';

const EXAMPLE_INPUT = `...`; // Paste example from puzzle

export function part1(input) {
  const lines = parseLines(input);
  // Your solution here
  return result;
}

export function part2(input) {
  const lines = parseLines(input);
  // Your solution here
  return result;
}
```

## Troubleshooting

### "AOC_SESSION_COOKIE not set"
- Make sure you created `.env` file (copy from `.env.example`)
- Verify your session cookie is correct
- Don't include quotes around the cookie value

### "Failed to fetch input: 404"
- The puzzle might not be available yet (check the date/time)
- Your session cookie might be expired (get a fresh one)

### "Failed to fetch input: 400"
- Your session cookie is likely invalid
- Log out and log back in to adventofcode.com, then get a new cookie

## Happy Coding! 🎄⭐

Good luck with Advent of Code! Remember to have fun and learn something new each day.
