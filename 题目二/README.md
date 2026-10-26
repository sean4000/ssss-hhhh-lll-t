# 题目二：Alternate Sort（交替排序）

## 一、题目原文

> 来源：SHL Assessment（amcatglobal.aspiringminds.cn）线上机考，截图逐字转录。

### Question

An alternate sort of a list consists of alternate elements (starting from the first position) of the given list after sorting it in an ascending order. You are given a list of unsorted elements. Write an algorithm to find the alternate sort of the given list.

### Input

The first line of the input consists of an integer `size`, representing the size of the given list (N).

The second line consists of N space-separated integers - list[1], list[2], ......, list[N], representing the input list of integers.

### Output

Print space-separated integers representing alternate sorted elements of the given list.

### Constraints

- 0 < size ≤ 10^6
- -10^6 ≤ list[i] ≤ 10^6
- 0 ≤ i < size

### Example

```
Input:
8
3 5 1 5 9 10 2 6

Output:
1 3 5 9
```

Explanation:

After sorting, the list is `[1, 2, 3, 5, 5, 6, 9, 10]`,
So, the alternate elements of the sorted list are `[1, 3, 5, 9]`.

### 预置测试用例（Predefined Test Cases）

| 用例 | 输入 | 期望输出 |
| --- | --- | --- |
| Case 1 | `8`<br>`3 5 1 5 9 10 2 6` | `1 3 5 9` |
| Case 2 | `9`<br>`16 15 11 8 5 4 3 2 1` | `1 3 5 11 16` |

## 二、题意解析

一句话概括：**把数组升序排序，然后取排序后第 1、3、5、7……个元素（下标 0, 2, 4, 6……）输出。**

拆开看三个要点：

1. **"alternate sort" 不是"交错排序"**。它不是把数组改成 `[小, 大, 小, 大...]` 那种交错排列，而是**排序后隔一个取一个**。
2. **"starting from the first position"** 明确了取的是排序后的**第 1 个**（下标 0），不是第 2 个。这决定了奇偶性，是本题最容易踩坑的地方。
3. **重复元素照常参与排序和取位**。例子里 `5` 出现了两次，排序后是 `[1,2,3,5,5,6,9,10]`，被取走的是下标 0/2/4/6 的 `1,3,5,9`——第二个 `5`（下标 4）被取，而下标 3 的那个 `5` 被跳过。所以"取位"是按**排序后序列的位置**算的，与元素值本身无关。

输出长度：`N` 为偶数时取 `N/2` 个，`N` 为奇数时取 `(N+1)/2` 个。

### 样例走一遍

Case 1：`[3,5,1,5,9,10,2,6]`
→ 排序 `[1,2,3,5,5,6,9,10]`
→ 取下标 0,2,4,6 → `[1,3,5,9]` ✅

Case 2：`[16,15,11,8,5,4,3,2,1]`
→ 排序 `[1,2,3,4,5,8,11,15,16]`
→ 取下标 0,2,4,6,8 → `[1,3,5,11,16]` ✅

## 三、约束带来的关键考量

`size` 上限是 **10^6**，这是一个**大输入**题目，直接决定了两处工程取舍：

1. **排序算法**：值域被限制在 `[-10^6, 10^6]`，桶数最多 `2×10^6+1`（约 8MB 的 `Int32Array`），所以**计数排序**完全可行，时间复杂度从 `O(N log N)` 降到 `O(N + R)`（R 为值域大小）。N 越大、值域越集中，优势越明显。
2. **输入解析**：`split(/\s+/)` 在 10^6 个数字上会产生百万级临时字符串，内存和 GC 压力都不小。手写一个逐字符扫描的整数解析器，只走一遍字符串、零临时对象。

## 四、解法思路

```
输入 → 解析成数字数组 → 升序排序 → 取下标 0,2,4,... → 空格分隔输出
```

排序部分做成**自适应**：

- 先扫一遍求 `min`/`max`；
- 若 `max - min + 1`（值域）小于阈值 → 走**计数排序**；
- 否则（例如出现题面约束之外的大数）→ 兜底走**比较排序**，保证正确性不依赖约束。

取位这一步在计数排序里可以**边扫描桶边取**，连"生成完整有序数组"都省了。

## 五、复杂度

| 实现 | 时间复杂度 | 空间复杂度 |
| --- | --- | --- |
| 计数排序（默认路径，值域受限） | `O(N + R)`，R ≤ 2×10^6+1 | `O(R)` 计数桶 + `O(N/2)` 输出 |
| 比较排序（兜底路径） | `O(N log N)` | `O(N)` |

`N = 10^6` 时计数排序整轮在几十毫秒量级。

## 六、目录结构

```
题目二/
├── README.md          # 本文件：题目原文 + 解析 + 思路
├── solution.js        # 解法：alternateSort() / solve() + stdin→stdout CLI
└── solution.test.js   # 测试：官方样例 + 边界 + 随机对拍 + CLI 端到端
```

## 七、运行方式

```bash
# 跑一个样例
printf '8\n3 5 1 5 9 10 2 6\n' | node 题目二/solution.js
# => 1 3 5 9

# 跑全部测试
node --test 题目二/
# 或在仓库根目录
npm test
```
