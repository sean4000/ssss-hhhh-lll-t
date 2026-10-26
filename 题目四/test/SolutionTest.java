public class SolutionTest
{
    private static int passed = 0;
    private static int failed = 0;

    public static void main(String[] args)
    {
        Solution solution = new Solution();

        /* --------------------------- 官方测试用例 --------------------------- */
        check("Case 1: (01,58,42) vs (02,01,45) -> 183",
                183,
                solution.difference_in_times(new Time(1, 58, 42), new Time(2, 1, 45)));
        check("Case 2: (03,45,57) vs (02,45,57) -> 3600",
                3600,
                solution.difference_in_times(new Time(3, 45, 57), new Time(2, 45, 57)));

        /* ----------------------------- 边界用例 ----------------------------- */
        check("两个时间完全相同 -> 0",
                0,
                solution.difference_in_times(new Time(10, 30, 15), new Time(10, 30, 15)));
        check("只差 1 秒 -> 1",
                1,
                solution.difference_in_times(new Time(0, 0, 0), new Time(0, 0, 1)));
        check("跨 1 分钟 -> 60",
                60,
                solution.difference_in_times(new Time(0, 0, 0), new Time(0, 1, 0)));
        check("跨 1 小时 -> 3600",
                3600,
                solution.difference_in_times(new Time(1, 0, 0), new Time(2, 0, 0)));
        check("同分钟内差 45 秒 -> 45",
                45,
                solution.difference_in_times(new Time(12, 30, 0), new Time(12, 30, 45)));
        check("参数反序结果仍是绝对值 -> 183",
                183,
                solution.difference_in_times(new Time(2, 1, 45), new Time(1, 58, 42)));
        check("相隔半天 -> 43200",
                43200,
                solution.difference_in_times(new Time(0, 0, 0), new Time(12, 0, 0)));
        check("跨午夜按绝对差实现 -> 86399",
                86399,
                solution.difference_in_times(new Time(0, 0, 0), new Time(23, 59, 59)));
        check("秒级边界 59 -> 0",
                59,
                solution.difference_in_times(new Time(0, 0, 0), new Time(0, 0, 59)));

        System.out.println("passed: " + passed + ", failed: " + failed);
        if(failed > 0)
        {
            System.exit(1);
        }
    }

    private static void check(String name, int expected, int actual)
    {
        if(expected == actual)
        {
            passed++;
            System.out.println("PASS  " + name);
        }
        else
        {
            failed++;
            System.out.println("FAIL  " + name + "  expected=" + expected + "  actual=" + actual);
        }
    }
}
