using Microsoft.EntityFrameworkCore;
using admission_form.Models;

namespace admission_form.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<AdmissionModel> Admissions { get; set; }
    }
}
