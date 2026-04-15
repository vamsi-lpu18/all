using Students.Models;

namespace Students.Services;

public interface IStudentService
{
    Task<IEnumerable<Student>> GetAllStudentsAsync();
    Task<Student?> GetStudentByIdAsync(int id);
    Task<Student?> GetStudentWithEnrollmentsAsync(int id);
    Task<(bool Success, string? Error)> CreateStudentAsync(Student student);
    Task<(bool Success, string? Error)> UpdateStudentAsync(Student student);
    Task<(bool Success, string? Error)> DeleteStudentAsync(int id);
    Task<bool> StudentExistsAsync(int id);
}
