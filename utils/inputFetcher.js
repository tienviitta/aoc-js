import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Fetches puzzle input from Advent of Code
 * @param {number} year - The year of the puzzle
 * @param {number} day - The day of the puzzle (1-25)
 * @returns {Promise<string>} The puzzle input
 */
export async function fetchInput(year, day) {
  const inputDir = path.join(__dirname, '..', String(year));
  const inputFile = path.join(inputDir, `day${String(day).padStart(2, '0')}-input.txt`);

  // Check if input already exists
  if (fs.existsSync(inputFile)) {
    return fs.readFileSync(inputFile, 'utf-8');
  }

  // Fetch from adventofcode.com
  const sessionCookie = process.env.AOC_SESSION_COOKIE;
  if (!sessionCookie || sessionCookie === 'your_session_cookie_here') {
    throw new Error(
      'AOC_SESSION_COOKIE not set in .env file. See README.md for instructions.'
    );
  }

  console.log(`Fetching input for ${year} day ${day}...`);
  
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const response = await fetch(url, {
    headers: {
      Cookie: `session=${sessionCookie}`,
      'User-Agent': 'Node.js AoC Input Fetcher'
    }
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch input: ${response.status} ${response.statusText}\n` +
      `Make sure your session cookie is valid and the puzzle is available.`
    );
  }

  const input = await response.text();

  // Save to file
  if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
  }
  fs.writeFileSync(inputFile, input);
  console.log(`Input saved to ${inputFile}`);

  return input;
}

/**
 * Reads puzzle input from file or fetches if not available
 * @param {number} year - The year of the puzzle
 * @param {number} day - The day of the puzzle (1-25)
 * @returns {Promise<string>} The puzzle input
 */
export async function getInput(year, day) {
  return await fetchInput(year, day);
}

/**
 * Parses input into lines
 * @param {string} input - Raw input string
 * @returns {string[]} Array of lines
 */
export function parseLines(input) {
  return input.trim().split('\n');
}

/**
 * Parses input into a 2D grid of characters
 * @param {string} input - Raw input string
 * @returns {string[][]} 2D array of characters
 */
export function parseGrid(input) {
  return parseLines(input).map(line => line.split(''));
}

/**
 * Parses input into numbers (one per line)
 * @param {string} input - Raw input string
 * @returns {number[]} Array of numbers
 */
export function parseNumbers(input) {
  return parseLines(input).map(Number);
}

/**
 * Parses input by blank lines into groups
 * @param {string} input - Raw input string
 * @returns {string[][]} Array of groups, where each group is an array of lines
 */
export function parseGroups(input) {
  return input.trim().split('\n\n').map(group => group.split('\n'));
}
