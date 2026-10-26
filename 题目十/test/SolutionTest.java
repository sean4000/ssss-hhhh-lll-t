public class SolutionTest
{
    private static int passed = 0;
    private static int failed = 0;

    public static void main(String[] args)
    {
        Solution solution = new Solution();

        /* --------------------------- 官方测试用例 --------------------------- */
        check("Case 1: [1,2,3,4,5,6,7] -> 反转",
                "7 6 5 4 3 2 1",
                format(apply(solution, new int[]{1, 2, 3, 4, 5, 6, 7})));
        check("Case 2: [2,8,4,6] -> 反转",
                "6 4 8 2",
                format(apply(solution, new int[]{2, 8, 4, 6})));

        /* ----------------------------- 边界用例 ----------------------------- */
        check("空数组 -> 空",
                "",
                format(apply(solution, new int[]{})));
        check("单元素 -> 不变",
                "7",
                format(apply(solution, new int[]{7})));
        check("两元素 -> 交换",
                "2 1",
                format(apply(solution, new int[]{1, 2})));
        check("三元素 -> 中间不动",
                "3 2 1",
                format(apply(solution, new int[]{1, 2, 3})));
        check("已反转的数组 -> 还原",
                "1 2 3 4",
                format(apply(solution, new int[]{4, 3, 2, 1})));
        check("含重复值与负数",
                "-1 0 0 5",
                format(apply(solution, new int[]{5, 0, 0, -1})));
        check("八元素（题目一的规模）",
                "8 7 6 5 4 3 2 1",
                format(apply(solution, new int[]{1, 2, 3, 4, 5, 6, 7, 8})));

        /* 随机对拍：反转两次应回到原数组 */
        int seed = 20261027;
        for(int trial = 0; trial < 100; trial++)
        {
            int length = 1 + (seed % 15);
            int[] values = new int[length];
            for(int index = 0; index < length; index++)
            {
                seed = (seed * 1103515245 + 12345) & 0x7fffffff;
                values[index] = (seed % 201) - 100;
            }
            int[] work = values.clone();
            String original = format(work.clone());
            apply(solution, work);
            String reversed = format(work.clone());
            apply(solution, work);
            String back = format(work.clone());
            check("随机对拍 #" + trial + " 反转两次回到原样", original, back);
            if(length > 1 && original.equals(reversed))
            {
                failed++;
                System.out.println("FAIL  随机对拍 #" + trial + " 反转后应与原数组不同");
            }
        }

        System.out.println("passed: " + passed + ", failed: " + failed);
        if(failed > 0)
        {
            System.exit(1);
        }
    }

    private static int[] apply(Solution solution, int[] values)
    {
        solution.reverseArray(values.length, values);
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
