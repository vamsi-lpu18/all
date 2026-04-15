using NUnit.Framework;
using app.Models;

namespace app.Tests.Models;

[TestFixture]
public class EmployeeTests
{
    [Test]
    public void Employee_DefaultConstructor_InitializesProperties()
    {
        // Arrange & Act
        var employee = new Employee();

        // Assert
        Assert.AreEqual(0, employee.EmployeeId);
        Assert.AreEqual(string.Empty, employee.EmployeeName);
        Assert.AreEqual(string.Empty, employee.Department);
        Assert.AreEqual(string.Empty, employee.Position);
        Assert.AreEqual(0m, employee.Salary);
        Assert.AreEqual(string.Empty, employee.Email);
        Assert.AreEqual(string.Empty, employee.PhoneNumber);
    }

    [Test]
    public void Employee_SetProperties_StoresValuesCorrectly()
    {
        // Arrange
        var employee = new Employee();
        var joiningDate = new DateTime(2023, 1, 15);

        // Act
        employee.EmployeeId = 1;
        employee.EmployeeName = "John Doe";
        employee.Department = "Engineering";
        employee.Position = "Senior Developer";
        employee.Salary = 75000m;
        employee.Email = "john.doe@company.com";
        employee.PhoneNumber = "555-1234";
        employee.JoiningDate = joiningDate;

        // Assert
        Assert.AreEqual(1, employee.EmployeeId);
        Assert.AreEqual("John Doe", employee.EmployeeName);
        Assert.AreEqual("Engineering", employee.Department);
        Assert.AreEqual("Senior Developer", employee.Position);
        Assert.AreEqual(75000m, employee.Salary);
        Assert.AreEqual("john.doe@company.com", employee.Email);
        Assert.AreEqual("555-1234", employee.PhoneNumber);
        Assert.AreEqual(joiningDate, employee.JoiningDate);
    }

    [Test]
    [TestCase("Alice Johnson", "Finance", "Accountant", 55000)]
    [TestCase("Bob Smith", "Marketing", "Manager", 65000)]
    [TestCase("Carol Williams", "Operations", "Coordinator", 45000)]
    public void Employee_WithVariousData_MaintainsIntegrity(
        string name, string department, string position, decimal salary)
    {
        // Arrange & Act
        var employee = new Employee
        {
            EmployeeId = 1,
            EmployeeName = name,
            Department = department,
            Position = position,
            Salary = salary,
            Email = "employee@company.com",
            PhoneNumber = "555-0000",
            JoiningDate = DateTime.Now
        };

        // Assert
        Assert.AreEqual(name, employee.EmployeeName);
        Assert.AreEqual(department, employee.Department);
        Assert.AreEqual(position, employee.Position);
        Assert.AreEqual(salary, employee.Salary);
    }
}
