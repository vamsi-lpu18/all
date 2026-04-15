using Microsoft.EntityFrameworkCore;
using studentmanagement.Models;

namespace studentmanagement.Data
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options) { }
        public DbSet<Student> Students { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>()
                .Property(s => s.Name)
                .HasMaxLength(50)
                .IsRequired();
            modelBuilder.Entity<Student>()
                .Property(s => s.RollNo)
                .HasMaxLength(20)
                .IsRequired();
            modelBuilder.Entity<Student>()
                .Property(s => s.Semester)
                .HasMaxLength(10);
        }
    }
}
