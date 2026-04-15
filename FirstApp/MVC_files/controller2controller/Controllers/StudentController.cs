using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using controller2controller.Models;
using System.Net.Mime;
using Microsoft.VisualBasic;

namespace controller2controller.Controllers;

public class StudentController : Controller
{
    private readonly ILogger<StudentController> _logger;

    public StudentController(ILogger<StudentController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }
    public IActionResult Receive()
    {
        var a = TempData["a"]?.ToString() ?? "";
        var b = TempData["b"]?.ToString() ?? "";

        return Content($"TempData: a={a}, b={b}");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
