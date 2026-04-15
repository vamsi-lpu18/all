using Ef_mvc.Models;
using Microsoft.EntityFrameworkCore;

namespace Ef_mvc.Data
{
    public class StudentManagementContext : DbContext
    {
        public StudentManagementContext(DbContextOptions<StudentManagementContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Hostel> Hostels { get; set; }


    }
}