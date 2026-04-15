using cqrs_mediatr.Models;
using MediatR;

namespace cqrs_mediatr.CQRS.Commands;

public record CreateProductCommand(string Name, decimal Price) : IRequest<Product>;
