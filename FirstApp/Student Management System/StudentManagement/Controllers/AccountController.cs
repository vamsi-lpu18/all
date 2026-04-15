using Microsoft.AspNetCore.Mvc;
using StudentManagement.Models;
using StudentManagement.Data;

namespace StudentManagementSystem.Controllers
{
    public class AccountController : Controller
    {
        private readonly AppDbContext _context;

        public AccountController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(User user)
        {
            if (ModelState.IsValid)
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                return RedirectToAction("Login");
            }

            return View(user);
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == email && u.Password == password);

            if (user == null)
            {
                ViewBag.Message = "Invalid Login";
                return View();
            }

            if (user.Role == "Teacher")
                return RedirectToAction("Index", "TeacherDashboard");

            return RedirectToAction("Index", "StudentDashboard");
        }
    }
}