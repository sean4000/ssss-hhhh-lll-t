# 题目九：All Exponent（支持负指数的幂）

> 来源：SHL Assessment，Java 版。截图：IMG_9455.JPG。
> 类型：**补全代码**（正指数分支已给，负指数分支留空）。

## 一、题目原文

### Question

You are required to complete the given code. You can click on *Compile & Run* anytime to check the compilation/execution status of the program. You can use `System.out.println()` to debug your code. The submitted code should be logically/syntactically correct and pass all testcases. Do not write the `main()` function as it is not required.

**Code Approach:** For this question, you will need to complete the code as given in implementation. We **do not** expect you to modify the approach.

The function/method `allExponent` returns a real number representing the result of exponentiation of base raised to power exponent for all input values. The function/method `allExponent` accepts two arguments - `baseValue`, an integer representing the base and `exponentValue`, an integer representing the exponent.

The incomplete code in the function/method `allExponent` works only for positive values of the exponent. You must complete the code and make it work for negative values of exponent as well.

Another function/method `positiveExponent` uses an efficient way for exponentiation but accepts only positive exponent values. You are supposed to use this function/method to complete the code in `allExponent` function/method.

### Helper Description

The following class is used to represent a Exponent and is already implemented in the default code (Do not write this definition again in your code):

```java
public class Exponent
{
    public int base;
    public int exponent;
    int positiveExponent()
    {
        /*It calculate the Exponent for positive
        This can be called as -
        Exponent exp = new Exponent(baseValue, exponentValue);
        float res = exp.positiveExponent();*/
    }
}
```

### 给定代码（需要补全的部分）

```java
// You can print the values to stdout for debugging
class Solution
{
    float allExponent(int baseValue, int exponentValue)
    {
        float res = 1;
        if(exponentValue > 0)
        {
            Exponent exp = new Exponent(baseValue, exponentValue);
            res = (float)exp.positiveExponent();
        }
        else
        {
            // write your code here for negative exponentInput
        }
        return res;
    }
}
```

### 预置测试用例

| 用例 | 输入 | 期望输出 |
| --- | --- | --- |
| Case 1 | `5, 2` | `25` |
| Case 2 | `5, -2` | `0.04` |

## 二、题意解析

返回 `baseValue ^ exponentValue`，**负指数也要支持**。

- Case 1：`5^2 = 25`（正指数分支，代码已给）
- Case 2：`5^-2 = 1/25 = 0.04`（负指数分支，需要补）

题面明确要求用 `positiveExponent` 辅助方法，所以负指数的做法是：
**用 |指数| 调辅助类拿到 `base^|exp|`，再取倒数**——`base^(-e) = 1 / base^e`。

## 三、解法（提交用）

```java
class Solution
{
    float allExponent(int baseValue, int exponentValue)
    {
        float res = 1;
        if(exponentValue > 0)
        {
            Exponent exp = new Exponent(baseValue, exponentValue);
            res = (float)exp.positiveExponent();
        }
        else if(exponentValue == 0)
        {
            res = 1;
        }
        else
        {
            Exponent exp = new Exponent(baseValue, -exponentValue);
            res = 1.0f / (float)exp.positiveExponent();
        }
        return res;
    }
}
```

要点：
- `(float)` 强转与原代码保持一致，**无论 `positiveExponent()` 返回 `int` 还是 `float` 都能编译通过**。
- 额外补了 `exponentValue == 0` 的分支（任何数⁰ = 1）。辅助方法在指数为 0 时若返回 0，`1/0` 会得到 `Infinity`；显式分支把它钉死为 1。
- 没有用 `Math.pow`：题面要求沿用 `positiveExponent` 的思路。

## 四、复杂度

- 正指数：`O(exponent)`（由辅助方法决定）。
- 负指数：一次辅助调用 + 一次除法，同样是 `O(|exponent|)`。

## 五、目录结构

```
题目九/
├── README.md
├── Solution.java          # 提交用：只有 class Solution，不要写 Exponent
└── test/
    ├── SolutionTest.java  # 本地断言测试
    └── Exponent.java      # 平台默认代码的本地副本，仅供测试，勿提交
```

## 六、待确认 / 需补拍

| 事项 | 说明 | 影响 |
| --- | --- | --- |
| `Exponent` 类完整定义 | 只拍到 `base`、`exponent` 两个 public 字段和 `positiveExponent()` 的**注释**，类体下半部分（构造器 `Exponent(int,int)` 的声明、`positiveExponent()` 真实实现）被面板下方裁掉 | 构造器 `(int,int)` 与 `positiveExponent()` 的存在性已由给定代码反推确认；**唯一不确定的是 `positiveExponent()` 的返回类型**（截图上像 `int`，注释里却写 `float res = exp.positiveExponent();`） |
| 返回类型 | 两种可能都兼容 | 本解法统一用 `(float)` 强转 + `1.0f` 除法，`int` / `float` 返回类型下都能编译且结果正确 |
| Case 1 输出 `25` 而非 `25.0` | 方法返回 `float`，若直接 `println(float)` 会打印 `25.0` | 说明评测端对数值输出做了归一化/容差比较，不是纯字符串比对；因此方法内部无需为打印格式操心 |

## 七、运行方式

```bash
cd 题目九
javac -d out Solution.java test/SolutionTest.java test/Exponent.java
java -cp out SolutionTest
```
