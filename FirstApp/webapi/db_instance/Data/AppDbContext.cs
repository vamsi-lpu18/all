public class AppDbContext : DbContext
{
    private readonly TenantService _tenantService;

    public AppDbContext(DbContextOptions<AppDbContext> options,
                        TenantService tenantService)
        : base(options)
    {
        _tenantService = tenantService;
    }

    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_tenantService.ConnectionString);
    }
}