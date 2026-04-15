using cqrs_mediatr.Models;
using MediatR;

namespace cqrs_mediatr.CQRS.Queries;

public record GetProductByIdQuery(int Id) : IRequest<Product?>;
