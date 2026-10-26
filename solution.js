'use strict';

/**
 * Cell Automaton — SHL assessment problem
 * ---------------------------------------------------------------------------
 * A colony of eight cells lies in a straight line. Each cell is either active
 * (1) or inactive (0). Every day every cell competes with its two adjacent
 * cells:
 *
 *   - both neighbours are the same (both active OR both inactive) -> the cell
 *     becomes inactive (0);
 *   - the neighbours differ -> the cell becomes active (1).
 *
 * The two end cells only have one neighbour; the missing neighbour counts as
 * always inactive. All cells are updated simultaneously, i.e. the new state of
 * a cell is always computed from the previous day's state.
 *
 * Equivalently: next[i] = left XOR right, where a neighbour outside the
 * colony is 0.
 *
 * Input
 *   line 1: eight space-separated integers (0/1) — the current cell states
 *   line 2: one integer `days` — how many days to simulate
 *
 * Output
 *   one line with eight space-separated integers — the state after `days`
 */

/** The colony always consists of exactly eight cells. */
const CELL_COUNT = 8;

/**
 * Advance the colony by exactly one day.
 *
 * @param {number[]} cells current states (0/1)
 * @returns {number[]} the states one day later
 */
function nextDay(cells) {
  const last = cells.length - 1;
  const next = new Array(cells.length);

  for (let i = 0; i < cells.length; i += 1) {
    const left = i > 0 ? cells[i - 1] : 0; // missing neighbour = inactive
    const right = i < last ? cells[i + 1] : 0; // missing neighbour = inactive
    next[i] = left !== right ? 1 : 0;
  }

  return next;
}

/**
 * Simulate the colony for a number of days.
 *
 * @param {number[]} cells initial states (0/1)
 * @param {number} days number of days to simulate
 * @returns {number[]} the states after `days` days
 */
function simulate(cells, days) {
  const state = cells.map((cell) => (cell ? 1 : 0));
  const total = Number.isFinite(days) && days > 0 ? Math.floor(days) : 0;

  for (let day = 0; day < total; day += 1) {
    const next = nextDay(state);
    for (let i = 0; i < state.length; i += 1) {
      state[i] = next[i]; // simultaneous update
    }
  }

  return state;
}

/**
 * Parse the raw problem input.
 *
 * Tolerates both documented layouts:
 *   "1 0 0 0 0 1 0 0\n1"   (space separated, as stated in the problem)
 *   "10000100\n1"          (compact, as displayed in the sample panels)
 *
 * @param {string} raw
 * @returns {{cells: number[], days: number}}
 */
function parseInput(raw) {
  const tokens = String(raw == null ? '' : raw)
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 0);

  const cells = [];
  let index = 0;

  // Collect the eight cell states; a token may hold one or several digits.
  while (cells.length < CELL_COUNT && index < tokens.length) {
    const token = tokens[index];
    index += 1;
    for (const char of token) {
      if (char !== '0' && char !== '1') break;
      cells.push(char === '1' ? 1 : 0);
      if (cells.length === CELL_COUNT) break;
    }
  }

  let days = 0;
  if (index < tokens.length) {
    const parsed = Number.parseInt(tokens[index], 10);
    if (Number.isFinite(parsed)) days = parsed;
  }

  return { cells, days };
}

/**
 * Render the final state the way the judge expects it: space separated.
 *
 * @param {number[]} cells
 * @returns {string}
 */
function formatOutput(cells) {
  return cells.join(' ');
}

/**
 * Full pipeline: raw input -> output string.
 *
 * @param {string} raw
 * @returns {string}
 */
function solve(raw) {
  const { cells, days } = parseInput(raw);
  return formatOutput(simulate(cells, days));
}

module.exports = {
  CELL_COUNT,
  nextDay,
  simulate,
  parseInput,
  formatOutput,
  solve,
};

/* ------------------------------ CLI entry point ----------------------------- */

if (require.main === module) {
  let input = '';

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    input += chunk;
  });
  process.stdin.on('end', () => {
    process.stdout.write(`${solve(input)}\n`);
  });
}
