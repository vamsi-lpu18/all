using studentmanagement.Models;
using studentmanagement.Data;
using Microsoft.EntityFrameworkCore;

namespace studentmanagement.Services
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);
        Task AddAsync(User user);
        Task SaveAsync();
    }

    public class UserRepository : IUserRepository
    {
        private readonly StudentDbContext _context;
        public UserRepository(StudentDbContext context)
        {
            _context = context;
        }
        public async Task<User?> GetByUsernameAsync(string username) => await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        public async Task AddAsync(User user) => await _context.Users.AddAsync(user);
        public async Task SaveAsync() => await _context.SaveChangesAsync();
    }

    public class AuthService
    {
        private readonly IUserRepository _repo;
        public AuthService(IUserRepository repo)
        {
            _repo = repo;
        }
        public Task<User?> GetUserAsync(string username) => _repo.GetByUsernameAsync(username);
        public async Task RegisterAsync(User user)
        {
            await _repo.AddAsync(user);
            await _repo.SaveAsync();
        }
    }
}
