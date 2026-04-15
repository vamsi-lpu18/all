using cqrs_mediatr.CQRS.Commands;
using cqrs_mediatr.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace cqrs_mediatr.CQRS.Handlers;

public class DeleteProductHandler : IRequestHandler<DeleteProductCommand, bool>
{
    private readonly AppDbContext _db;
    public DeleteProductHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);
        if (product == null) return false;
        _db.Products.Remove(product);
        await _db.SaveChangesAsync(cancellationToken);
        return true;
    }
}
