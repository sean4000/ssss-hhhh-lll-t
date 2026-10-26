// You can print the values to stdout for debugging
class Solution
{
    public void sortArray(int len, int[] arr)
    {
        int i , max , location , j , temp;
        for( i = 0 ; i < len ; i++ )
        {
            max = arr[i];
            location = i;
            for( j = i + 1 ; j < len ; j++ )
            {
                if( max < arr[j])
                {
                    max = arr[j];
                    location = j;
                }
            }
            temp = arr[i];
            arr[i] = arr[location];
            arr[location] = temp;
        }
    }
}
