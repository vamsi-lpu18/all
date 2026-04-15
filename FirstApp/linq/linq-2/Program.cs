class Program
{
    public static void Main()
    {
        List<String>items=new List<string>{"Pen","Book","Pen","Pencil","Book"};
        var res=items.Where(e=>items.Count(e2=>e2==e)>=2).ToHashSet();
        // var result=from item in items where 
        foreach(var item in res)
        {
            Console.WriteLine(item);
        }
    }
}