class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Salary { get; set; }
    public string Department { get; set; }
}
class Program
{
    public static void Main(string[] args)
    {
        List<Employee> employees = new List<Employee>
        {
            new Employee { Id = 1, Name = "Alice", Salary = 50000, Department = "HR" },
            new Employee { Id = 2, Name = "Bob", Salary = 60000, Department = "IT" },
            new Employee { Id = 3, Name = "Charlie", Salary = 55000, Department = "HR" },
            new Employee { Id = 4, Name = "David", Salary = 70000, Department = "IT" },
            new Employee { Id = 5, Name = "Eve", Salary = 45000, Department = "Finance" }
        };

       Dictionary<string,List<Employee>> temp = employees.Where(e => e.Salary >= 50000).GroupBy(e => e.Department).ToDictionary(g => g.Key, g => g.ToList());
       foreach (var e in temp)
       {
           Console.WriteLine($"Department: {e.Key}");
           foreach (var emp in e.Value)
           {
               Console.WriteLine($"  - {emp.Name} (Salary: {emp.Salary})");
           }
       }
    }
}