import { getInput } from '../utils/inputFetcher.js';

/**
 * Template for Advent of Code solutions
 * 
 * Copy this file to create a new solution:
 * - Create a folder for the year (e.g., 2024/)
 * - Copy this file as dayXX.js (e.g., day01.js)
 * - Implement part1 and part2 functions
 * - Add example inputs for testing
 */

// Example input for testing (paste example from puzzle description)
const EXAMPLE_INPUT_PART1 = 
`
2x3x4
1x1x10
`;
const EXAMPLE_INPUT_PART2 = EXAMPLE_INPUT_PART1; // Often the same as Part 1, but can be different

/**
 * Solve Part 1
 * @param {string} input - Puzzle input
 * @returns {number|string} Solution
 */
export function part1(input) {
  const lines = input.trim().split('\n');
  // console.log(lines);
  return lines.reduce((total, currLine) => {
    // console.log(total, currLine);
    const numbers = currLine.trim().split('x').map(num => parseInt(num));
    return total + calcSurfaceArea(...numbers);
  }, 0)
}

function calcSurfaceArea(l, w, h) {
  const sides = [l*w, w*h, h*l];
  const minSide = Math.min(...sides);
  return sides.reduce((total, current) => total + (current * 2), 0) + minSide;
}

/**
 * Solve Part 2
 * @param {string} input - Puzzle input
 * @returns {number|string} Solution
 */
export function part2(input) {
  const lines = input.trim().split('\n');
  
  // TODO: Implement solution
  
  return 0;
}

/**
 * Main run function
 * @param {boolean} useExample - If true, uses EXAMPLE_INPUT instead of fetching real input
 */
export async function run(useExample = false) {
  const year = parseInt(import.meta.url.match(/\/(\d{4})\//)?.[1] || '2024');
  const day = parseInt(import.meta.url.match(/day(\d+)/)?.[1] || '1');
  
  console.log(`🎄 Advent of Code ${year} - Day ${day} 🎄\n`);
  
  if (useExample) {
    // Run with example input only
    if (!EXAMPLE_INPUT_PART1 && !EXAMPLE_INPUT_PART2) {
      console.error('❌ No example input defined in EXAMPLE_INPUT_PART1/PART2 constants');
      process.exit(1);
    }
    console.log('Running with example input...');
    if (EXAMPLE_INPUT_PART1) console.log('Part 1:', part1(EXAMPLE_INPUT_PART1));
    if (EXAMPLE_INPUT_PART2) console.log('Part 2:', part2(EXAMPLE_INPUT_PART2));
  } else {
    // Test with example first, then run with real input
    if (EXAMPLE_INPUT_PART1 || EXAMPLE_INPUT_PART2) {
      console.log('Testing with example input...');
      if (EXAMPLE_INPUT_PART1) console.log('Part 1 (example):', part1(EXAMPLE_INPUT_PART1));
      if (EXAMPLE_INPUT_PART2) console.log('Part 2 (example):', part2(EXAMPLE_INPUT_PART2));
      console.log();
    }
    
    // Run with real input
    const input = await getInput(year, day);
    console.log('Running with puzzle input...');
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
  }
}

// Run if executed directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  run();
}
