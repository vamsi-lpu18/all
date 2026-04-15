using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using studentmanagement.Models;
using studentmanagement.Services;

namespace studentmanagement.Controllers
{
    [Route("student")]
    public class StudentController : Controller
    {
        private readonly StudentService _service;
        public StudentController(StudentService service)
        {
            _service = service;
        }

        [HttpGet("idcard/{id}")]
        public async Task<IActionResult> IdCard(int id)
        {
            var student = await _service.GetStudentAsync(id);
            if (student == null) return NotFound();
            return View(student);
        }

        [HttpGet("result/{id}")]
        public async Task<IActionResult> SemesterResult(int id)
        {
            if (HttpContext.Session.GetString("IsLoggedIn") != "true")
            {
                return Redirect("/auth/login");
            }
            var loggedInId = HttpContext.Session.GetInt32("StudentId");
            if (loggedInId == null || loggedInId != id)
            {
                return Content("Unauthorized access to semester result");
            }
            var student = await _service.GetStudentAsync(id);
            if (student == null) return NotFound();
            return View(student);
        }

        [HttpGet("marks/{id}")]
        public async Task<IActionResult> Marks(int id)
        {
            if (HttpContext.Session.GetString("IsLoggedIn") != "true")
            {
                return Redirect("/auth/login");
            }
            var loggedInId = HttpContext.Session.GetInt32("StudentId");
            if (loggedInId == null || loggedInId != id)
            {
                return Unauthorized();
            }
            var student = await _service.GetStudentAsync(id);
            if (student == null) return NotFound();
            return View(student);
        }
    }
}
