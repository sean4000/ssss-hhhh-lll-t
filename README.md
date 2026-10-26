# SHL 线上机考题目解答（Java）

七道 SHL TalentCentral 线上机考题的 Java 解法。每题一个目录，包含**题目原文转录 + 错误分析 + 提交用代码 + 本地测试**。

评测环境：Java 21（平台编译器版本与本机一致）。

## 题目索引

| 目录 | 题目 | 方法 | 类型 | 核心修复点 |
| --- | --- | --- | --- | --- |
| [`题目四/`](题目四/) | Difference in Times | `int difference_in_times(Time, Time)` | 补全代码 | 换算成"当天第几秒"，取绝对差 |
| [`题目五/`](题目五/) | Replace Values | `void replaceValues(int, int[])` | 修逻辑错误 | 循环步长 `+2` → `+1`（所有元素都要替换） |
| [`题目六/`](题目六/) | Sort Array Descending | `public void sortArray(int, int[])` | 修逻辑错误 | 找的是最小值（升序）→ 改成找最大值（降序） |
| [`题目七/`](题目七/) | Max Replace | `void maxReplace(int, int[])` | 修语法错误 | C++ 引用 `int &inputList` → `int[]`；补缺失的分号 |
| [`题目八/`](题目八/) | Calculate Matrix Sum | `int calculateMatrixSum(int, int, int[][])` | 修逻辑错误 | `sum=0` 被写在循环里；`/2!=0` 判奇数漏掉 `1` |
| [`题目九/`](题目九/) | All Exponent | `float allExponent(int, int)` | 补全代码 | 负指数：用 `\|exp\|` 调辅助类再取倒数 |
| [`题目十/`](题目十/) | Reverse Array | `public void reverseArray(int, int[])` | 修逻辑错误 | `originalLen += 1` → `-= 1`（否则数组越界） |

## 目录结构

```
.
├── README.md                  # 本文件：题目索引
├── package.json               # npm test -> 一键跑全部 Java 测试
├── scripts/
│   └── run-java-tests.sh      # 编译并运行题目四 ~ 题目十 的测试
├── 题目四/ ~ 题目十/
│   ├── README.md              # 题目原文、错误分析、解法、待确认项
│   ├── Solution.java          # ★ 提交用代码（只有 class Solution）
│   └── test/
│       ├── SolutionTest.java  # 本地断言测试
│       └── Time.java / Exponent.java   # 平台辅助类的本地副本（题目四、九）
```

## 跑测试

```bash
npm test          # 等价于 bash scripts/run-java-tests.sh
```

单独跑某题：

```bash
cd 题目八
javac -d out Solution.java test/SolutionTest.java
java -cp out SolutionTest
```

当前结果：**368 个断言全部通过**（题目四 11、题目五 9、题目六 207、题目七 9、题目八 11、题目九 12、题目十 109）。

## 提交注意

1. **只提交 `Solution.java`**：类名固定为 `Solution`，方法名和签名必须与平台默认代码完全一致（平台按签名反射调用）。
2. **辅助类不要提交**：题目四的 `Time`、题目九的 `Exponent` 由平台默认代码提供，`test/` 下的只是本地编译用的副本，提交会造成重复定义。
3. **原地修改数组的题目不要在方法里打印**（题目五、六、十）：数组内容由评测框架统一打印，方法里再打一次会输出重复。唯一例外是题目七——平台给的默认代码里就带 `System.out.print`，保持原样。
4. **不要写 `main()`**：平台自带入口。
5. 平台提示"不要修改实现思路"：所有修复都尽量做到最小改动，只改真正错的那几行。

## 已知的截图缺失项

详见各题 README 的"待确认 / 需补拍"一节：

| 题目 | 缺失内容 | 当前处理方式 |
| --- | --- | --- |
| 题目四 | 题目正文顶部被滚动截断；`Time` 类的 `compareTo` / `addSecond` 方法体被裁掉 | 解法只依赖 `hour/minute/second` 三个 public 字段，不受辅助类实现影响；跨午夜按绝对差（86399）处理 |
| 题目八 | `else` 分支被截断 | 推断为 `else { sum = 0; }`，用"声明处初始化 + 统一 return"等价覆盖 |
| 题目九 | `Exponent` 类只拍到注释，构造器与 `positiveExponent()` 实现被裁掉 | 解法用 `(float)` 强转 + `1.0f` 除法，兼容 `int` / `float` 两种返回类型 |
| 题目十 | 题面写"is supposed to print"，但给定代码里没有 print | 参照题目六（同为无 print 却期望输出数组内容）判定：**由评测框架打印，方法内不打印** |
