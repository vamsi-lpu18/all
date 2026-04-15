using Microsoft.AspNetCore.Mvc;
using StudentManagement.Models;
using StudentManagement.Data;

namespace StudentManagementSystem.Controllers
{
    public class DepartmentController : Controller
    {
        private readonly AppDbContext _context;

        public DepartmentController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View(_context.Departments.ToList());
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Department department)
        {
            if (ModelState.IsValid)
            {
                _context.Departments.Add(department);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(department);
        }

        public IActionResult Edit(int id)
        {
            var dept = _context.Departments.Find(id);
            return View(dept);
        }

        [HttpPost]
        public IActionResult Edit(Department department)
        {
            _context.Departments.Update(department);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            var dept = _context.Departments.Find(id);
            return View(dept);
        }

        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            var dept = _context.Departments.Find(id);

            _context.Departments.Remove(dept);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}