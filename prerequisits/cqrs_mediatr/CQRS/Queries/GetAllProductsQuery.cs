using cqrs_mediatr.Models;
using MediatR;
using System.Collections.Generic;

namespace cqrs_mediatr.CQRS.Queries;

public record GetAllProductsQuery : IRequest<List<Product>>;
