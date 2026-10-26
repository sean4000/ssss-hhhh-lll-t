'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const {
  COUNTING_RANGE_LIMIT,
  alternateSort,
  alternateSortByComparison,
  alternateSortByCounting,
  parseNumbers,
  parseInput,
  formatOutput,
  solve,
} = require('./solution');

/** 参考实现：先排序，再取下标 0,2,4,...（题面字面含义） */
function reference(list) {
  return list
    .slice()
    .sort((a, b) => a - b)
    .filter((_, index) => index % 2 === 0);
}

/** 可复现的伪随机数生成器（mulberry32） */
function makeRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* --------------------------- official test cases --------------------------- */

test('Case 1: 8 / 3 5 1 5 9 10 2 6 -> 1 3 5 9', () => {
  const input = '8\n3 5 1 5 9 10 2 6\n';
  assert.equal(solve(input), '1 3 5 9');
});

test('Case 2: 9 / 16 15 11 8 5 4 3 2 1 -> 1 3 5 11 16', () => {
  const input = '9\n16 15 11 8 5 4 3 2 1\n';
  assert.equal(solve(input), '1 3 5 11 16');
});

test('the example from the statement', () => {
  assert.equal(solve('8\n3 5 1 5 9 10 2 6'), '1 3 5 9');
});

test('official cases also work with the list on one line', () => {
  assert.equal(solve('8 3 5 1 5 9 10 2 6'), '1 3 5 9');
  assert.equal(solve('9 16 15 11 8 5 4 3 2 1'), '1 3 5 11 16');
});

/* --------------------------------- 规则 ----------------------------------- */

test('takes every other element of the sorted list, starting from the first', () => {
  // sorted: [1,2,3,4,5,6,7,8,9,10] -> indices 0,2,4,6,8
  assert.deepEqual(alternateSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]), [
    1, 3, 5, 7, 9,
  ]);
});

test('output length is ceil(N / 2)', () => {
  for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    const list = Array.from({ length: n }, (_, i) => n - i);
    assert.equal(alternateSort(list).length, Math.ceil(n / 2), `N=${n}`);
  }
});

test('duplicate values are treated as separate positions', () => {
  // sorted: [5,5,5,5] -> indices 0,2
  assert.deepEqual(alternateSort([5, 5, 5, 5]), [5, 5]);
  // sorted: [1,1,1,2,2] -> indices 0,2,4
  assert.deepEqual(alternateSort([1, 2, 1, 2, 1]), [1, 1, 2]);
});

test('handles negative values', () => {
  // sorted: [-9,-5,-1,0,4,7] -> indices 0,2,4
  assert.deepEqual(alternateSort([4, -5, 0, 7, -9, -1]), [-9, -1, 4]);
});

test('an already sorted list gives the same result as an unsorted one', () => {
  const sorted = [1, 2, 3, 4, 5, 6];
  assert.deepEqual(alternateSort(sorted), alternateSort(sorted.slice().reverse()));
});

test('a single element list returns that element', () => {
  assert.deepEqual(alternateSort([42]), [42]);
});

test('an empty list returns an empty result', () => {
  assert.deepEqual(alternateSort([]), []);
});

/* ------------------------- 两条排序路径必须一致 --------------------------- */

test('counting-sort path and comparison-sort fallback agree', () => {
  const random = makeRandom(20240501);
  for (let trial = 0; trial < 200; trial += 1) {
    const n = 1 + Math.floor(random() * 30);
    const list = Array.from({ length: n }, () =>
      Math.floor(random() * 41) - 20, // 范围 [-20, 20]
    );
    const min = Math.min(...list);
    const range = Math.max(...list) - min + 1;

    const counting = alternateSortByCounting(list, min, range);
    const comparison = alternateSortByComparison(list);
    assert.deepEqual(counting, comparison);
    assert.deepEqual(counting, reference(list));
  }
});

test('values outside the stated range fall back to comparison sort', () => {
  const list = [0, 10_000_000, 5_000_000]; // 值域 > COUNTING_RANGE_LIMIT
  assert.ok(
    Math.max(...list) - Math.min(...list) + 1 > COUNTING_RANGE_LIMIT,
    '这个用例必须走兜底路径',
  );
  assert.deepEqual(alternateSort(list), [0, 10_000_000]);
});

