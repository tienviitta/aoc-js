import { getInput } from '../utils/inputFetcher.js';
import { sum } from '../utils/helpers.js';

// Example input for testing
const EXAMPLE_INPUT_PART1 = `3   4
4   3
2   5
1   3
3   9
3   3`;
const EXAMPLE_INPUT_PART2 = EXAMPLE_INPUT_PART1; // Same input for both parts

/**
 * Solve Part 1
 * @param {string} input - Puzzle input
 * @returns {number} Solution
 */
export function part1(input) {
  const lines = input.trim().split('\n');
  
  // Parse the two lists
  const left = [];
  const right = [];
  
  for (const line of lines) {
    const [l, r] = line.trim().split(/\s+/).map(Number);
    left.push(l);
    right.push(r);
  }
  
  // Sort both lists
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);
  
  // Calculate total distance
  let totalDistance = 0;
  for (let i = 0; i < left.length; i++) {
    totalDistance += Math.abs(left[i] - right[i]);
  }
  
  return totalDistance;
}

/**
 * Solve Part 2
 * @param {string} input - Puzzle input
 * @returns {number} Solution
 */
export function part2(input) {
  const lines = input.trim().split('\n');
  
  // Parse the two lists
  const left = [];
  const right = [];
  
  for (const line of lines) {
    const [l, r] = line.trim().split(/\s+/).map(Number);
    left.push(l);
    right.push(r);
  }
  
  // Count occurrences in right list
  const rightCounts = new Map();
  for (const num of right) {
    rightCounts.set(num, (rightCounts.get(num) || 0) + 1);
  }
  
  // Calculate similarity score
  let similarityScore = 0;
  for (const num of left) {
    const count = rightCounts.get(num) || 0;
    similarityScore += num * count;
  }
  
  return similarityScore;
}

/**
 * Main run function
 * @param {boolean} useExample - If true, uses EXAMPLE_INPUT instead of fetching real input
 */
export async function run(useExample = false) {
  const year = 2024;
  const day = 1;
  
  console.log(`🎄 Advent of Code ${year} - Day ${day} 🎄\n`);
  
  if (useExample) {
    // Run with example input only
    console.log('Running with example input...');
    console.log('Part 1:', part1(EXAMPLE_INPUT_PART1), '(expected: 11)');
    console.log('Part 2:', part2(EXAMPLE_INPUT_PART2), '(expected: 31)');
  } else {
    // Test with example first
    console.log('Testing with example input...');
    console.log('Part 1 (example):', part1(EXAMPLE_INPUT_PART1), '(expected: 11)');
    console.log('Part 2 (example):', part2(EXAMPLE_INPUT_PART2), '(expected: 31)');
    console.log();
    
    // Run with real input
    try {
      const input = await getInput(year, day);
      console.log('Running with puzzle input...');
      console.log('Part 1:', part1(input));
      console.log('Part 2:', part2(input));
    } catch (error) {
      console.log('⚠️  Could not fetch real input:', error.message);
      console.log('   Set up your .env file with AOC_SESSION_COOKIE to fetch automatically.');
    }
  }
}

// Run if executed directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  run();
}
