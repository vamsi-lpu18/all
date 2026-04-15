using Microsoft.AspNetCore.Mvc;

namespace StudentManagement.Controllers
{
    public class StudentDashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Profile()
        {
            return View();
        }
    }
}