test('both sort paths produce the reference result', () => {
  const list = [4, 2, 9, 2, 7, 1, 8, 3];
  assert.deepEqual(alternateSortByComparison(list), reference(list));
  assert.deepEqual(
    alternateSortByCounting(list, Math.min(...list), Math.max(...list) - Math.min(...list) + 1),
    reference(list),
  );
});

/* ------------------------------ 随机对拍 ---------------------------------- */

test('matches the reference on 2000 random lists', () => {
  const random = makeRandom(987654321);
  for (let trial = 0; trial < 2000; trial += 1) {
    const n = 1 + Math.floor(random() * 50);
    const list = Array.from({ length: n }, () =>
      Math.floor(random() * 2001) - 1000,
    );
    assert.deepEqual(alternateSort(list), reference(list), `list=${list}`);
  }
});

test('matches the reference on random lists with a huge value range', () => {
  const random = makeRandom(13572468);
  for (let trial = 0; trial < 50; trial += 1) {
    const n = 1 + Math.floor(random() * 20);
    const list = Array.from({ length: n }, () =>
      Math.floor(random() * 2_000_000_000) - 1_000_000_000,
    );
    assert.deepEqual(alternateSort(list), reference(list));
  }
});

/* -------------------------------- 输入解析 --------------------------------- */

test('parseNumbers handles signs, extra whitespace and blank lines', () => {
  assert.deepEqual(parseNumbers('8\n3 5 1\n'), [8, 3, 5, 1]);
  assert.deepEqual(parseNumbers('  -3  +5  -0 '), [-3, 5, -0]);
  assert.deepEqual(parseNumbers('1\r\n2\t3\n\n'), [1, 2, 3]);
  assert.deepEqual(parseNumbers(''), []);
});

test('parseInput splits size and list', () => {
  assert.deepEqual(parseInput('8\n3 5 1 5 9 10 2 6\n'), {
    size: 8,
    list: [3, 5, 1, 5, 9, 10, 2, 6],
  });
  assert.deepEqual(parseInput('3 1 2 3').list, [1, 2, 3]);
});

/* --------------------------------- 输出 ----------------------------------- */

test('output is space separated without a trailing space', () => {
  const out = solve('8\n3 5 1 5 9 10 2 6\n');
  assert.equal(out, '1 3 5 9');
  assert.equal(out.split(' ').length, 4);
  assert.ok(!out.endsWith(' '));
  assert.equal(formatOutput([1, 2]), '1 2');
});

/* -------------------------------- 大数据量 -------------------------------- */

test('handles the maximum input size (10^6 elements)', { timeout: 120000 }, () => {
  const random = makeRandom(31415926);
  const n = 1_000_000;
  const list = new Array(n);
  for (let i = 0; i < n; i += 1) {
    list[i] = Math.floor(random() * 2_000_001) - 1_000_000;
  }

  const started = process.hrtime.bigint();
  const result = alternateSort(list);
  const elapsedMs = Number(process.hrtime.bigint() - started) / 1e6;

  assert.equal(result.length, Math.ceil(n / 2));
  assert.deepEqual(result, reference(list));

  const input = `${n}\n${list.join(' ')}\n`;
  assert.equal(solve(input), result.join(' '));
  assert.ok(elapsedMs < 5000, `耗时 ${elapsedMs.toFixed(0)}ms，超出预期`);
});

/* --------------------------------- CLI ------------------------------------ */

test('the program reads stdin and writes the expected stdout', () => {
  const script = path.join(__dirname, 'solution.js');
  const run = (input) =>
    spawnSync(process.execPath, [script], { input, encoding: 'utf8' });

  const case1 = run('8\n3 5 1 5 9 10 2 6\n');
  assert.equal(case1.status, 0);
  assert.equal(case1.stdout, '1 3 5 9\n');

  const case2 = run('9\n16 15 11 8 5 4 3 2 1\n');
  assert.equal(case2.status, 0);
  assert.equal(case2.stdout, '1 3 5 11 16\n');
});
