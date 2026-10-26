# 题目十：Reverse Array（原地反转数组）

> 来源：SHL Assessment，Java 版。截图：IMG_9456.JPG。
> 类型：**修逻辑错误**（代码能编译，但会数组越界 / 反转错位）。

## 一、题目原文

### Question

You are required to fix all logical errors in the given code. You can click on *Compile & Run* anytime to check the compilation/execution status of the program. You can use `System.out.println()` to debug your code. The submitted code should be logically/syntactically correct and pass all testcases.

**Code Approach:** For this question, you will need to correct the given implementation. We **do not** expect you to modify the approach or incorporate any additional library methods.

The function/method `reverseArray` modify the input list by reversing its elements. The function/method `reverseArray` accepts two arguments - `len`, an integer representing the length of the list and `arr`, list of integers representing the input list, respectively.

For example, if the input list `arr` is `{20 30 10 40 50}`, the function/method is supposed to print `{50 40 10 30 20}`.

The function/method `reverseArray` compiles successfully but fails to get the desired result for some test cases due to logical errors. Your task is to fix the code so that it passes all the test cases.

### 给定代码

```java
// You can print the values to stdout for debugging
class Solution
{
    public void reverseArray(int len, int[] arr)
    {
        int i , temp ;
        int originalLen = len;
        for( i = 0 ; i < len / 2 ; i++ )
        {
            temp = arr[ originalLen - 1 ];
            arr[ originalLen - 1 ] = arr[i];
            arr[i] = temp;
            originalLen += 1;          // ← BUG
        }
    }
}
```

### 预置测试用例

| 用例 | 输入 | 期望输出 |
| --- | --- | --- |
| Case 1 | `7`<br>`[1, 2, 3, 4, 5, 6, 7]` | `7 6 5 4 3 2 1` |
| Case 2 | `4`<br>`[2, 8, 4, 6]` | `6 4 8 2` |

## 二、错误分析

`originalLen` 是"待交换的右端下标 + 1"，每交换一次应该**往左移一位**，即 `originalLen -= 1`。
原代码写成 `originalLen += 1`，下标越往右跑：

- `len = 7`：第一次循环就访问 `arr[7]` → **ArrayIndexOutOfBoundsException**
- 即使不越界，交换的下标也会错位

**修复：`originalLen += 1;` → `originalLen -= 1;`。** 双指针对换的思路本身是对的，不动。

### 走一遍 Case 1（`[1,2,3,4,5,6,7]`）

| 轮次 | originalLen | 交换 | 数组 |
| --- | --- | --- | --- |
| i=0 | 7 | `arr[6] ↔ arr[0]` | `[7,2,3,4,5,6,1]` |
| i=1 | 6 | `arr[5] ↔ arr[1]` | `[7,6,3,4,5,2,1]` |
| i=2 | 5 | `arr[4] ↔ arr[2]` | `[7,6,5,4,3,2,1]` |

`len/2 = 3`，三轮后收工 ✅

## 三、解法（提交用）

```java
class Solution
{
    public void reverseArray(int len, int[] arr)
    {
        int i , temp ;
        int originalLen = len;
        for( i = 0 ; i < len / 2 ; i++ )
        {
            temp = arr[ originalLen - 1 ];
            arr[ originalLen - 1 ] = arr[i];
            arr[i] = temp;
            originalLen -= 1;
        }
    }
}
```

> **注意不要在方法里加打印**：本题和题目六（sortArray）一样，方法只负责"原地修改数组"，
> 数组内容由评测框架打印。多打一次会导致输出重复。

## 四、复杂度

- 时间 `O(len)`，空间 `O(1)`（原地交换）。

## 五、目录结构

```
题目十/
├── README.md
├── Solution.java
└── test/SolutionTest.java
```

## 六、待确认 / 需补拍

| 事项 | 说明 | 影响 |
| --- | --- | --- |
| 是否需要方法内打印 | 题面写 "is supposed to print {50 40 10 30 20}"，但**给定代码里没有 print 语句** | 参照题目六（sortArray，代码里同样没有 print，期望输出却是数组内容）可判定：**由评测框架打印数组，方法内不要打印**。若实测输出为空，再改成方法内打印 |
| 隐藏用例 | 面板显示 `0/8 test cases passed`，只展示 Case 1/2 | `len` 为 0 或 1 时循环不执行，天然安全 |

## 七、运行方式

```bash
cd 题目十
javac -d out Solution.java test/SolutionTest.java
java -cp out SolutionTest
```
