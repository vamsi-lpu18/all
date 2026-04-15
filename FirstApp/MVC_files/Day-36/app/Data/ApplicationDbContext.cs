using Microsoft.EntityFrameworkCore;
using app.Models;

namespace app.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Employee>  Employees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Employee entity
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId);
            
            entity.Property(e => e.EmployeeName)
                .IsRequired()
                .HasMaxLength(100);
            
            entity.Property(e => e.Department)
                .IsRequired()
                .HasMaxLength(50);
            
            entity.Property(e => e.Position)
                .IsRequired()
                .HasMaxLength(50);
            
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(100);
            
            entity.Property(e => e.PhoneNumber)
                .IsRequired()
                .HasMaxLength(20);
            
            entity.Property(e => e.Salary)
                .HasPrecision(18, 2);
        });
    }
}
