/**
 * Graph algorithms and data structures for Advent of Code
 */

/**
 * Breadth-First Search
 * @param {*} start - Starting node
 * @param {Function} getNeighbors - Function that returns neighbors for a node
 * @param {Function} isGoal - Function to test if node is the goal
 * @returns {Object|null} { path: Array, distance: number } or null if no path found
 */
export function bfs(start, getNeighbors, isGoal) {
  const queue = [[start, [start]]];
  const visited = new Set([JSON.stringify(start)]);

  while (queue.length > 0) {
    const [current, path] = queue.shift();

    if (isGoal(current)) {
      return { path, distance: path.length - 1 };
    }

    for (const neighbor of getNeighbors(current)) {
      const key = JSON.stringify(neighbor);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }

  return null;
}

/**
 * Dijkstra's shortest path algorithm
 * @param {*} start - Starting node
 * @param {Function} getNeighbors - Function that returns [neighbor, cost] pairs
 * @param {Function} isGoal - Function to test if node is the goal
 * @returns {Object|null} { path: Array, cost: number } or null if no path found
 */
export function dijkstra(start, getNeighbors, isGoal) {
  const pq = new MinPriorityQueue();
  pq.enqueue(start, 0, [start]);
  const visited = new Set();

  while (!pq.isEmpty()) {
    const { item: current, priority: cost, path } = pq.dequeue();
    const key = JSON.stringify(current);

    if (visited.has(key)) continue;
    visited.add(key);

    if (isGoal(current)) {
      return { path, cost };
    }

    for (const [neighbor, edgeCost] of getNeighbors(current)) {
      const neighborKey = JSON.stringify(neighbor);
      if (!visited.has(neighborKey)) {
        pq.enqueue(neighbor, cost + edgeCost, [...path, neighbor]);
      }
    }
  }

  return null;
}

/**
 * A* pathfinding algorithm
 * @param {*} start - Starting node
 * @param {*} goal - Goal node
 * @param {Function} getNeighbors - Function that returns [neighbor, cost] pairs
 * @param {Function} heuristic - Heuristic function estimating cost to goal
 * @returns {Object|null} { path: Array, cost: number } or null if no path found
 */
export function aStar(start, goal, getNeighbors, heuristic) {
  const pq = new MinPriorityQueue();
  pq.enqueue(start, heuristic(start, goal), [start], 0);
  const visited = new Set();

  while (!pq.isEmpty()) {
    const { item: current, path, gCost } = pq.dequeue();
    const key = JSON.stringify(current);

    if (visited.has(key)) continue;
    visited.add(key);

    if (JSON.stringify(current) === JSON.stringify(goal)) {
      return { path, cost: gCost };
    }

    for (const [neighbor, edgeCost] of getNeighbors(current)) {
      const neighborKey = JSON.stringify(neighbor);
      if (!visited.has(neighborKey)) {
        const newGCost = gCost + edgeCost;
        const fCost = newGCost + heuristic(neighbor, goal);
        pq.enqueue(neighbor, fCost, [...path, neighbor], newGCost);
      }
    }
  }

  return null;
}

/**
 * Depth-First Search
 * @param {*} start - Starting node
 * @param {Function} getNeighbors - Function that returns neighbors for a node
 * @param {Function} process - Function to process each node (optional)
 * @returns {Set} Set of visited nodes
 */
export function dfs(start, getNeighbors, process = () => {}) {
  const visited = new Set();
  const stack = [start];

  while (stack.length > 0) {
    const current = stack.pop();
    const key = JSON.stringify(current);

    if (visited.has(key)) continue;
    visited.add(key);
    process(current);

    for (const neighbor of getNeighbors(current)) {
      const neighborKey = JSON.stringify(neighbor);
      if (!visited.has(neighborKey)) {
        stack.push(neighbor);
      }
    }
  }

  return visited;
}

/**
 * Manhattan distance between two points
 * @param {Array<number>} p1 - First point [x, y]
 * @param {Array<number>} p2 - Second point [x, y]
 * @returns {number} Manhattan distance
 */
export function manhattanDistance(p1, p2) {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

/**
 * Simple Min Priority Queue implementation
 */
class MinPriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item, priority, path = null, gCost = null) {
    this.items.push({ item, priority, path, gCost });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
