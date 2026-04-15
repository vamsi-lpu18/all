using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using app.Models;
using app.Data;
using app.Repositories;
using Microsoft.EntityFrameworkCore;

namespace app.Controllers;

public class HomeController : Controller
{
    private readonly IEmployeeRepository _repository;

    public HomeController(IEmployeeRepository repository)
    {
        _repository = repository;
    }

    public async Task<IActionResult> Index(int page = 1)
    {
        int pageSize = 10;
        var allEmployees = await _repository.GetAllEmployeesAsync();
        
        // Calculate pagination
        int totalItems = allEmployees.Count;
        int totalPages = (int)Math.Ceiling((decimal)totalItems / pageSize);
        
        // Validate page number
        if (page < 1)
            page = 1;
        if (page > totalPages)
            page = totalPages;
        
        // Get  Employees for current page
        var paginatedEmployees = allEmployees
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        
        // Create view model
        var viewModel = new EmployeeViewModel
        {
             Employees = paginatedEmployees,
            Pager = new Pager
            {
                TotalItems = totalItems,
                CurrentPage = page,
                PageSize = pageSize
            }
        };
        
        return View(viewModel);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
