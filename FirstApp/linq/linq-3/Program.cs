class Program
{
    public static void Main()
    {
        Dictionary<string,int> dict=new Dictionary<string, int>
        {
            {"ravi",1},
            {"raju",2},
            {"ram",3},
            {"suresh",4}
        };

        var res=dict.OrderByDescending(e=>e.Value).Take(3);
        foreach(var item in res)
        {
            Console.WriteLine($"{item.Key}: {item.Value}");
        }
    }
}