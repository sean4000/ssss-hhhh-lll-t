// You can print the values to stdout for debugging
class Solution
{
    int difference_in_times(Time time1, Time time2)
    {
        int seconds1 = time1.hour * 3600 + time1.minute * 60 + time1.second;
        int seconds2 = time2.hour * 3600 + time2.minute * 60 + time2.second;
        return Math.abs(seconds2 - seconds1);
    }
}
