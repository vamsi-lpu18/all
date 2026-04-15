using Microsoft.AspNetCore.Mvc;
using WebAPIFromBody;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{

    private static List<Employee> employees = new List<Employee>
    {
        new Employee { Id = 1, Name = "John Doe", Age = "30", Salary = 50000 },
        new Employee { Id = 2, Name = "Jane Smith", Age = "25", Salary = 60000 },
        new Employee { Id = 3, Name = "Bob Johnson", Age = "40", Salary = 70000 },
        new Employee { Id = 4, Name = "Alice Brown", Age = "35", Salary = 80000 },
        new Employee { Id = 5, Name = "Charlie Davis", Age = "28", Salary = 55000 }

    };

    [HttpPost("add")]
    public IActionResult AddEmployee([FromBody] Employee employee)
    {
        employees.Add(employee);
        string message = $"Employee {employee.Name} with Age {employee.Age} and Salary {employee.Salary} added.";
        return Ok(message);
    }

    [HttpGet("get")]
    public IActionResult GetAllEmployee()
    {
        return Ok(employees);
    }

    // POST endpoint to get employee details by ID
    [HttpPost("details")]
    public IActionResult GetEmployeeDetails([FromBody] int id)
    {
        var employee = employees.FirstOrDefault(e => e.Id == id);
        if (employee == null)
            return NotFound($"Employee with ID {id} not found.");
        return Ok(employee);
    }
    [HttpGet("TotalSalary")]
    public IActionResult GetTotalSalary()
    {
        int totalSalary = employees.Sum(e => e.Salary);
        return Ok(totalSalary);
    }
}