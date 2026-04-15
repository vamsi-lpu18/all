using mvc_database.Data;
using Microsoft.AspNetCore.Mvc;

namespace mvc_database.Controllers
{
    public class StudentController : Controller
    {
        private readonly StudentRepository _repo;

        public StudentController(StudentRepository repo)
        {
            _repo = repo;
        }

        public IActionResult Index()
        {
            var students = _repo.GetAllStudents();
            return View(students);
        }
        public IActionResult Privacy()
        {
            return View();
        }


    }
}