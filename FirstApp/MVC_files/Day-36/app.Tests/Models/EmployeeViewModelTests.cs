using NUnit.Framework;
using app.Models;

namespace app.Tests.Models;

[TestFixture]
public class EmployeeViewModelTests
{
    [Test]
    public void EmployeeViewModel_DefaultConstructor_InitializesEmptyCollections()
    {
        // Arrange & Act
        var viewModel = new EmployeeViewModel();

        // Assert
        Assert.NotNull(viewModel.Employees);
        Assert.AreEqual(0, viewModel.Employees.Count);
    }

    [Test]
    public void EmployeeViewModel_WithEmployees_StoresListCorrectly()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee { EmployeeId = 1, EmployeeName = "John Doe", Department = "IT", Position = "Developer", Salary = 50000, Email = "john@example.com", PhoneNumber = "123-456-7890", JoiningDate = DateTime.Now },
            new Employee { EmployeeId = 2, EmployeeName = "Jane Smith", Department = "HR", Position = "Manager", Salary = 60000, Email = "jane@example.com", PhoneNumber = "987-654-3210", JoiningDate = DateTime.Now }
        };

        // Act
        var viewModel = new EmployeeViewModel
        {
            Employees = employees
        };

        // Assert
        Assert.AreEqual(2, viewModel.Employees.Count);
        Assert.AreEqual("John Doe", viewModel.Employees[0].EmployeeName);
        Assert.AreEqual("Jane Smith", viewModel.Employees[1].EmployeeName);
    }

    [Test]
    public void EmployeeViewModel_WithPager_StoresPaginationInfoCorrectly()
    {
        // Arrange
        var pager = new Pager
        {
            TotalItems = 50,
            CurrentPage = 2,
            PageSize = 10
        };

        // Act
        var viewModel = new EmployeeViewModel
        {
            Pager = pager
        };

        // Assert
        Assert.NotNull(viewModel.Pager);
        Assert.AreEqual(50, viewModel.Pager.TotalItems);
        Assert.AreEqual(2, viewModel.Pager.CurrentPage);
        Assert.AreEqual(10, viewModel.Pager.PageSize);
    }

    [Test]
    public void EmployeeViewModel_WithCompleteData_MaintainsIntegrity()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee { EmployeeId = 1, EmployeeName = "Test User", Department = "IT", Position = "Developer", Salary = 50000, Email = "test@example.com", PhoneNumber = "123-456-7890", JoiningDate = DateTime.Now }
        };
        var pager = new Pager { TotalItems = 25, CurrentPage = 1, PageSize = 10 };

        // Act
        var viewModel = new EmployeeViewModel
        {
            Employees = employees,
            Pager = pager
        };

        // Assert
        Assert.AreEqual(1, viewModel.Employees.Count);
        Assert.AreEqual("Test User", viewModel.Employees[0].EmployeeName);
        Assert.AreEqual(25, viewModel.Pager.TotalItems);
        Assert.AreEqual(10, viewModel.Pager.PageSize);
    }
}
