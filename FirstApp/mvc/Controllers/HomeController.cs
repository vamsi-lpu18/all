using System.ComponentModel.Design;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using mvc.Models;

namespace mvc.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Student()
    {
        // Sample student data
        var students = new List<Student>
        {
            new Student { Id = 1, Name = "John Doe", Age = 20, Course = "Computer Science" },
            new Student { Id = 2, Name = "Jane Smith", Age = 22, Course = "Engineering" },
            new Student { Id = 3, Name = "Mike Johnson", Age = 21, Course = "Mathematics" },
            new Student { Id = 4, Name = "Sarah Williams", Age = 23, Course = "Physics" }
        };

        return View(students);
    }
    public IActionResult Total(int m1,int m2,int m3){
        int total=m1+m2+m3;
            return View(total);
    }

    public IActionResult Square(int? number)
    {
        return View(number);
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
