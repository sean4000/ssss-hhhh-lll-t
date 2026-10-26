public class SolutionTest
{
    private static int passed = 0;
    private static int failed = 0;

    public static void main(String[] args)
    {
        Solution solution = new Solution();

        /* --------------------------- 官方测试用例 --------------------------- */
        check("Case 1: size 6 -> 全部 0",
                "0 0 0 0 0 0",
                format(apply(solution, 6, new int[]{2, 5, 3, 7, 9, 4})));
        check("Case 2: size 5 -> 全部 1",
                "1 1 1 1 1",
                format(apply(solution, 5, new int[]{21, 22, 3, 24, 65})));

        /* ----------------------------- 边界用例 ----------------------------- */
        check("size 1（奇数）-> 1",
                "1",
                format(apply(solution, 1, new int[]{7})));
        check("size 2（偶数）-> 0 0",
                "0 0",
                format(apply(solution, 2, new int[]{9, 4})));
        check("size 3（奇数）-> 1 1 1",
                "1 1 1",
                format(apply(solution, 3, new int[]{-5, 0, 12})));
        check("size 4（偶数）-> 0 0 0 0",
                "0 0 0 0",
                format(apply(solution, 4, new int[]{1, 2, 3, 4})));
        check("size 0 -> 空",
                "",
                format(apply(solution, 0, new int[]{})));
        check("负数同样被替换（偶数长）-> 0 0 0 0",
                "0 0 0 0",
                format(apply(solution, 4, new int[]{-1, -2, -3, -4})));
        check("原地修改：调用后数组内容被改写",
                "1 1 1",
                format(apply(solution, 3, new int[]{100, 200, 300})));

        System.out.println("passed: " + passed + ", failed: " + failed);
        if(failed > 0)
        {
            System.exit(1);
        }
    }

    /** 调用被测方法（原地修改数组），返回同一个数组 */
    private static int[] apply(Solution solution, int size, int[] inputList)
    {
        solution.replaceValues(size, inputList);
        return inputList;
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
