// You can print the values to stdout for debugging
class Solution
{
    float allExponent(int baseValue, int exponentValue)
    {
        float res = 1;
        if(exponentValue > 0)
        {
            Exponent exp = new Exponent(baseValue, exponentValue);
            res = (float)exp.positiveExponent();
        }
        else if(exponentValue == 0)
        {
            res = 1;
        }
        else
        {
            Exponent exp = new Exponent(baseValue, -exponentValue);
            res = 1.0f / (float)exp.positiveExponent();
        }
        return res;
    }
}
