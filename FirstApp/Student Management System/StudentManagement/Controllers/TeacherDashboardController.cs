using Microsoft.AspNetCore.Mvc;

namespace StudentManagement.Controllers
{
    public class TeacherDashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}