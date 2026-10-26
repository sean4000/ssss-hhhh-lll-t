# 题目三：Count Occurrences of a String（统计子串出现次数）

## 一、题目原文

> 来源：SHL Assessment（amcatglobal.aspiringminds.cn）线上机考，截图逐字转录。
> 评测语言：JavaScript (Node.js 16.18.1)。

### Question

You are given two strings containing only English alphabets. Write an algorithm to count the number of occurrences of alphabets in the first string neglecting the case of the letters.

### Input

The first line of the input represents the first string.

The second line of the input represents the second string.

### Output

Print an integer representing the number of occurrences of second string in the first string.

### Example

```
Input:
TimisplayinginthehouseofTimwiththetoysofTim
Tim

Output:
3
```

Explanation:

Tim is occurring 3 times in the first string. So, the output is 3.

### 预置测试用例（Predefined Test Cases）

| 用例 | 输入 | 期望输出 |
| --- | --- | --- |
| Case 1 | `abcdefg`<br>`bcd` | `1` |
| Case 2 | `TimisplayinginthehouseofTimwiththetoysofTim`<br>`Tim` | `3` |

## 二、题意解析

一句话：**把两个字符串都转成小写，然后在第一个字符串里逐个位置检查是否匹配第二个字符串，统计匹配成功的次数。**

要点：

1. **"neglecting the case" = 忽略大小写**。两边都 `toLowerCase()` 之后再比较，`Tim` 能匹配到 `tim`、`TIM`。
2. **统计的是"子串出现次数"，不是字符个数**。第二个字符串整体作为一个模式串，在第一个字符串里找。
3. **按位置扫描 = 重叠出现也计数**。例如 `aaaa` 中找 `aaa`，两个起始位置（下标 0 和 1）都命中，答案是 2。
   这一点两个官方用例都没覆盖，属于题意合理推断：题面说的是 "the number of occurrences of second string in the first string"，即每个起始位置各算一次。下面的测试用例把该语义显式固定下来。
4. **输出是一个整数**，不是字符串匹配位置。

### 样例走一遍

`TimisplayinginthehouseofTimwiththetoysofTim` 转小写 → `timisplayinginthehouseoftimwiththetoysoftim`

| 起始下标 | 匹配 |
| --- | --- |
| 0 | `tim` ✅ |
| 22 | `tim` ✅（`...houseof` 之后） |
| 36 | `tim` ✅（`...toysof` 之后） |

共 3 次 ✅

## 三、解法思路

```
读入两行 → trim + toLowerCase → 遍历源串所有可能的起始下标
         → startsWith(target, index) 命中则计数 +1 → 输出计数
```

- 时间复杂度：最坏 `O(n × m)`（n 为源串长度，m 为模式串长度，每次比较 O(m)）。
- 空间复杂度：`O(n + m)`（两个小写副本）。

> 若字符串规模达到百万级，可换成 KMP 把时间降到 `O(n + m)`；本题按"可提交 + 尽量短"的目标，
> 采用位置扫描写法。若评测口径为"不重叠计数"，只需在命中后把 `index` 前进 `m` 位。

## 四、目录结构

```
题目三/
├── README.md          # 本文件：题目原文 + 解析 + 思路
├── solution.js        # 解法（平台可直接提交的脚本）
└── solution.test.js   # 测试：Example + 官方用例 + 15 个边界用例
```

## 五、代码

### 最短可提交版（`solution.js`，平台可直接粘贴）

```javascript
process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdinInput = "";

process.stdin.on("data", function (input) {
  stdinInput += input;
});

process.stdin.on("end", function () {
  main(stdinInput);
});

function main(input) {
  var lineList = input.split(/\r?\n/);
  var sourceStr = (lineList[0] || "").trim().toLowerCase();
  var targetStr = (lineList[1] || "").trim().toLowerCase();
  var matchCount = 0;
  for (var index = 0; targetStr.length > 0 && index <= sourceStr.length - targetStr.length; index++) {
    if (sourceStr.startsWith(targetStr, index)) {
      matchCount += 1;
    }
  }
  console.log(matchCount);
}
```

### 稍清晰版（拆出计数函数，逻辑同最短版）

```javascript
process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdinInput = "";

process.stdin.on("data", function (input) {
  stdinInput += input;
});

process.stdin.on("end", function () {
  main(stdinInput);
});

function main(input) {
  var lineList = input.split(/\r?\n/);
  var firstStr = (lineList[0] || "").trim();
  var secondStr = (lineList[1] || "").trim();
  console.log(countMatches(firstStr, secondStr));
}

function countMatches(firstStr, secondStr) {
  var sourceStr = firstStr.toLowerCase();
  var targetStr = secondStr.toLowerCase();
  if (targetStr.length === 0) {
    return 0;
  }
  var matchCount = 0;
  for (var index = 0; index <= sourceStr.length - targetStr.length; index++) {
    if (sourceStr.startsWith(targetStr, index)) {
      matchCount += 1;
    }
  }
  return matchCount;
}
```

## 六、测试覆盖

20 个用例，全部通过（Example + 2 个官方用例 + 17 个边界用例）：

| 类别 | 用例 |
| --- | --- |
| 官方 | Example → 3、Case 1 → 1、Case 2 → 3 |
| 空值 | 第一行为空、第二行为空、整个输入为空 → 均 0 |
| 相等 | 两串完全相同 → 1；单字符相同 → 1；单字符仅大小写不同 → 1；模式串是源串前缀 → 1 |
| 大小写 | `AbCdEf` 找 `bcd` → 1；`AaA` 找 `a` → 3 |
| 长度 | 模式串比源串长 → 0 |
| 计数语义 | `aaaa` 找 `aa` → 3（三个起始位置）；`aaaa` 找 `aaa` → 2（重叠也计数） |
| 不存在 | `abc` 找 `xyz` → 0 |
| 格式 | 源串含空格、含数字、首尾空格、尾部多余空行、CRLF 换行 → 均 1 |

## 七、运行方式

```bash
# 跑一个样例
printf 'abcdefg\nbcd\n' | node 题目三/solution.js
# => 1

# 跑本题的测试
node --test 题目三/solution.test.js

# 在仓库根目录跑全部题目（题目一 + 题目二 + 题目三）
npm test
```
