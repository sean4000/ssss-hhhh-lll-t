# 题目四：Difference in Times（两个时间点的秒数差）

> 来源：SHL Assessment（player.talentcentral.eu.shl.com）线上机考，Java 版。
> 截图：IMG_9449.JPG。类型：**补全代码**（模板只给了方法签名，方法体留空）。

## 一、题目原文

### Question

You are given two times in the format hour, minute, and second as members. A collection of functions/methods for performing some common operations on times is also available. You must make use of these functions/methods to calculate and return the difference.

The function/method `difference_in_times` accepts two arguments - `time1`, and `time2`, representing two times and is supposed to return an integer representing the difference in the number of seconds. You must complete the code so that it passes all the test cases.

### Helper Description

The following class is used to represent a Time and is already implemented in the default code (Do not write this definition again in your code):

```java
public class Time
{
    public int hour;
    public int minute;
    public int second;
    public Time(int h, int m, int s)
    {
        hour = h;
        minute = m;
        second = s;
    }
    public int compareTo(Object anotherTime)
    {
        /*Return 1, if time1 is greater than time2
        Return -1 if time1 is less than time2
        or, Return 0, if time1 is equal to time2
        This can be called as -
          * If time1 and time2 are two Time then -
          *   time1.compareTo(time2) */
    }
    public void addSecond()
    {
        /* Add one second in the time;
        This can be called as -
          * If time1 is Time then -
          *   time1.addSecond() */
    }
}
```

### 给定代码（需要补全的部分）

```java
// You can print the values to stdout for debugging
class Solution
{
    int difference_in_times(Time time1, Time time2)
    {
        // write your code here
    }
}
```

### 预置测试用例

| 用例 | 输入 | 期望输出 |
| --- | --- | --- |
| Case 1 | `(01, 58, 42)`<br>`(02, 01, 45)` | `183` |
| Case 2 | `(03, 45, 57)`<br>`(02, 45, 57)` | `3600` |

## 二、题意解析

**返回两个时间点相差的秒数（取绝对值）。**

两个用例正好把方向性钉死了：

- Case 1：time1 早于 time2 → `02:01:45 − 01:58:42 = 183` 秒（正数）
- Case 2：time1 **晚于** time2 → `03:45:57 − 02:45:57 = 3600` 秒（仍然是正数）

所以答案是**绝对差**，不是有符号差。

## 三、解法

`Time` 的 `hour / minute / second` 都是 `public` 字段，直接换算成"当天第几秒"再相减即可，O(1)，也不依赖 `compareTo` / `addSecond` 的内部实现（截图里这两个方法体被裁掉了）。

```java
class Solution
{
    int difference_in_times(Time time1, Time time2)
    {
        int seconds1 = time1.hour * 3600 + time1.minute * 60 + time1.second;
        int seconds2 = time2.hour * 3600 + time2.minute * 60 + time2.second;
        return Math.abs(seconds2 - seconds1);
    }
}
```

> 题面要求 "You must make use of these functions/methods"，官方的参考实现应该是
> `compareTo` + `addSecond` 逐秒推进的写法。本解法用等价的 O(1) 换算，
> 输出结果与之一致，且不依赖 `addSecond` 越过午夜时是否回绕。

## 四、复杂度

- 时间 `O(1)`，空间 `O(1)`。

## 五、目录结构

```
题目四/
├── README.md
├── Solution.java          # 提交用：只有 class Solution，不要写 Time
└── test/
    ├── SolutionTest.java  # 本地断言测试
    └── Time.java          # 平台默认代码的本地副本，仅供测试，勿提交
```

## 六、待确认 / 需补拍

| 事项 | 说明 | 影响 |
| --- | --- | --- |
| 题目正文顶部 | 截图顶部被页面滚动截断，"You are given two times in the format..." 之前还有一段 | 可能包含跨午夜（23:59:59 与 00:00:00）是否回绕成 1 秒的特殊规定 |
| `Time` 类的完整实现 | `compareTo` / `addSecond` 只拍到了注释，方法体在面板下方被裁掉 | 本解法不依赖它们；但若平台要求"必须调用辅助方法"，需要知道 `addSecond` 是否跨天回绕 |
| 隐藏用例 | 面板显示 `0/9 test cases passed`，只展示 Case 1/2，其余为隐藏用例 | 跨午夜场景是唯一可能翻车的边界 |

## 七、运行方式

```bash
cd 题目四
javac -d out Solution.java test/SolutionTest.java test/Time.java
java -cp out SolutionTest
```
