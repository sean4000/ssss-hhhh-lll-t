'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const scriptPath = path.join(__dirname, 'solution.js');

/** 运行被测脚本，把 stdin 喂进去，返回 stdout（去掉末尾换行） */
function runProgram(input) {
  const result = spawnSync(process.execPath, [scriptPath], {
    input,
    encoding: 'utf-8',
  });
  assert.equal(result.status, 0, `脚本退出码 ${result.status}: ${result.stderr}`);
  return result.stdout.trim();
}

/* ------------------------- Example / 官方测试用例 ------------------------- */

test('Example: TimisplayinginthehouseofTimwiththetoysofTim + Tim -> 3', () => {
  assert.equal(
    runProgram('TimisplayinginthehouseofTimwiththetoysofTim\nTim\n'),
    '3',
  );
});

test('Case 1: abcdefg + bcd -> 1', () => {
  assert.equal(runProgram('abcdefg\nbcd\n'), '1');
});

test('Case 2: TimisplayinginthehouseofTimwiththetoysofTim + Tim -> 3', () => {
  assert.equal(
    runProgram('TimisplayinginthehouseofTimwiththetoysofTim\nTim\n'),
    '3',
  );
});

/* --------------------------- 边界 / 易错测试用例 -------------------------- */

test('边界: 第一行为空 -> 0', () => {
  assert.equal(runProgram('\nabc\n'), '0');
});

test('边界: 第二行为空 -> 0', () => {
  assert.equal(runProgram('abc\n\n'), '0');
});

test('边界: 整个输入为空 -> 0', () => {
  assert.equal(runProgram(''), '0');
});

test('边界: 两个字符串完全相同 -> 1', () => {
  assert.equal(runProgram('abc\nabc\n'), '1');
});

test('边界: 大小写不同也算命中 -> 1', () => {
  assert.equal(runProgram('AbCdEf\nbcd\n'), '1');
});

test('边界: 模式串比源串长 -> 0', () => {
  assert.equal(runProgram('ab\nabc\n'), '0');
});

test('边界: 多次出现逐个位置计数 -> 3', () => {
  // "aaaa" 中 "aa" 出现在下标 0、1、2 三个起始位置（重叠也计数）
  assert.equal(runProgram('aaaa\naa\n'), '3');
});

test('边界: 重叠出现也计数 -> 2', () => {
  assert.equal(runProgram('aaaa\naaa\n'), '2');
});

test('边界: 模式串不存在 -> 0', () => {
  assert.equal(runProgram('abc\nxyz\n'), '0');
});

test('边界: 源串含空格 -> 1', () => {
  assert.equal(runProgram('hello world\nworld\n'), '1');
});

test('边界: 尾部多余空行 -> 1', () => {
  assert.equal(runProgram('abc\nabc\n\n\n'), '1');
});

test('边界: Windows 换行 CRLF -> 1', () => {
  assert.equal(runProgram('abc\r\nabc\r\n'), '1');
});

test('边界: 单字符相同 -> 1', () => {
  assert.equal(runProgram('a\na\n'), '1');
});

test('边界: 单字符大小写不同 -> 1', () => {
  assert.equal(runProgram('a\nA\n'), '1');
});

test('边界: 模式串是源串的前缀 -> 1', () => {
  assert.equal(runProgram('abcdef\nabc\n'), '1');
});

test('边界: 源串含数字不影响匹配 -> 1', () => {
  assert.equal(runProgram('abc123\nbc1\n'), '1');
});

test('边界: 首尾有空格 -> 1', () => {
  assert.equal(runProgram('  abc  \n  abc  \n'), '1');
});
