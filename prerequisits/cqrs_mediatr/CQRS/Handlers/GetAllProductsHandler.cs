using cqrs_mediatr.CQRS.Queries;
using cqrs_mediatr.Data;
using cqrs_mediatr.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cqrs_mediatr.CQRS.Handlers;

public class GetAllProductsHandler : IRequestHandler<GetAllProductsQuery, List<Product>>
{
    private readonly AppDbContext _db;
    public GetAllProductsHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        return await _db.Products.ToListAsync(cancellationToken);
    }
}
