using cqrs_mediatr.CQRS.Commands;
using cqrs_mediatr.CQRS.Queries;
using cqrs_mediatr.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace cqrs_mediatr.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IMediator _mediator;
    public ProductController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll()
    {
        var products = await _mediator.Send(new GetAllProductsQuery());
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _mediator.Send(new GetProductByIdQuery(id));
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create([FromBody] CreateProductCommand command)
    {
        var product = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> Update(int id, [FromBody] UpdateProductCommand command)
    {
        if (id != command.Id) return BadRequest();
        var product = await _mediator.Send(command);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var result = await _mediator.Send(new DeleteProductCommand(id));
        if (!result) return NotFound();
        return NoContent();
    }
}
