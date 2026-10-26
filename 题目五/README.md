# 题目五：Replace Values（按奇偶长度整体替换）

> 来源：SHL Assessment，Java 版。截图：IMG_9451.JPG。
> 类型：**修逻辑错误**（代码能编译，结果不对）。

## 一、题目原文

### Question

You are required to fix all logical errors in the given code. You can click on *Compile & Run* anytime to check the compilation/execution status of the program. You can use `System.out.println()` to debug your code. The submitted code should be logically/syntactically correct and pass all testcases.

**Code Approach:** For this question, you will need to correct the given implementation. We **do not** expect you to modify the approach or incorporate any additional library methods.

The function/method `replaceValues` is modifying the input list in such a way - if the length of input list is odd, then all the elements of the input list are supposed to be replaced by 1s and in case it is even, the elements should be replaced by 0s.

For example: given the input list `[0 1 2]`, the function will modify the input list like `[1 1 1]`.

The function/method `replaceValues` accepts two arguments - `size`, an integer representing the size of the given input list and `inputList`, a list of integers representing the input list.

The function/method `replaceValues` compiles successfully but fails to get the desired result for some test cases due to incorrect implementation. Your task is to fix the code so that it passes all the test cases.

### 给定代码

```java
// You can print the values to stdout for debugging
class Solution
{
    void replaceValues(int size, int[] inputList)
    {
        int i , j;
        if( size % 2 == 0 )
        {
            i=0;
            while(i<size)
            {
                inputList[i] = 0;
                i+=2;
            }
        }
        else
        {
            j=0;
            while(j<size)
            {
                inputList[j] = 1;
                j+=2;
            }
        }
    }
}
```

### 预置测试用例

| 用例 | 输入 | 期望输出 |
| --- | --- | --- |
| Case 1 | `6`<br>`[2, 5, 3, 7, 9, 4]` | `0 0 0 0 0 0` |
| Case 2 | `5`<br>`[21, 22, 3, 24, 65]` | `1 1 1 1 1` |

## 二、错误分析

题面要求"**所有**元素"都被替换，但循环步长是 `+2`：

- `i += 2` → 只替换下标 0、2、4…，下标 1、3、5… 保持原值
- `j += 2` → 同理

所以 `[2,5,3,7,9,4]`（偶数长）被改成 `[0,5,0,7,0,4]`，而期望是 `[0,0,0,0,0,0]`。

**修复：把步长 `+2` 改成 `+1`。** 其余逻辑（偶数→0、奇数→1）本来就是对的，思路不动。

## 三、解法（提交用）

```java
class Solution
{
    void replaceValues(int size, int[] inputList)
    {
        int i , j;
        if( size % 2 == 0 )
        {
            i=0;
            while(i<size)
            {
                inputList[i] = 0;
                i+=1;
            }
        }
        else
        {
            j=0;
            while(j<size)
            {
                inputList[j] = 1;
                j+=1;
            }
        }
    }
}
```

## 四、复杂度

- 时间 `O(size)`，空间 `O(1)`（原地修改）。

## 五、目录结构

```
题目五/
├── README.md
├── Solution.java
└── test/SolutionTest.java
```

## 六、待确认 / 需补拍

无。题目正文、给定代码、两个用例都拍全了（面板显示 `0/8 test cases passed`，其余为隐藏用例，逻辑已由题面完全确定）。

## 七、运行方式

```bash
cd 题目五
javac -d out Solution.java test/SolutionTest.java
java -cp out SolutionTest
```
