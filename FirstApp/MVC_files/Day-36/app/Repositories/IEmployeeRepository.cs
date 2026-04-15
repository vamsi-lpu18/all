using app.Models;

namespace app.Repositories;

public interface IEmployeeRepository
{
    Task<List<Employee>> GetAllEmployeesAsync();
    Task<Employee?> GetEmployeeByIdAsync(int id);
    Task<Employee> AddEmployeeAsync(Employee employee);
    Task<Employee> UpdateEmployeeAsync(Employee employee);
    Task<bool> DeleteEmployeeAsync(int id);
}
