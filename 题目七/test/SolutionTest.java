import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

public class SolutionTest
{
    private static int passed = 0;
    private static int failed = 0;

    public static void main(String[] args)
    {
        Solution solution = new Solution();

        /* --------------------------- 官方测试用例 --------------------------- */
        check("Case 1: [2,5,8,11,3] -> 11 11 11 11 11",
                "11 11 11 11 11 ",
                capture(solution, 5, new int[]{2, 5, 8, 11, 3}));
        check("Case 2: [3,2,5,8,9,11,23,45,63] -> 全部 63",
                "63 63 63 63 63 63 63 63 63 ",
                capture(solution, 9, new int[]{3, 2, 5, 8, 9, 11, 23, 45, 63}));

        /* ----------------------------- 边界用例 ----------------------------- */
        check("全负数 -> 最大值 -3",
                "-3 -3 -3 ",
                capture(solution, 3, new int[]{-9, -3, -7}));
        check("单元素 -> 打印该元素",
                "8 ",
                capture(solution, 1, new int[]{8}));
        check("全部相同 -> 打印相同值",
                "5 5 5 ",
                capture(solution, 3, new int[]{5, 5, 5}));
        check("最大值在首位",
                "9 9 9 ",
                capture(solution, 3, new int[]{9, 1, 2}));
        check("最大值在末位",
                "9 9 9 ",
                capture(solution, 3, new int[]{1, 2, 9}));
        check("size 0 -> 无输出",
                "",
                capture(solution, 0, new int[]{}));
        check("含 0 与负数",
                "0 0 ",
                capture(solution, 2, new int[]{-1, 0}));

        System.out.println("passed: " + passed + ", failed: " + failed);
        if(failed > 0)
        {
            System.exit(1);
        }
    }

    /** 调用被测方法并捕获它打印到 stdout 的内容 */
    private static String capture(Solution solution, int size, int[] inputList)
    {
        PrintStream originalOut = System.out;
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        System.setOut(new PrintStream(buffer));
        try
        {
            solution.maxReplace(size, inputList);
        }
        finally
        {
            System.setOut(originalOut);
        }
        return buffer.toString();
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
