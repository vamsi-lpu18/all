public class TenantMiddleware
{
    private readonly RequestDelegate _next;

    public TenantMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context,
                             TenantService tenantService,
                             IConfiguration config)
    {
        var tenantId = context.Request.Headers["tenant"];

        var tenants = config.GetSection("Tenants")
                            .Get<List<Tenant>>();

        var tenant = tenants.FirstOrDefault(t => t.TenantId == tenantId);

        if (tenant != null)
        {
            tenantService.ConnectionString = tenant.ConnectionString;
        }

        await _next(context);
    }
}