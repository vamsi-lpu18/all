using demo.Data;
using Microsoft.AspNetCore.Mvc;

namespace demo.Controllers
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
            foreach (var student in students)
            {
                student.AgeSquare = student.Age * student.Age;
            }

            return View(students);
        }
        public IActionResult Privacy()
        {
            return View();
        }


    }
}