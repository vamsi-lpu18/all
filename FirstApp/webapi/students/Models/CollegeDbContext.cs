using Microsoft.EntityFrameworkCore;

namespace students.Models
{
    public class CollegeDbContext : DbContext
    {
        public CollegeDbContext(DbContextOptions<CollegeDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
    }
}


