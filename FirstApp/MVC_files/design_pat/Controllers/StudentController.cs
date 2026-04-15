using Microsoft.AspNetCore.Mvc;
using design_pat.Models;
using design_pat.Repositories;

namespace design_pat.Controllers
{
    // public class StudentController : Controller
    // {
    //     // GET: Student
    //     public ActionResult Index()
    //     {
    //         return View();
    //     }

    //     // GET: Student/Details/5
    //     public ActionResult Details(int id)
    //     {
    //         return View();
    //     }

    //     // GET: Student/Create
    //     public ActionResult Create()
    //     {
    //         return View();
    //     }

    //     // POST: Student/Create


    // }
    public class StudentController : Controller
    {
        private readonly IStudentRepository repo;

        public StudentController(IStudentRepository repository)
        {
            repo = repository;
        }

        // [HttpGet("students/all")]
        public IActionResult List()
        {
            var students = repo.GetAllStudents();

            List<string> result = new List<string>();

            foreach (var s in students)
            {
                int total = s.M1 + s.M2;
                result.Add($"{s.Name} Total = {s.M1 + s.M2}");
            }

            return Content(string.Join("\n", result));
        }

        public IActionResult Add()
        {
            Student s = new Student
            {
                Id = 3,
                Name = "Kumar",
                M1 = 75,
                M2 = 80
            };

            repo.AddStudent(s);

            return Content("Student Added");
        }
    }
}