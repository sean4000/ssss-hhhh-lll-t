# 题目七：Max Replace（全部替换为最大值）

> 来源：SHL Assessment，Java 版。截图：IMG_9453.JPG。
> 类型：**修语法错误**（代码根本编译不过）。

## 一、题目原文

### Question

You are required to fix all syntactical errors in the given code. You can click on *Compile & Run* anytime to check the compilation/execution status of the program. You can use `System.out.println()` to debug your code. The submitted code should be logically/syntactically correct and pass all testcases. Do not write the `main()` function as it is not required.

**Code Approach:** For this question, you will need to correct the given implementation. We **do not** expect you to modify the approach or incorporate any additional library methods.

The function/method `maxReplace` prints space separated integers representing the input list after replacing all elements of the input list with the maximum element of the input list.

The function/method `maxReplace` accept two arguments - `size`, an integer representing the size of the input list and `inputList`, a list of integers representing the input list, respectively.

The function/method `maxReplace` compiles unsuccessfully due to compilation error. Your task is to debug the code so that it passes all the test cases.

### 给定代码

```java
// You can print the values to stdout for debugging
class Solution
{
    void maxReplace(int size, int &inputList)
    {
        if(size>0)
        {
            int max =inputList[0];
            for(int i=0;i<size;i++)
            {
                if(max<inputList[i])
                {
                    max = inputList[i];
                }
            }
            for(int i=0;i<size;i++)
            {
                inputList[i]=max
                System.out.print(inputList[i]+" ");
            }
        }
    }
}
```

### 预置测试用例

| 用例 | 输入 | 期望输出 |
| --- | --- | --- |
| Case 1 | `5`<br>`[2, 5, 8, 11, 3]` | `11 11 11 11 11` |
| Case 2 | `9`<br>`[3, 2, 5, 8, 9, 11, 23, 45, 63]` | `63 63 63 63 63 63 63 63 63` |

## 二、错误分析（两处语法错误）

1. **`void maxReplace(int size, int &inputList)`** —— `&` 是 C++ 的引用写法，Java 没有引用类型。
   Java 里数组参数写成 `int[] inputList`。
2. **`inputList[i]=max` 后面缺分号** —— 编译报 `';' expected`。

其余逻辑（求最大值 → 全部替换 → 空格分隔打印）本来就是对的，思路不动。

## 三、解法（提交用）

```java
class Solution
{
    void maxReplace(int size, int[] inputList)
    {
        if(size>0)
        {
            int max =inputList[0];
            for(int i=0;i<size;i++)
            {
                if(max<inputList[i])
                {
                    max = inputList[i];
                }
            }
            for(int i=0;i<size;i++)
            {
                inputList[i]=max;
                System.out.print(inputList[i]+" ");
            }
        }
    }
}
```

> 说明：打印语句保持原样（含末尾空格），和平台给出的默认写法一致；
> 评测端通常会做空白归一化比较。若实测报"格式不符"，再把末尾空格去掉即可。

## 四、复杂度

- 时间 `O(size)`（两趟遍历），空间 `O(1)`。

## 五、目录结构

```
题目七/
├── README.md
├── Solution.java
└── test/SolutionTest.java
```

## 六、待确认 / 需补拍

| 事项 | 说明 | 影响 |
| --- | --- | --- |
| Case 2 右边缘 | Case 2 的输入数组与期望输出右半截被屏幕边缘裁掉（能看出是 9 个元素、最大值 63） | 不影响解法：无论数组内容如何，输出恒为"全部替换成最大值" |

## 七、运行方式

```bash
cd 题目七
javac -d out Solution.java test/SolutionTest.java
java -cp out SolutionTest
```
