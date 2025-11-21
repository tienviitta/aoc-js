#!/usr/bin/env node

import { fileURLToPath } from 'url';
import path from 'path';

/**
 * Runner script for Advent of Code solutions
 * 
 * Usage:
 *   node run.js <year> <day> [--example]
 *   npm run solution -- <year> <day> [--example]
 * 
 * Examples:
 *   node run.js 2024 1
 *   node run.js 2024 1 --example
 *   npm run solution -- 2024 1 --example
 */

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: node run.js <year> <day> [--example]');
  console.error('Example: node run.js 2024 1');
  console.error('         node run.js 2024 1 --example');
  process.exit(1);
}

const year = parseInt(args[0]);
const day = parseInt(args[1]);
const useExample = args.includes('--example');

if (isNaN(year) || isNaN(day) || day < 1 || day > 25) {
  console.error('Invalid year or day. Day must be between 1 and 25.');
  process.exit(1);
}

const dayPadded = String(day).padStart(2, '0');
const solutionPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  String(year),
  `day${dayPadded}.js`
);

try {
  // Import and run the solution
  const solutionUrl = `file:///${solutionPath.replace(/\\/g, '/')}`;
  const solution = await import(solutionUrl);
  
  if (solution.run) {
    await solution.run(useExample);
  } else {
    console.error('\n❌ Solution file does not export a run() function.');
    console.error('Make sure your solution exports: export async function run() { ... }');
    process.exit(1);
  }
} catch (error) {
  if (error.code === 'ERR_MODULE_NOT_FOUND') {
    console.error(`\n❌ Solution file not found: ${solutionPath}`);
    console.error(`\nTo create a new solution, copy template.js:`);
    console.error(`  1. Create directory: mkdir ${year}`);
    console.error(`  2. Copy template: cp template.js ${year}/day${dayPadded}.js`);
    console.error(`  3. Edit ${year}/day${dayPadded}.js and implement your solution\n`);
  } else {
    console.error('\n❌ Error running solution:', error.message);
    console.error(error.stack);
  }
  process.exit(1);
}
