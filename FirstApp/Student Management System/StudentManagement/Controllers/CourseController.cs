using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using StudentManagement.Models;
using StudentManagement.Data;
using Microsoft.EntityFrameworkCore;

namespace StudentManagementSystem.Controllers
{
    public class CourseController : Controller
    {
        private readonly AppDbContext _context;

        public CourseController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var courses = _context.Courses
                .Include(c => c.Department)
                .ToList();

            return View(courses);
        }

        public IActionResult Create()
        {
            ViewBag.Departments = new SelectList(_context.Departments, "DepartmentId", "DepartmentName");
            return View();
        }

        [HttpPost]
        public IActionResult Create(Course course)
        {
            _context.Courses.Add(course);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}