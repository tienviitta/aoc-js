import { getInput } from "../utils/inputFetcher.js";

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
const EXAMPLE_INPUT_PART1 = `)())())`;
const EXAMPLE_INPUT_PART2 = `()())`; // Same input for both parts

/**
 * Solve Part 1
 * @param {string} input - Puzzle input
 * @returns {number|string} Solution
 */
export function part1(input) {
  const lines = input.trim().split("");
  return lines.reduce((total, curr) => {
    return curr === "(" ? total + 1 : total - 1;
  }, 0);
}

/**
 * Solve Part 2
 * @param {string} input - Puzzle input
 * @returns {number|string} Solution
 */
export function part2(input) {
  const lines = input.trim().split("");
  // TODO: Implement solution
  let floor = 0;
  for (let index = 0; index < lines.length; index++) {
    const char = lines[index];
    if (char === "(") {
      floor++;
    } else if (char === ")") {
      floor--;
    }
    if (floor === -1) {
      return index + 1;
    }
  }
}

/**
 * Main run function
 * @param {boolean} useExample - If true, uses EXAMPLE_INPUT instead of fetching real input
 */
export async function run(useExample = false) {
  const year = parseInt(import.meta.url.match(/\/(\d{4})\//)?.[1] || "2024");
  const day = parseInt(import.meta.url.match(/day(\d+)/)?.[1] || "1");

  console.log(`🎄 Advent of Code ${year} - Day ${day} 🎄\n`);

  if (useExample) {
    // Run with example input only
    if (!EXAMPLE_INPUT_PART1 && !EXAMPLE_INPUT_PART2) {
      console.error("❌ No example input defined in EXAMPLE_INPUT_PART1/PART2 constants");
      process.exit(1);
    }
    console.log("Running with example input...");
    if (EXAMPLE_INPUT_PART1) console.log("Part 1:", part1(EXAMPLE_INPUT_PART1));
    if (EXAMPLE_INPUT_PART2) console.log("Part 2:", part2(EXAMPLE_INPUT_PART2));
  } else {
    // Test with example first, then run with real input
    if (EXAMPLE_INPUT_PART1 || EXAMPLE_INPUT_PART2) {
      console.log("Testing with example input...");
      if (EXAMPLE_INPUT_PART1) console.log("Part 1 (example):", part1(EXAMPLE_INPUT_PART1));
      if (EXAMPLE_INPUT_PART2) console.log("Part 2 (example):", part2(EXAMPLE_INPUT_PART2));
      console.log();
    }

    // Run with real input
    const input = await getInput(year, day);
    console.log("Running with puzzle input...");
    console.log("Part 1:", part1(input));
    console.log("Part 2:", part2(input));
  }
}

// Run if executed directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  run();
}
