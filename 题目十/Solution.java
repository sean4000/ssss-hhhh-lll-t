// You can print the values to stdout for debugging
class Solution
{
    public void reverseArray(int len, int[] arr)
    {
        int i , temp ;
        int originalLen = len;
        for( i = 0 ; i < len / 2 ; i++ )
        {
            temp = arr[ originalLen - 1 ];
            arr[ originalLen - 1 ] = arr[i];
            arr[i] = temp;
            originalLen -= 1;
        }
    }
}
