using Microsoft.EntityFrameworkCore;
using Students.Models;
using Students.Repositories;

namespace Students.Services;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _repo;

    public StudentService(IStudentRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<Student>> GetAllStudentsAsync()
    {
        return await _repo.GetAllAsync();
    }

    public async Task<Student?> GetStudentByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id);
    }

    public async Task<Student?> GetStudentWithEnrollmentsAsync(int id)
    {
        return await _repo.GetByIdWithEnrollmentsAsync(id);
    }

    public async Task<(bool Success, string? Error)> CreateStudentAsync(Student student)
    {
        // Business rule: email must be unique
        var all = await _repo.GetAllAsync();
        if (all.Any(s => s.Email.Equals(student.Email, StringComparison.OrdinalIgnoreCase)))
            return (false, "A student with this email already exists.");

        student.CreatedAt = DateTime.Now;
        await _repo.AddAsync(student);
        return (true, null);
    }

    public async Task<(bool Success, string? Error)> UpdateStudentAsync(Student student)
    {
        if (!await _repo.ExistsAsync(student.StudentId))
            return (false, "Student not found.");

        // Business rule: email must be unique (excluding current student)
        var all = await _repo.GetAllAsync();
        if (all.Any(s => s.Email.Equals(student.Email, StringComparison.OrdinalIgnoreCase)
                      && s.StudentId != student.StudentId))
            return (false, "Another student with this email already exists.");

        try
        {
            await _repo.UpdateAsync(student);
            return (true, null);
        }
        catch (DbUpdateConcurrencyException)
        {
            return (false, "The record was modified by someone else. Please reload and try again.");
        }
    }

    public async Task<(bool Success, string? Error)> DeleteStudentAsync(int id)
    {
        var student = await _repo.GetByIdWithEnrollmentsAsync(id);
        if (student == null)
            return (false, "Student not found.");

        // Business rule: cannot delete a student who has active enrollments
        if (student.Enrollments.Any())
            return (false, $"Cannot delete — this student has {student.Enrollments.Count} enrollment(s). Remove enrollments first.");

        await _repo.DeleteAsync(id);
        return (true, null);
    }

    public async Task<bool> StudentExistsAsync(int id)
    {
        return await _repo.ExistsAsync(id);
    }
}
