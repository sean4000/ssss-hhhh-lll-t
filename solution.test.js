'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const {
  nextDay,
  simulate,
  parseInput,
  formatOutput,
  solve,
} = require('./solution');

/**
 * Reference implementation transcribed literally from the problem statement
 * ("if both neighbours are active or both are inactive -> inactive, otherwise
 * active"), used to cross-check the optimised XOR formulation.
 */
function reference(cells, days) {
  let state = cells.slice();
  for (let day = 0; day < days; day += 1) {
    const next = [];
    for (let i = 0; i < state.length; i += 1) {
      const left = i - 1 >= 0 ? state[i - 1] : 0;
      const right = i + 1 < state.length ? state[i + 1] : 0;
      const bothActive = left === 1 && right === 1;
      const bothInactive = left === 0 && right === 0;
      next.push(bothActive || bothInactive ? 0 : 1);
    }
    state = next;
  }
  return state;
}

/* --------------------------- official test cases --------------------------- */

test('Case 1: 10000100 after 1 day -> 01001010', () => {
  const input = '1 0 0 0 0 1 0 0\n1\n';
  assert.equal(solve(input), '0 1 0 0 1 0 1 0');
});

test('Case 2: 11101111 after 2 days -> 00000110', () => {
  const input = '1 1 1 0 1 1 1 1\n2\n';
  assert.equal(solve(input), '0 0 0 0 0 1 1 0');
});

test('official cases also work with the compact input layout', () => {
  assert.equal(solve('10000100\n1\n'), '0 1 0 0 1 0 1 0');
  assert.equal(solve('11101111\n2\n'), '0 0 0 0 0 1 1 0');
});

/* ------------------------------ parsing rules ------------------------------ */

test('parseInput reads eight cells and the number of days', () => {
  assert.deepEqual(parseInput('1 0 0 0 0 1 0 0\n1'), {
    cells: [1, 0, 0, 0, 0, 1, 0, 0],
    days: 1,
  });
  assert.deepEqual(parseInput('10000100\n7'), {
    cells: [1, 0, 0, 0, 0, 1, 0, 0],
    days: 7,
  });
});

test('parseInput tolerates extra whitespace, blank lines and missing days', () => {
  assert.deepEqual(parseInput('  1 0 0 0 0 1 0 0  \n\n  3 \n').cells, [
    1, 0, 0, 0, 0, 1, 0, 0,
  ]);
  assert.equal(parseInput('1 0 0 0 0 1 0 0\n  3 \n').days, 3);
  assert.equal(parseInput('1 0 0 0 0 1 0 0').days, 0);
});

/* ------------------------------ behaviour rules ---------------------------- */

test('a day where neighbours agree makes the cell inactive', () => {
  assert.deepEqual(nextDay([1, 1, 1, 1, 1, 1, 1, 1]), [
    1, 0, 0, 0, 0, 0, 0, 1,
  ]);
});

test('a day where neighbours differ makes the cell active', () => {
  assert.deepEqual(nextDay([0, 0, 0, 1, 0, 0, 0, 0]), [
    0, 0, 1, 0, 1, 0, 0, 0,
  ]);
});

test('the missing neighbour of an end cell counts as inactive', () => {
  // cell 0 has only cell 1 as neighbour -> it copies cell 1
  assert.equal(simulate([1, 1, 0, 0, 0, 0, 0, 0], 1)[0], 1);
  // cell 7 has only cell 6 as neighbour -> it copies cell 6
  assert.equal(simulate([0, 0, 0, 0, 0, 0, 1, 1], 1)[7], 1);
});

test('updates are simultaneous (previous state is used for every cell)', () => {
  // mutating the array while iterating would give 1 1 0 0 0 0 0 0 here
  assert.deepEqual(simulate([0, 1, 0, 0, 0, 0, 0, 0], 1), [
    1, 0, 1, 0, 0, 0, 0, 0,
  ]);
  assert.deepEqual(simulate([1, 1, 0, 0, 0, 0, 0, 0], 1), [
    1, 1, 1, 0, 0, 0, 0, 0,
  ]);
});

test('zero days leaves the colony untouched', () => {
  assert.deepEqual(simulate([1, 0, 1, 0, 1, 0, 1, 0], 0), [
    1, 0, 1, 0, 1, 0, 1, 0,
  ]);
});

test('an all-inactive colony stays inactive forever', () => {
  assert.deepEqual(simulate([0, 0, 0, 0, 0, 0, 0, 0], 42), [
    0, 0, 0, 0, 0, 0, 0, 0,
  ]);
});

test('the colony settles into a repeating pattern', () => {
  // [1,0,0,0,0,1,0,0] -> day1 [0,1,0,0,1,0,1,0] -> day2 [1,0,1,1,0,0,0,1]
  assert.deepEqual(simulate([1, 0, 0, 0, 0, 1, 0, 0], 1), [
    0, 1, 0, 0, 1, 0, 1, 0,
  ]);
  assert.deepEqual(simulate([1, 0, 0, 0, 0, 1, 0, 0], 2), [
    1, 0, 1, 1, 0, 0, 0, 1,
  ]);
  assert.deepEqual(simulate([1, 0, 0, 0, 0, 1, 0, 0], 3), [
    0, 0, 1, 1, 1, 0, 1, 0,
  ]);
});

test('states never leave the {0,1} domain', () => {
  for (let seed = 0; seed < 256; seed += 1) {
    const cells = Array.from({ length: 8 }, (_, i) => (seed >> i) & 1);
    const result = simulate(cells, 30);
    for (const cell of result) {
      assert.ok(cell === 0 || cell === 1, `invalid cell value ${cell}`);
    }
  }
});

/* ---------------------------- brute-force cross-check ---------------------- */

test('matches the literal reading of the rules for all 256 colonies x 30 days', () => {
  for (let seed = 0; seed < 256; seed += 1) {
    const cells = Array.from({ length: 8 }, (_, i) => (seed >> i) & 1);
    for (const days of [0, 1, 2, 3, 7, 15, 30]) {
      assert.deepEqual(
        simulate(cells, days),
        reference(cells, days),
        `mismatch for ${cells.join('')} after ${days} days`,
      );
    }
  }
});

/* --------------------------------- output ---------------------------------- */

test('output is eight space-separated integers', () => {
  const out = solve('1 0 0 0 0 1 0 0\n1');
  assert.equal(out.split(' ').length, 8);
  assert.match(out, /^[01]( [01]){7}$/);
  assert.equal(formatOutput([0, 1, 0, 0, 1, 0, 1, 0]), '0 1 0 0 1 0 1 0');
});

/* --------------------------------- CLI ------------------------------------- */

test('the program reads stdin and writes the expected stdout', () => {
  const script = path.join(__dirname, 'solution.js');
  const run = (input) =>
    spawnSync(process.execPath, [script], { input, encoding: 'utf8' });

  const case1 = run('1 0 0 0 0 1 0 0\n1\n');
  assert.equal(case1.status, 0);
  assert.equal(case1.stdout, '0 1 0 0 1 0 1 0\n');

  const case2 = run('1 1 1 0 1 1 1 1\n2\n');
  assert.equal(case2.status, 0);
  assert.equal(case2.stdout, '0 0 0 0 0 1 1 0\n');
});
