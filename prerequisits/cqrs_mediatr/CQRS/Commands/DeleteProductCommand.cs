using MediatR;

namespace cqrs_mediatr.CQRS.Commands;

public record DeleteProductCommand(int Id) : IRequest<bool>;
