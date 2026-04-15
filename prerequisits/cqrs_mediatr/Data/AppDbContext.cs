using cqrs_mediatr.Models;
using Microsoft.EntityFrameworkCore;

namespace cqrs_mediatr.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
}
