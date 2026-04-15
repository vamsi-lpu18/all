using one2many.Models;
using Microsoft.EntityFrameworkCore;
using one2many.Models;
namespace one2many.Data
{
    public class StudentManagementDbContext : DbContext
    {
        public StudentManagementDbContext(DbContextOptions<StudentManagementDbContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Course> Courses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>()
                .HasOne(s => s.Course)
                .WithMany(c => c.Students)
                .HasForeignKey(s => s.CourseId);
        }
    }
}
