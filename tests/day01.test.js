import test from 'node:test';
import assert from 'node:assert';
import { part1, part2 } from '../2024/day01.js';

const EXAMPLE_INPUT_PART1 = `3   4
4   3
2   5
1   3
3   9
3   3`;
const EXAMPLE_INPUT_PART2 = EXAMPLE_INPUT_PART1; // Same input for both parts

test('2024 Day 1 - Part 1', () => {
  const result = part1(EXAMPLE_INPUT_PART1);
  assert.strictEqual(result, 11, 'Part 1 should return 11 for example input');
});

test('2024 Day 1 - Part 2', () => {
  const result = part2(EXAMPLE_INPUT_PART2);
  assert.strictEqual(result, 31, 'Part 2 should return 31 for example input');
});
