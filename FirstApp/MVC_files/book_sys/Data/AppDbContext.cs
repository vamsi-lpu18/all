using Microsoft.EntityFrameworkCore;
using book_sys.Models;

namespace book_sys.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                .ToTable("TblBookMaster");

            modelBuilder.Entity<Book>()
                .Property(b => b.Price)
                .HasPrecision(18, 2);
        }
    }
}