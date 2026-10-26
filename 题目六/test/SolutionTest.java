import java.util.Arrays;

public class SolutionTest
{
    private static int passed = 0;
    private static int failed = 0;

    public static void main(String[] args)
    {
        Solution solution = new Solution();

        /* --------------------------- 官方测试用例 --------------------------- */
        check("Case 1: [23,12,14,24,21] -> 降序",
                "24 23 21 14 12",
                format(apply(solution, new int[]{23, 12, 14, 24, 21})));
        check("Case 2: [1,1,1,1,1] -> 不变",
                "1 1 1 1 1",
                format(apply(solution, new int[]{1, 1, 1, 1, 1})));

        /* ----------------------------- 边界用例 ----------------------------- */
        check("单元素 -> 不变",
                "42",
                format(apply(solution, new int[]{42})));
        check("已降序 -> 不变",
                "9 5 3 1",
                format(apply(solution, new int[]{9, 5, 3, 1})));
        check("已升序 -> 反转",
                "4 3 2 1",
                format(apply(solution, new int[]{1, 2, 3, 4})));
        check("含负数 -> 降序",
                "7 3 0 -5 -12",
                format(apply(solution, new int[]{-5, 7, -12, 3, 0})));
        check("空数组 -> 空",
                "",
                format(apply(solution, new int[]{})));

        /* 随机对拍：与 Arrays.sort 的降序结果比较 */
        int seed = 20261026;
        for(int trial = 0; trial < 200; trial++)
        {
            int length = 1 + (seed % 12);
            int[] values = new int[length];
            for(int index = 0; index < length; index++)
            {
                seed = (seed * 1103515245 + 12345) & 0x7fffffff;
                values[index] = (seed % 201) - 100;
            }
            int[] expected = values.clone();
            Arrays.sort(expected);
            StringBuilder builder = new StringBuilder();
            for(int index = expected.length - 1; index >= 0; index--)
            {
                if(builder.length() > 0)
                {
                    builder.append(" ");
                }
                builder.append(expected[index]);
            }
            check("随机对拍 #" + trial, builder.toString(), format(apply(solution, values.clone())));
        }

        System.out.println("passed: " + passed + ", failed: " + failed);
        if(failed > 0)
        {
            System.exit(1);
        }
    }

    private static int[] apply(Solution solution, int[] values)
    {
        solution.sortArray(values.length, values);
        return values;
    }

    private static String format(int[] values)
    {
        StringBuilder builder = new StringBuilder();
        for(int index = 0; index < values.length; index++)
        {
            if(index > 0)
            {
                builder.append(" ");
            }
            builder.append(values[index]);
        }
        return builder.toString();
    }

    private static void check(String name, String expected, String actual)
    {
        if(expected.equals(actual))
        {
            passed++;
            System.out.println("PASS  " + name);
        }
        else
        {
            failed++;
            System.out.println("FAIL  " + name + "  expected=[" + expected + "]  actual=[" + actual + "]");
        }
    }
}
