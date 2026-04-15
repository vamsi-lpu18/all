using studentmanagement.Models;
using studentmanagement.Data;
using Microsoft.EntityFrameworkCore;

namespace studentmanagement.Services
{
    public interface IStudentRepository
    {
        Task<Student> GetByIdAsync(int id);
        Task<List<Student>> GetAllAsync();
        Task AddAsync(Student student);
        Task SaveAsync();
    }

    public class StudentRepository : IStudentRepository
    {
        private readonly StudentDbContext _context;
        public StudentRepository(StudentDbContext context)
        {
            _context = context;
        }
        public async Task<Student> GetByIdAsync(int id) => await _context.Students.FindAsync(id);
        public async Task<List<Student>> GetAllAsync() => await _context.Students.ToListAsync();
        public async Task AddAsync(Student student) => await _context.Students.AddAsync(student);
        public async Task SaveAsync() => await _context.SaveChangesAsync();
    }

    public class StudentService
    {
        private readonly IStudentRepository _repo;
        public StudentService(IStudentRepository repo)
        {
            _repo = repo;
        }
        public Task<Student> GetStudentAsync(int id) => _repo.GetByIdAsync(id);
        public Task<List<Student>> GetStudentsAsync() => _repo.GetAllAsync();
        public async Task AddStudentAsync(Student student)
        {
            await _repo.AddAsync(student);
            await _repo.SaveAsync();
        }
    }
}
