'use strict';

/**
 * Alternate Sort — SHL assessment problem (题目二)
 * ---------------------------------------------------------------------------
 * An alternate sort of a list consists of alternate elements (starting from the
 * first position) of the given list after sorting it in an ascending order.
 *
 *   输入：第一行 size (= N)，第二行 N 个整数
 *   输出：升序排序后取下标 0, 2, 4, ... 的元素，空格分隔
 *
 * 约束：0 < size ≤ 10^6，-10^6 ≤ list[i] ≤ 10^6
 *
 * 因为 N 高达 10^6 而值域被限制在 [-10^6, 10^6]，默认走**计数排序**：
 *   O(N + R)，R ≤ 2×10^6+1 个桶（Int32Array，约 8MB）。
 * 若输入出现超出约束的大值（值域过大），自动兜底切换到比较排序 O(N log N)，
 * 保证结果不依赖约束的正确性。
 */

/** 值域阈值：超过这个跨度就放弃计数排序，改用比较排序。 */
const COUNTING_RANGE_LIMIT = 4_000_001;

/**
 * 兜底实现：比较排序后取下标 0, 2, 4, ...
 *
 * @param {number[]} list
 * @returns {number[]}
 */
function alternateSortByComparison(list) {
  const sorted = list.slice().sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i += 2) {
    result.push(sorted[i]);
  }
  return result;
}

/**
 * 计数排序实现：统计每个值的出现次数，按值从小到大扫描桶，
 * 边扫描边按“隔一个取一个”的规则收集结果（不需要先构造完整有序数组）。
 *
 * @param {number[]} list
 * @param {number} min 列表最小值
 * @param {number} range 值域大小 (= max - min + 1)
 * @returns {number[]}
 */
function alternateSortByCounting(list, min, range) {
  const counts = new Int32Array(range);
  for (let i = 0; i < list.length; i += 1) {
    counts[list[i] - min] += 1;
  }

  const result = [];
  let take = true; // 排序后序列中的第 1 个元素（下标 0）要被取走
  for (let value = 0; value < range; value += 1) {
    let remaining = counts[value];
    while (remaining > 0) {
      if (take) {
        result.push(value + min);
        take = false;
      } else {
        take = true;
      }
      remaining -= 1;
    }
  }
  return result;
}

/**
 * 求给定列表的 alternate sort。
 *
 * @param {number[]} list 整数列表
 * @returns {number[]} 升序排序后下标 0, 2, 4, ... 的元素
 */
function alternateSort(list) {
  const n = list.length;
  if (n === 0) return [];

  let min = list[0];
  let max = list[0];
  for (let i = 1; i < n; i += 1) {
    const value = list[i];
    if (value < min) min = value;
    if (value > max) max = value;
  }

  const range = max - min + 1;
  if (range <= COUNTING_RANGE_LIMIT) {
    return alternateSortByCounting(list, min, range);
  }
  return alternateSortByComparison(list);
}

/**
 * 快速整数解析：逐字符扫描字符串，避免 split 在百万级输入上产生大量临时字符串。
 *
 * @param {string} raw
 * @returns {number[]} 所有解析出的整数
 */
function parseNumbers(raw) {
  const text = String(raw == null ? '' : raw);
  const length = text.length;
  const numbers = [];

  let i = 0;
  while (i < length) {
    const code = text.charCodeAt(i);

    // 跳过空白
    if (
      code === 32 || // space
      code === 9 || // tab
      code === 10 || // \n
      code === 13 || // \r
      code === 11 || // \v
      code === 12 // \f
    ) {
      i += 1;
      continue;
    }

    // 可选符号
    let sign = 1;
    if (code === 45) {
      // '-'
      sign = -1;
      i += 1;
    } else if (code === 43) {
      // '+'
      i += 1;
    }

    // 数字主体
    let value = 0;
    let hasDigit = false;
    while (i < length) {
      const digit = text.charCodeAt(i);
      if (digit < 48 || digit > 57) break; // 不是 '0'-'9'
      value = value * 10 + (digit - 48);
      hasDigit = true;
      i += 1;
    }

    if (hasDigit) {
      numbers.push(sign * value);
    } else {
      // 不是数字也不是空白，跳过这个字符，避免死循环
      i += 1;
    }
  }

  return numbers;
}

/**
 * 解析题目输入：第一个数是 size，后面 size 个数是列表。
 *
 * @param {string} raw
 * @returns {{size: number, list: number[]}}
 */
function parseInput(raw) {
  const numbers = parseNumbers(raw);
  const size = numbers.length > 0 ? numbers[0] : 0;
  const list = numbers.slice(1, 1 + (size > 0 ? size : numbers.length - 1));
  return { size, list };
}

/**
 * 渲染输出：空格分隔的整数。
 *
 * @param {number[]} values
 * @returns {string}
 */
function formatOutput(values) {
  return values.join(' ');
}

/**
 * 完整流程：原始输入 -> 输出字符串。
 *
 * @param {string} raw
 * @returns {string}
 */
function solve(raw) {
  const { list } = parseInput(raw);
  return formatOutput(alternateSort(list));
}

module.exports = {
  COUNTING_RANGE_LIMIT,
  alternateSort,
  alternateSortByComparison,
  alternateSortByCounting,
  parseNumbers,
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
