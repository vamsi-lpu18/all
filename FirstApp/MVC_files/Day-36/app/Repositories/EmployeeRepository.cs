using app.Models;
using app.Data;
using Microsoft.EntityFrameworkCore;

namespace app.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly ApplicationDbContext _context;

    public EmployeeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    // Dummy data for development/testing
    public static List<Employee> GetDummyEmployees()
    {
        return new List<Employee>
        {
            new Employee
            {
                EmployeeId = 1,
                EmployeeName = "John Doe",
                Department = "IT",
                Position = "Senior Developer",
                Salary = 85000,
                Email = "john.doe@company.com",
                PhoneNumber = "555-0101",
                JoiningDate = new DateTime(2020, 5, 15)
            },
            new Employee
            {
                EmployeeId = 2,
                EmployeeName = "Jane Smith",
                Department = "HR",
                Position = "HR Manager",
                Salary = 72000,
                Email = "jane.smith@company.com",
                PhoneNumber = "555-0102",
                JoiningDate = new DateTime(2019, 3, 20)
            },
            new Employee
            {
                EmployeeId = 3,
                EmployeeName = "Mike Johnson",
                Department = "Finance",
                Position = "Financial Analyst",
                Salary = 68000,
                Email = "mike.johnson@company.com",
                PhoneNumber = "555-0103",
                JoiningDate = new DateTime(2021, 7, 10)
            },
            new Employee
            {
                EmployeeId = 4,
                EmployeeName = "Sarah Williams",
                Department = "IT",
                Position = "DevOps Engineer",
                Salary = 95000,
                Email = "sarah.williams@company.com",
                PhoneNumber = "555-0104",
                JoiningDate = new DateTime(2018, 9, 5)
            },
            new Employee
            {
                EmployeeId = 5,
                EmployeeName = "Robert Brown",
                Department = "Marketing",
                Position = "Marketing Manager",
                Salary = 70000,
                Email = "robert.brown@company.com",
                PhoneNumber = "555-0105",
                JoiningDate = new DateTime(2022, 1, 12)
            },
            new Employee
            {
                EmployeeId = 6,
                EmployeeName = "Emily Davis",
                Department = "IT",
                Position = "Junior Developer",
                Salary = 55000,
                Email = "emily.davis@company.com",
                PhoneNumber = "555-0106",
                JoiningDate = new DateTime(2023, 6, 1)
            },
            new Employee
            {
                EmployeeId = 7,
                EmployeeName = "David Wilson",
                Department = "Finance",
                Position = "Finance Director",
                Salary = 110000,
                Email = "david.wilson@company.com",
                PhoneNumber = "555-0107",
                JoiningDate = new DateTime(2017, 2, 15)
            },
            new Employee
            {
                EmployeeId = 8,
                EmployeeName = "Lisa Anderson",
                Department = "HR",
                Position = "Recruiter",
                Salary = 58000,
                Email = "lisa.anderson@company.com",
                PhoneNumber = "555-0108",
                JoiningDate = new DateTime(2021, 11, 8)
            }
        };
    }

    public async Task<List<Employee>> GetAllEmployeesAsync()
    {
        try
        {
            return await _context.Employees.ToListAsync();
        }
        catch
        {
            // Return dummy data if database access fails
            return GetDummyEmployees();
        }
    }

    public async Task<Employee?> GetEmployeeByIdAsync(int id)
    {
        try
        {
            return await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId == id);
        }
        catch
        {
            // Return dummy employee if database access fails
            return GetDummyEmployees().FirstOrDefault(e => e.EmployeeId == id);
        }
    }

    public async Task<Employee> AddEmployeeAsync(Employee employee)
    {
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        return employee;
    }

    public async Task<Employee> UpdateEmployeeAsync(Employee employee)
    {
        _context.Employees.Update(employee);
        await _context.SaveChangesAsync();
        return employee;
    }

    public async Task<bool> DeleteEmployeeAsync(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null)
            return false;

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();
        return true;
    }
}
