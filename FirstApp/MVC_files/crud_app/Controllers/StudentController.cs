using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using crud_app.Data;
using crud_app.Models;

namespace crud_app.Controllers;

public class StudentController : Controller
{
    private readonly AppDbContext _context;

    public StudentController(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Read()
    {
        var students = await _context.Students.AsNoTracking().ToListAsync();
        return View(students);
    }

    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Student student)
    {
        if (!ModelState.IsValid)
        {
            return View(student);
        }

        _context.Students.Add(student);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Read));
    }

    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var student = await _context.Students.FindAsync(id.Value);
        if (student == null)
        {
            return NotFound();
        }

        return View(student);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, Student student)
    {
        if (id != student.Id)
        {
            return NotFound();
        }

        if (!ModelState.IsValid)
        {
            return View(student);
        }

        try
        {
            _context.Update(student);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.Students.AnyAsync(s => s.Id == student.Id))
            {
                return NotFound();
            }

            throw;
        }

        return RedirectToAction(nameof(Read));
    }

    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var student = await _context.Students.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id.Value);
        if (student == null)
        {
            return NotFound();
        }

        return View(student);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student == null)
        {
            return RedirectToAction(nameof(Read));
        }

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Read));
    }
}
