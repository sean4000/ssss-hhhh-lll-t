/**
 * 平台默认代码里提供的 Time 辅助类的本地副本 —— 仅供本地测试编译使用。
 * 提交到评测平台时【不要】提交本文件（平台会提供自己的 Time 定义）。
 */
public class Time
{
    public int hour;
    public int minute;
    public int second;

    public Time(int h, int m, int s)
    {
        hour = h;
        minute = m;
        second = s;
    }

    public int compareTo(Object anotherTime)
    {
        Time other = (Time) anotherTime;
        if(hour != other.hour)
        {
            return hour > other.hour ? 1 : -1;
        }
        if(minute != other.minute)
        {
            return minute > other.minute ? 1 : -1;
        }
        if(second != other.second)
        {
            return second > other.second ? 1 : -1;
        }
        return 0;
    }

    public void addSecond()
    {
        second = second + 1;
        if(second == 60)
        {
            second = 0;
            minute = minute + 1;
        }
        if(minute == 60)
        {
            minute = 0;
            hour = hour + 1;
        }
        if(hour == 24)
        {
            hour = 0;
        }
    }
}
