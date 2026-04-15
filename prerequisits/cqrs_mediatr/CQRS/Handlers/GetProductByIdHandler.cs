using cqrs_mediatr.CQRS.Queries;
using cqrs_mediatr.Data;
using cqrs_mediatr.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cqrs_mediatr.CQRS.Handlers;

public class GetProductByIdHandler : IRequestHandler<GetProductByIdQuery, Product?>
{
    private readonly AppDbContext _db;
    public GetProductByIdHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Product?> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        return await _db.Products.FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);
    }
}
