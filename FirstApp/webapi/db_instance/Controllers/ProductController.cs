[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Add(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return Ok(product);
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _context.Products.ToListAsync());
    }
}