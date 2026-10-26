# ssss-hhhh-lll-t

SHL 线上机考题目的 JavaScript 解法集。每题一个目录（含题目 README、解答、测试），
根目录放公共说明。

## 题目索引

| 题目 | 目录 | 说明 | 解法 |
| --- | --- | --- | --- |
| 题目一 | 仓库根目录 | Cell Automaton：8 格菌落按"邻居相同→灭，不同→活"逐日演化 | `solution.js` |
| 题目二 | [`题目二/`](题目二/) | Alternate Sort：升序排序后隔一个取一个 | `题目二/solution.js` |
| 题目三 | [`题目三/`](题目三/) | Count Occurrences：忽略大小写统计子串出现次数 | `题目三/solution.js` |

## 题目一：Cell Automaton (SHL assessment) — JavaScript solution

A colony of eight cells in a straight line. Every day each cell looks at its two
neighbours: if both neighbours are the same (both active or both inactive) the
cell becomes inactive, otherwise it becomes active. The end cells have only one
neighbour and the missing one counts as inactive. All cells update
simultaneously.

That is, for each cell: `next[i] = left XOR right` (a neighbour outside the
colony is `0`).

### Files

| Path | Purpose |
| --- | --- |
| `solution.js` | Solution: `simulate()` / `solve()` plus a stdin→stdout CLI |
| `solution.test.js` | Test suite (Node's built-in test runner) |

### Input / Output

```
input   line 1: 1 0 0 0 0 1 0 0      (eight space-separated 0/1 values)
        line 2: 1                    (number of days)
output  0 1 0 0 1 0 1 0              (eight space-separated 0/1 values)
```

The compact form `10000100` is accepted for the first line as well.

### Run

```bash
# sample run
echo "1 0 0 0 0 1 0 0
1" | node solution.js

# full test suite
npm test
```

## 题目二：Alternate Sort（交替排序）

见 [`题目二/README.md`](题目二/README.md)：题目原文、题意解析、约束取舍、复杂度与测试覆盖。

```bash
printf '8\n3 5 1 5 9 10 2 6\n' | node 题目二/solution.js
# => 1 3 5 9
```

## 题目三：Count Occurrences（统计子串出现次数）

见 [`题目三/README.md`](题目三/README.md)：题目原文、题意解析、两种写法与测试覆盖。

```bash
printf 'abcdefg\nbcd\n' | node 题目三/solution.js
# => 1
```

## 跑全部测试

```bash
npm test        # = node --test，自动发现仓库内所有 *.test.js
```

