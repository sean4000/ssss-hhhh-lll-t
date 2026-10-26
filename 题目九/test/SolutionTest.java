public class SolutionTest
{
    private static int passed = 0;
    private static int failed = 0;
    private static final float TOLERANCE = 1e-6f;

    public static void main(String[] args)
    {
        Solution solution = new Solution();

        /* --------------------------- 官方测试用例 --------------------------- */
        checkFloat("Case 1: 5 ^ 2 -> 25",
                25f,
                solution.allExponent(5, 2));
        checkFloat("Case 2: 5 ^ -2 -> 0.04",
                0.04f,
                solution.allExponent(5, -2));

        /* ----------------------------- 边界用例 ----------------------------- */
        checkFloat("指数为 0 -> 1",
                1f,
                solution.allExponent(7, 0));
        checkFloat("底数为 0，指数为正 -> 0",
                0f,
                solution.allExponent(0, 3));
        checkFloat("底数为 1 -> 1",
                1f,
                solution.allExponent(1, 9));
        checkFloat("底数为 -1，指数为奇数 -> -1",
                -1f,
                solution.allExponent(-1, 3));
        checkFloat("底数为 -2，指数为偶数 -> 4",
                4f,
                solution.allExponent(-2, 2));
        checkFloat("2 ^ 10 -> 1024",
                1024f,
                solution.allExponent(2, 10));
        checkFloat("2 ^ -10 -> 0.0009765625",
                1f / 1024f,
                solution.allExponent(2, -10));
        checkFloat("3 ^ -3 -> 0.037037",
                1f / 27f,
                solution.allExponent(3, -3));
        checkFloat("10 ^ -1 -> 0.1",
                0.1f,
                solution.allExponent(10, -1));
        checkFloat("1 ^ 任意指数 -> 1",
                1f,
                solution.allExponent(1, -5));

        System.out.println("passed: " + passed + ", failed: " + failed);
        if(failed > 0)
        {
            System.exit(1);
        }
    }

    private static void checkFloat(String name, float expected, float actual)
    {
        if(Math.abs(expected - actual) <= TOLERANCE * Math.max(1f, Math.abs(expected)))
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
