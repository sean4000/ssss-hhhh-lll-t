/**
 * 平台默认代码里提供的 Exponent 辅助类的本地副本 —— 仅供本地测试编译使用。
 * 提交到评测平台时【不要】提交本文件（平台会提供自己的 Exponent 定义）。
 */
public class Exponent
{
    public int base;
    public int exponent;

    public Exponent(int base, int exponent)
    {
        this.base = base;
        this.exponent = exponent;
    }

    public int positiveExponent()
    {
        int res = 1;
        for(int i = 0; i < exponent; i++)
        {
            res = res * base;
        }
        return res;
    }
}
