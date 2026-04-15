using Microsoft.EntityFrameworkCore;
using Students.Models;

namespace Students.Repositories;

public class StudentRepository : IStudentRepository
{
    private readonly StudentPortalDbContext _context;

    public StudentRepository(StudentPortalDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Student>> GetAllAsync()
    {
        return await _context.Students
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync();
    }

    public async Task<Student?> GetByIdAsync(int id)
    {
        return await _context.Students.FindAsync(id);
    }

    public async Task<Student?> GetByIdWithEnrollmentsAsync(int id)
    {
        return await _context.Students
            .Include(s => s.Enrollments)
            .ThenInclude(e => e.Course)
            .FirstOrDefaultAsync(s => s.StudentId == id);
    }

    public async Task AddAsync(Student student)
    {
        student.CreatedAt = DateTime.Now;
        await _context.Students.AddAsync(student);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Student student)
    {
        _context.Students.Update(student);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student != null)
        {
            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Students.AnyAsync(s => s.StudentId == id);
    }
}
