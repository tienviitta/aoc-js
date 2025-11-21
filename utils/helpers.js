/**
 * General utility functions for Advent of Code
 */

/**
 * Sum of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} Sum
 */
export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

/**
 * Product of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} Product
 */
export function product(arr) {
  return arr.reduce((a, b) => a * b, 1);
}

/**
 * Counts occurrences of each element in an array
 * @param {Array} arr - Array of elements
 * @returns {Map} Map of element -> count
 */
export function countOccurrences(arr) {
  const counts = new Map();
  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  return counts;
}

/**
 * Creates a range of numbers
 * @param {number} start - Start of range (inclusive)
 * @param {number} end - End of range (exclusive)
 * @param {number} step - Step size (default: 1)
 * @returns {number[]} Array of numbers
 */
export function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Chunks an array into smaller arrays of specified size
 * @param {Array} arr - Input array
 * @param {number} size - Chunk size
 * @returns {Array[]} Array of chunks
 */
export function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Finds all permutations of an array
 * @param {Array} arr - Input array
 * @returns {Array[]} Array of permutations
 */
export function permutations(arr) {
  if (arr.length <= 1) return [arr];
  
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = permutations(rest);
    for (const perm of perms) {
      result.push([arr[i], ...perm]);
    }
  }
  return result;
}

/**
 * Finds all combinations of an array of given size
 * @param {Array} arr - Input array
 * @param {number} size - Combination size
 * @returns {Array[]} Array of combinations
 */
export function combinations(arr, size) {
  if (size === 1) return arr.map(item => [item]);
  if (size === arr.length) return [arr];
  
  const result = [];
  for (let i = 0; i <= arr.length - size; i++) {
    const head = arr[i];
    const tailCombs = combinations(arr.slice(i + 1), size - 1);
    for (const tailComb of tailCombs) {
      result.push([head, ...tailComb]);
    }
  }
  return result;
}

/**
 * Greatest Common Divisor
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} GCD
 */
export function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Least Common Multiple
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} LCM
 */
export function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Finds LCM of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} LCM of all numbers
 */
export function lcmArray(arr) {
  return arr.reduce((a, b) => lcm(a, b));
}

/**
 * Checks if a number is prime
 * @param {number} n - Number to check
 * @returns {boolean} True if prime
 */
export function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Memoizes a function
 * @param {Function} fn - Function to memoize
 * @returns {Function} Memoized function
 */
export function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Extracts all numbers from a string
 * @param {string} str - Input string
 * @param {boolean} includeNegative - Whether to include negative numbers
 * @returns {number[]} Array of numbers
 */
export function extractNumbers(str, includeNegative = true) {
  const pattern = includeNegative ? /-?\d+/g : /\d+/g;
  return (str.match(pattern) || []).map(Number);
}

/**
 * Deep clones an object or array
 * @param {*} obj - Object to clone
 * @returns {*} Deep clone
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
