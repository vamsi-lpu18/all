using MediatR;
using cqrs_mediatr.Models;

namespace cqrs_mediatr.CQRS.Commands;

public record UpdateProductCommand(int Id, string Name, decimal Price) : IRequest<Product?>;
