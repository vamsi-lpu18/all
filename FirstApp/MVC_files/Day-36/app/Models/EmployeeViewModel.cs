namespace app.Models;

public class EmployeeViewModel
{
    public List<Employee>  Employees { get; set; } = new List<Employee>();
    public Pager Pager { get; set; } = new Pager();
}
