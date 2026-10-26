// You can print the values to stdout for debugging
class Solution
{
    void replaceValues(int size, int[] inputList)
    {
        int i , j;
        if( size % 2 == 0 )
        {
            i=0;
            while(i<size)
            {
                inputList[i] = 0;
                i+=1;
            }
        }
        else
        {
            j=0;
            while(j<size)
            {
                inputList[j] = 1;
                j+=1;
            }
        }
    }
}
