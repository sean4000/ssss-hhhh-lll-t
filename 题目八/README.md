# 题目八：Calculate Matrix Sum（对角线上奇数之和）

> 来源：SHL Assessment，Java 版。截图：IMG_9454.JPG。
> 类型：**修逻辑错误**（代码能编译，结果不对）。

## 一、题目原文

### Question

You are required to fix all logical errors in the given code. You can click on *Compile & Run* anytime to check the compilation/execution status of the program. You can use `System.out.println()` to debug your code. The submitted code should be logically/syntactically correct and pass all testcases. Do not write the `main()` function as it is not required.

**Code Approach:** For this question, you will need to correct the given implementation. We **do not** expect you to modify the approach or incorporate any additional library methods.

The function/method `calculateMatrixSum` returns an integer representing the sum of odd elements of the given matrix whose ith and jth index are the same.

The function/method `calculateMatrixSum` accepts three arguments - `rows`, an integer representing the number of rows of the given matrix, `columns`, an integer representing the number of columns of the given matrix and `matrix`, a two-dimensional array of integers.

The function/method `calculateMatrixSum` compiles successfully but fails to return the desired result for some test cases due to logical errors. Your task is to fix the code so that it passes all the test cases.

### 给定代码

```java
// You can print the values to stdout for debugging
class Solution
{
    int calculateMatrixSum(int rows, int columns, int matrix[][])
    {
        int i , j , sum=0;
        if((rows>0) && (columns>0))
        {
            for(i=0;i<rows;i++)
            {
                sum =0;                              // ← BUG 1
                for(j=0;j<columns;j++)
                {
                    if(i==j)
                    {
                        if(matrix[i][j]/2!=0)        // ← BUG 2
                        sum += matrix[i][j];
                    }
                }
            }
        }
        return sum;
    }
    else                                          // ← 截图此处被截断
}
```

### 预置测试用例

| 用例 | 输入 | 期望输出 |
| --- | --- | --- |
| Case 1 | `3, 2`<br>`[[5, 6], [11, 14], [23, 27]]` | `5` |
| Case 2 | `3, 3`<br>`[[3, 1, 7], [2, 5, 4], [7, 8, 9]]` | `17` |

## 二、错误分析

**BUG 1：`sum = 0;` 写在外层 for 循环体里。**
每换一行就把累计值清零，最终只保留**最后一行**的贡献。Case 1 中最后一行 `i=2` 因为 `columns=2` 根本没有 `j=2` 的对角元素，结果被清成 0（期望 5）。
→ 删掉这一行，让 `sum` 一直累加。

**BUG 2：用 `matrix[i][j] / 2 != 0` 判断奇数。**
整数除法下 `1 / 2 == 0`，所以**数值 1 会被误判成偶数**（负数 -1 同理）。
→ 改用取模 `matrix[i][j] % 2 != 0`，这才是"奇数"的正确判定。

**BUG 3：`else` 分支缺失**（截图被截断）。原意应是 `else { sum = 0; }`，即矩阵为空时返回 0。
由于 `sum` 已在声明处初始化为 0，直接 `return sum;` 即可覆盖这一分支。

### 用例验证

- Case 1：矩阵 3 行 2 列，对角线只有 `(0,0)=5`、`(1,1)=14`（`(2,2)` 因只有 2 列不存在）。
  奇数只有 5 → `5` ✅
- Case 2：3×3，对角线 `3、5、9` 全是奇数 → `3+5+9 = 17` ✅

## 三、解法（提交用）

```java
class Solution
{
    int calculateMatrixSum(int rows, int columns, int matrix[][])
    {
        int i , j , sum=0;
        if((rows>0) && (columns>0))
        {
            for(i=0;i<rows;i++)
            {
                for(j=0;j<columns;j++)
                {
                    if(i==j)
                    {
                        if(matrix[i][j]%2!=0)
                        {
                            sum += matrix[i][j];
                        }
                    }
                }
            }
        }
        return sum;
    }
}
```

## 四、复杂度

- 时间 `O(rows × columns)`，空间 `O(1)`。

## 五、目录结构

```
题目八/
├── README.md
├── Solution.java
└── test/SolutionTest.java
```

## 六、待确认 / 需补拍

| 事项 | 说明 | 影响 |
| --- | --- | --- |
| `else` 分支 | 第 23 行往下被裁切 | 推断为 `else { sum = 0; }`；本解法用"声明处初始化 + 统一 return"等价覆盖，不影响结果 |
| Case 2 矩阵右边缘 | 数组右端被裁，但 `[[3,1,7],[2,5,4],[7,8,9]]` 可辨认，期望 `17` 与之自洽 | 不影响解法 |

## 七、运行方式

```bash
cd 题目八
javac -d out Solution.java test/SolutionTest.java
java -cp out SolutionTest
```
