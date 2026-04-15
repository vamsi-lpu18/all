using cqrs_mediatr.CQRS.Commands;
using cqrs_mediatr.Data;
using cqrs_mediatr.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cqrs_mediatr.CQRS.Handlers;

public class UpdateProductHandler : IRequestHandler<UpdateProductCommand, Product?>
{
    private readonly AppDbContext _db;
    public UpdateProductHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Product?> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);
        if (product == null) return null;
        product.Name = request.Name;
        product.Price = request.Price;
        await _db.SaveChangesAsync(cancellationToken);
        return product;
    }
}
