using Microsoft.AspNetCore.Mvc;
using Students.Models;
using Students.Services;

namespace Students.Controllers;

public class StudentController : Controller
{
    private readonly IStudentService _service;

    public StudentController(IStudentService service)
    {
        _service = service;
    }

    // GET: Student
    public async Task<IActionResult> Index()
    {
        var students = await _service.GetAllStudentsAsync();
        return View(students);
    }

    // GET: Student/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null) return NotFound();

        var student = await _service.GetStudentWithEnrollmentsAsync(id.Value);
        if (student == null) return NotFound();

        return View(student);
    }

    // GET: Student/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: Student/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("FullName,Email,Phone,Status,JoinDate")] Student student)
    {
        if (ModelState.IsValid)
        {
            var (success, error) = await _service.CreateStudentAsync(student);
            if (success)
            {
                TempData["Success"] = "Student created successfully.";
                return RedirectToAction(nameof(Index));
            }
            ModelState.AddModelError(string.Empty, error!);
        }
        return View(student);
    }

    // GET: Student/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null) return NotFound();

        var student = await _service.GetStudentByIdAsync(id.Value);
        if (student == null) return NotFound();

        return View(student);
    }

    // POST: Student/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("StudentId,FullName,Email,Phone,Status,JoinDate,CreatedAt")] Student student)
    {
        if (id != student.StudentId) return NotFound();

        if (ModelState.IsValid)
        {
            var (success, error) = await _service.UpdateStudentAsync(student);
            if (success)
            {
                TempData["Success"] = "Student updated successfully.";
                return RedirectToAction(nameof(Index));
            }
            ModelState.AddModelError(string.Empty, error!);
        }
        return View(student);
    }

    // GET: Student/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null) return NotFound();

        var student = await _service.GetStudentByIdAsync(id.Value);
        if (student == null) return NotFound();

        return View(student);
    }

    // POST: Student/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var (success, error) = await _service.DeleteStudentAsync(id);
        if (success)
            TempData["Success"] = "Student deleted successfully.";
        else
            TempData["Error"] = error;
        return RedirectToAction(nameof(Index));
    }
}
