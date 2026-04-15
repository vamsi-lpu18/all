using Moq;
using NUnit.Framework;
using app.Controllers;
using app.Data;
using app.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app.Tests.Controllers;

[TestFixture]
public class HomeControllerTests
{
    private Mock<ApplicationDbContext> _mockContext = null!;
    private HomeController _controller = null!;

    [SetUp]
    public void Setup()
    {
        // Arrange: Initialize mocks before each test
        _mockContext = new Mock<ApplicationDbContext>();
        _controller = new HomeController(_mockContext.Object);
    }

    [Test]
    public async Task Index_WithDefaultPage_ReturnsViewWithEmployees()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee 
            { 
                EmployeeId = 1, 
                EmployeeName = "John Doe",
                Department = "IT",
                Position = "Developer",
                Salary = 50000,
                Email = "john@example.com",
                PhoneNumber = "123-456-7890",
                JoiningDate = DateTime.Now
            },
            new Employee 
            { 
                EmployeeId = 2, 
                EmployeeName = "Jane Smith",
                Department = "HR",
                Position = "Manager",
                Salary = 60000,
                Email = "jane@example.com",
                PhoneNumber = "987-654-3210",
                JoiningDate = DateTime.Now
            }
        };

        var mockDbSet = new Mock<DbSet<Employee>>();
        mockDbSet.As<IAsyncEnumerable<Employee>>()
            .Setup(m => m.GetAsyncEnumerator(It.IsAny<CancellationToken>()))
            .Returns(new TestAsyncEnumerator<Employee>(employees.GetEnumerator()));

        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.Provider)
            .Returns(employees.AsQueryable().Provider);

        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.Expression)
            .Returns(employees.AsQueryable().Expression);

        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.ElementType)
            .Returns(employees.AsQueryable().ElementType);

        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.GetEnumerator())
            .Returns(employees.GetEnumerator());

        _mockContext.Setup(c => c.Employees).Returns(mockDbSet.Object);

        // Act
        var result = await _controller.Index(1) as ViewResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsNotNull(result!.Model);
        var viewModel = result.Model as EmployeeViewModel;
        Assert.NotNull(viewModel);
        Assert.AreEqual(2, viewModel!.Employees.Count);
        Assert.AreEqual(1, viewModel.Pager.CurrentPage);
    }

    [Test]
    public async Task Index_WithPageGreaterThanTotalPages_ReturnsLastPage()
    {
        // Arrange
        var employees = new List<Employee>
        {
            new Employee { EmployeeId = 1, EmployeeName = "John Doe", Department = "IT", Position = "Developer", Salary = 50000, Email = "john@example.com", PhoneNumber = "123-456-7890", JoiningDate = DateTime.Now }
        };

        var mockDbSet = new Mock<DbSet<Employee>>();
        mockDbSet.As<IAsyncEnumerable<Employee>>()
            .Setup(m => m.GetAsyncEnumerator(It.IsAny<CancellationToken>()))
            .Returns(new TestAsyncEnumerator<Employee>(employees.GetEnumerator()));

        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.Provider)
            .Returns(employees.AsQueryable().Provider);
        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.Expression)
            .Returns(employees.AsQueryable().Expression);
        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.ElementType)
            .Returns(employees.AsQueryable().ElementType);
        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.GetEnumerator())
            .Returns(employees.GetEnumerator());

        _mockContext.Setup(c => c.Employees).Returns(mockDbSet.Object);

        // Act
        var result = await _controller.Index(100) as ViewResult;

        // Assert
        Assert.NotNull(result);
        var viewModel = result!.Model as EmployeeViewModel;
        Assert.NotNull(viewModel);
        Assert.AreEqual(1, viewModel!.Pager.CurrentPage);
    }

    [Test]
    public async Task Index_WithNegativePage_ReturnsFirstPage()
    {
        // Arrange
        var employees = new List<Employee>();
        var mockDbSet = new Mock<DbSet<Employee>>();
        
        mockDbSet.As<IAsyncEnumerable<Employee>>()
            .Setup(m => m.GetAsyncEnumerator(It.IsAny<CancellationToken>()))
            .Returns(new TestAsyncEnumerator<Employee>(employees.GetEnumerator()));

        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.Provider)
            .Returns(employees.AsQueryable().Provider);
        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.Expression)
            .Returns(employees.AsQueryable().Expression);
        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.ElementType)
            .Returns(employees.AsQueryable().ElementType);
        mockDbSet.As<IQueryable<Employee>>()
            .Setup(m => m.GetEnumerator())
            .Returns(employees.GetEnumerator());

        _mockContext.Setup(c => c.Employees).Returns(mockDbSet.Object);

        // Act
        var result = await _controller.Index(-5) as ViewResult;

        // Assert
        Assert.NotNull(result);
        var viewModel = result!.Model as EmployeeViewModel;
        Assert.NotNull(viewModel);
        Assert.AreEqual(1, viewModel!.Pager.CurrentPage);
    }
}
