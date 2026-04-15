using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using one2one.Models;
namespace one2one.Data
{


    public class StudentManagementContext : DbContext
    {
        public StudentManagementContext(DbContextOptions<StudentManagementContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<HostelRoom> HostelRooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>()
                .HasOne(s => s.Room)
                .WithOne(r => r.ResidentStudent)
                .HasForeignKey<HostelRoom>(r => r.StudentId);

            modelBuilder.Entity<HostelRoom>()
             .HasIndex(r => r.StudentId)
             .IsUnique();   
        }
    }
}