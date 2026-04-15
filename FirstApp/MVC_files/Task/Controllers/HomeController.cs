using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Task.Models;

namespace Task.Controllers;

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

    public IActionResult Privacy()
    {
        return View();
    }
    public IActionResult Sqaure()
    {
        int a=9;
        int res=a*a;
        TempData["res"]=res;
        return RedirectToAction("Receive","Student",res);
    }
    public IActionResult data()
    {
        ViewBag.Name = "Hello from HomeController!";
        ViewBag.College= "ABC College";
        return View();
    }

    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
