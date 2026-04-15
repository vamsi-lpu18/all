using System.Reflection;
class Program{
    public static void Main(){
        Type t=typeof(B);
        Console.WriteLine(t.Name);
    Console.WriteLine(t.FullName);
    Console.WriteLine(t.Namespace);
    Console.WriteLine(t.GetDefaultMembers);
        foreach (PropertyInfo p in t.GetProperties())
    {
        Console.WriteLine(p.Name + " - " + p.PropertyType);
    }
    foreach (MethodInfo m in t.GetMethods())
    {
        Console.WriteLine(m.Name);
    }
    }
}