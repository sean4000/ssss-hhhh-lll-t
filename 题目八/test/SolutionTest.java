public class SolutionTest
{
    private static int passed = 0;
    private static int failed = 0;

    public static void main(String[] args)
    {
        Solution solution = new Solution();

        /* --------------------------- 官方测试用例 --------------------------- */
        check("Case 1: 3x2 [[5,6],[11,14],[23,27]] -> 5",
                5,
                solution.calculateMatrixSum(3, 2, new int[][]{{5, 6}, {11, 14}, {23, 27}}));
        check("Case 2: 3x3 [[3,1,7],[2,5,4],[7,8,9]] -> 17",
                17,
                solution.calculateMatrixSum(3, 3, new int[][]{{3, 1, 7}, {2, 5, 4}, {7, 8, 9}}));

        /* ----------------------------- 边界用例 ----------------------------- */
        check("对角线上只有偶数 -> 0",
                0,
                solution.calculateMatrixSum(2, 2, new int[][]{{2, 1}, {1, 4}}));
        check("对角线上是 1（%2 修复点）-> 1",
                1,
                solution.calculateMatrixSum(1, 1, new int[][]{{1}}));
        check("对角线上是 1 且 3 -> 4",
                4,
                solution.calculateMatrixSum(2, 2, new int[][]{{1, 9}, {9, 3}}));
        check("负奇数 -> -3",
                -3,
                solution.calculateMatrixSum(1, 1, new int[][]{{-3}}));
        check("负偶数 -> 0",
                0,
                solution.calculateMatrixSum(1, 1, new int[][]{{-4}}));
        check("rows 为 0 -> 0",
                0,
                solution.calculateMatrixSum(0, 0, new int[][]{}));
        check("columns 为 0 -> 0",
                0,
                solution.calculateMatrixSum(3, 0, new int[][]{{1, 2}, {3, 4}, {5, 6}}));
        check("非方阵 2x1 -> 只有 (0,0)",
                5,
                solution.calculateMatrixSum(2, 1, new int[][]{{5}, {7}}));
        check("4x4 对角线全奇数 -> 1+3+5+7",
                16,
                solution.calculateMatrixSum(4, 4, new int[][]{
                        {1, 0, 0, 0},
                        {0, 3, 0, 0},
                        {0, 0, 5, 0},
                        {0, 0, 0, 7}}));

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
