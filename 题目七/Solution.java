// You can print the values to stdout for debugging
class Solution
{
    void maxReplace(int size, int[] inputList)
    {
        if(size>0)
        {
            int max =inputList[0];
            for(int i=0;i<size;i++)
            {
                if(max<inputList[i])
                {
                    max = inputList[i];
                }
            }
            for(int i=0;i<size;i++)
            {
                inputList[i]=max;
                System.out.print(inputList[i]+" ");
            }
        }
    }
}
