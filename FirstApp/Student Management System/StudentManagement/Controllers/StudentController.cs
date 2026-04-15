using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using StudentManagement.Models;
using StudentManagement.Data;
using Microsoft.EntityFrameworkCore;

namespace StudentManagementSystem.Controllers
{
    public class StudentController : Controller
    {
        private readonly AppDbContext _context;

        public StudentController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var students = _context.Students
                .Include(s => s.Department)
                .Include(s => s.Course)
                .ToList();

            return View(students);
        }

        public IActionResult Create()
        {
            ViewBag.Departments = new SelectList(_context.Departments, "DepartmentId", "DepartmentName");
            ViewBag.Courses = new SelectList(_context.Courses, "CourseId", "CourseName");

            return View();
        }

        [HttpPost]
        public IActionResult Create(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}