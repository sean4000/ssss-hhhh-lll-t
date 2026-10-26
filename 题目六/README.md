# 题目六：Sort Array Descending（降序排序）

> 来源：SHL Assessment，Java 版。截图：IMG_9452.JPG。
> 类型：**修逻辑错误**（代码能编译，结果是升序而非降序）。

## 一、题目原文

### Question

You are required to fix all logical errors in the given code. You can click on *Compile & Run* anytime to check the compilation/execution status of the program. You can use `System.out.println()` to debug your code. The submitted code should be logically/syntactically correct and pass all testcases.

**Code Approach:** For this question, you will need to correct the given implementation. We **do not** expect you to modify the approach or incorporate any additional library methods.

The function/method `sortArray` modify the input list by sorting its elements in descending order.

The function/method `sortArray` accepts two arguments - `len`, representing the length of the list and `arr`, a list of integers representing the input list, respectively.

The function/method `sortArray` compiles successfully but fails to get the desired result for some test cases due to logical errors. Your task is to fix the code so that it passes all the test cases.

### 给定代码

```java
// You can print the values to stdout for debugging
class Solution
{
    public void sortArray(int len, int[] arr)
    {
        int i , max , location , j , temp;
        for( i = 0 ; i < len ; i++ )
        {
            max = arr[i];
            location = i;
            for( j = i ; j < len ; j++ )
            {
                if( max > arr[j])
                {
                    max = arr[j];
                    location = j;
                }
            }
            temp = arr[i];
            arr[i] = arr[location];
            arr[location] = temp;
        }
    }
}
```

### 预置测试用例

| 用例 | 输入 | 期望输出 |
| --- | --- | --- |
| Case 1 | `5`<br>`[23, 12, 14, 24, 21]` | `24 23 21 14 12` |
| Case 2 | `5`<br>`[1, 1, 1, 1, 1]` | `1 1 1 1 1` |

## 二、错误分析

给定代码是一个选择排序，但比较方向反了：

- 变量名叫 `max`，条件却是 `if( max > arr[j])` → 实际找的是**区间最小值**并换到前面 → 结果是**升序**。
- 题面要求**降序**，所以条件应改成 `if( max < arr[j])`，即把区间最大值换到前面。
- 另外内层循环 `j = i` 会拿自己跟自己比一次，改为 `j = i + 1` 更规范（不影响结果）。

**修复：比较符 `>` 改成 `<`，内层起点 `i` 改成 `i + 1`。** 选择排序的整体思路不动。

## 三、解法（提交用）

```java
class Solution
{
    public void sortArray(int len, int[] arr)
    {
        int i , max , location , j , temp;
        for( i = 0 ; i < len ; i++ )
        {
            max = arr[i];
            location = i;
            for( j = i + 1 ; j < len ; j++ )
            {
                if( max < arr[j])
                {
                    max = arr[j];
                    location = j;
                }
            }
            temp = arr[i];
            arr[i] = arr[location];
            arr[location] = temp;
        }
    }
}
```

## 四、复杂度

- 时间 `O(len²)`（选择排序），空间 `O(1)`（原地）。

## 五、目录结构

```
题目六/
├── README.md
├── Solution.java
└── test/SolutionTest.java
```

## 六、待确认 / 需补拍

| 事项 | 说明 | 影响 |
| --- | --- | --- |
| Case 2 右边缘 | 照片里 Case 2 的输入/输出贴着屏幕右边缘被裁，但 `[1,1,1,1,1]` → `1 1 1 1 1` 可辨认 | 不影响解法 |

## 七、运行方式

```bash
cd 题目六
javac -d out Solution.java test/SolutionTest.java
java -cp out SolutionTest
```
