using Microsoft.EntityFrameworkCore;
using StudentHostelAPI.Models;

namespace StudentHostelAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }

        public DbSet<Hostel> Hostels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>()
                .HasOne(s => s.Hostel)
                .WithOne(h => h.Student)
                .HasForeignKey<Hostel>(h => h.StudentId);

            // Seed data
            modelBuilder.Entity<Student>().HasData(
                new Student { StudentId = 1, Name = "Alice", Age = 20 },
                new Student { StudentId = 2, Name = "Bob", Age = 22 }
            );

            modelBuilder.Entity<Hostel>().HasData(
                new Hostel { HostelId = 1, RoomNumber = "A101", StudentId = 1 },
                new Hostel { HostelId = 2, RoomNumber = "B202", StudentId = 2 }
            );
        }
    }
}