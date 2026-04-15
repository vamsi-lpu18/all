using cqrs_mediatr.CQRS.Commands;
using cqrs_mediatr.Data;
using cqrs_mediatr.Models;
using MediatR;

namespace cqrs_mediatr.CQRS.Handlers;

public class CreateProductHandler : IRequestHandler<CreateProductCommand, Product>
{
    private readonly AppDbContext _db;
    public CreateProductHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Product> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Product { Name = request.Name, Price = request.Price };
        _db.Products.Add(product);
        await _db.SaveChangesAsync(cancellationToken);
        return product;
    }
}
