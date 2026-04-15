using Microsoft.AspNetCore.Mvc;
using studentmanagement.Models;
using studentmanagement.Services;

namespace studentmanagement.Controllers
{
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }

        [HttpGet("login")]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string username, string password)
        {
            var user = await _authService.GetUserAsync(username);
            if (user != null && user.Password == password)
            {
                HttpContext.Session.SetString("IsLoggedIn", "true");
                HttpContext.Session.SetInt32("StudentId", user.StudentId);
                ViewBag.Token = "demo-jwt-token";
                ViewBag.StudentId = user.StudentId;
                return View("Success");
            }
            ViewBag.Error = "Invalid credentials";
            return View();
        }
    }
}