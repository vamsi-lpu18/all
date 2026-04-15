using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ProductService _service;

    public ProductController(ProductService service)
    {
        _service = service;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var product = await _service.GetProduct(id);
        if (product == null) return NotFound();

        return Ok(product);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllProducts());
    }

    [HttpPost]
    public async Task<IActionResult> Create(Product product)
    {
        var result = await _service.CreateProduct(product);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Product product)
    {
        var updated = await _service.UpdateProduct(id, product);
        return updated ? Ok() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteProduct(id);
        return deleted ? Ok() : NotFound();
    }
}