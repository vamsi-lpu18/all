# 🅿️ SmartPark — Code: Payment, Notification, Gateway, Docker & CI/CD

---

## PAYMENT SERVICE

### `src/PaymentService/SmartPark.PaymentService/Models/Payment.cs`

```csharp
namespace SmartPark.PaymentService.Models;

// Simple payment record
public class Payment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BookingId { get; set; }              // Which booking this is for
    public Guid UserId { get; set; }                 // Who is paying
    public decimal Amount { get; set; }              // How much
    public string Status { get; set; } = "Pending";  // Pending, Completed, Failed
    public string PaymentMethod { get; set; } = "Card";  // Card, UPI, Cash
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? PaidAt { get; set; }
}
```

### `src/PaymentService/SmartPark.PaymentService/Data/PaymentDbContext.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using SmartPark.PaymentService.Models;

namespace SmartPark.PaymentService.Data;

public class PaymentDbContext : DbContext
{
    public PaymentDbContext(DbContextOptions<PaymentDbContext> options) : base(options) { }

    public DbSet<Payment> Payments => Set<Payment>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Payment>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.HasIndex(p => p.BookingId);
            entity.Property(p => p.Amount).HasPrecision(10, 2);
        });
    }
}
```

### `src/PaymentService/SmartPark.PaymentService/Consumers/BookingCreatedConsumer.cs`

```csharp
using MassTransit;
using SmartPark.PaymentService.Data;
using SmartPark.PaymentService.Models;
using SmartPark.Shared.Events;

namespace SmartPark.PaymentService.Consumers;

// This runs automatically when Parking Service creates a booking!
// RabbitMQ delivers the BookingCreatedEvent to this consumer
public class BookingCreatedConsumer : IConsumer<BookingCreatedEvent>
{
    private readonly PaymentDbContext _db;
    private readonly IPublishEndpoint _bus;
    private readonly ILogger<BookingCreatedConsumer> _logger;

    public BookingCreatedConsumer(PaymentDbContext db, IPublishEndpoint bus,
        ILogger<BookingCreatedConsumer> logger)
    {
        _db = db;
        _bus = bus;
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<BookingCreatedEvent> context)
    {
        var evt = context.Message;
        _logger.LogInformation("💰 Processing payment for Booking {Id}, Amount: {Amount}",
            evt.BookingId, evt.Amount);

        // Create a payment record
        var payment = new Payment
        {
            BookingId = evt.BookingId,
            UserId = evt.UserId,
            Amount = evt.Amount,
            Status = "Pending"
        };

        _db.Payments.Add(payment);
        await _db.SaveChangesAsync();

        try
        {
            // ── SIMULATE PAYMENT PROCESSING ──
            // In real life: call Razorpay/Stripe API here
            // For demo: we simulate with a random success/fail

            await Task.Delay(1000);  // Simulate processing time

            // Simulate: 90% success rate
            var random = new Random();
            var isSuccess = random.Next(100) < 90;  // 90% chance of success

            if (isSuccess)
            {
                // ✅ Payment succeeded!
                payment.Status = "Completed";
                payment.PaidAt = DateTime.UtcNow;
                await _db.SaveChangesAsync();

                // Tell Parking Service: "Payment done!"
                await _bus.Publish(new PaymentCompletedEvent
                {
                    BookingId = evt.BookingId,
                    PaymentId = payment.Id,
                    Amount = payment.Amount,
                    PaidAt = DateTime.UtcNow
                });

                _logger.LogInformation("✅ Payment {Id} completed!", payment.Id);
            }
            else
            {
                // ❌ Payment failed!
                payment.Status = "Failed";
                await _db.SaveChangesAsync();

                // Tell Parking Service: "Payment failed!" → triggers SAGA COMPENSATION
                await _bus.Publish(new PaymentFailedEvent
                {
                    BookingId = evt.BookingId,
                    Reason = "Payment declined by bank (simulated)"
                });

                _logger.LogWarning("❌ Payment {Id} failed!", payment.Id);
            }
        }
        catch (Exception ex)
        {
            // Something went wrong → payment failed
            payment.Status = "Failed";
            await _db.SaveChangesAsync();

            await _bus.Publish(new PaymentFailedEvent
            {
                BookingId = evt.BookingId,
                Reason = $"Error: {ex.Message}"
            });
        }
    }
}
```

### `src/PaymentService/SmartPark.PaymentService/Controllers/PaymentsController.cs`

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartPark.PaymentService.Data;

namespace SmartPark.PaymentService.Controllers;

[ApiController]
[Route("api/payments")]
[Authorize]
public class PaymentsController : ControllerBase
{
    private readonly PaymentDbContext _db;

    public PaymentsController(PaymentDbContext db) => _db = db;

    // GET /api/payments — Get my payments
    [HttpGet]
    public async Task<IActionResult> GetMyPayments()
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var payments = await _db.Payments
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return Ok(payments);
    }

    // GET /api/payments/{bookingId} — Get payment for a booking
    [HttpGet("{bookingId}")]
    public async Task<IActionResult> GetByBooking(Guid bookingId)
    {
        var payment = await _db.Payments
            .FirstOrDefaultAsync(p => p.BookingId == bookingId);

        if (payment == null) return NotFound(new { message = "Payment not found" });
        return Ok(payment);
    }

    // GET /api/payments/all — Admin only
    [HttpGet("all")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var payments = await _db.Payments
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
        return Ok(payments);
    }
}
```

### `src/PaymentService/SmartPark.PaymentService/Program.cs`

```csharp
using System.Text;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartPark.PaymentService.Consumers;
using SmartPark.PaymentService.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PaymentDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PaymentDb")));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true, ValidateAudience = true,
            ValidateLifetime = true, ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<BookingCreatedConsumer>();
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"] ?? "localhost");
        cfg.ConfigureEndpoints(context);
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PaymentDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
```

### `src/PaymentService/SmartPark.PaymentService/appsettings.json`

```json
{
  "ConnectionStrings": {
    "PaymentDb": "Host=localhost;Port=5433;Database=SmartParkPayment;Username=postgres;Password=postgres"
  },
  "Jwt": {
    "Key": "ThisIsASecretKeyForSmartPark12345!",
    "Issuer": "SmartPark",
    "Audience": "SmartParkUsers"
  },
  "RabbitMq": { "Host": "localhost" }
}
```

---

## NOTIFICATION SERVICE (Simple Worker)

### `src/NotificationService/SmartPark.NotificationService/Consumers/NotificationConsumer.cs`

```csharp
using MassTransit;
using SmartPark.Shared.Events;

namespace SmartPark.NotificationService.Consumers;

// Listens for booking confirmed events
public class BookingConfirmedConsumer : IConsumer<BookingConfirmedEvent>
{
    private readonly ILogger<BookingConfirmedConsumer> _logger;

    public BookingConfirmedConsumer(ILogger<BookingConfirmedConsumer> logger) => _logger = logger;

    public Task Consume(ConsumeContext<BookingConfirmedEvent> context)
    {
        var evt = context.Message;
        _logger.LogInformation(
            "📧 EMAIL SENT: Booking {Id} confirmed! Spot: {Spot}, Time: {Time}, Hours: {Hours}",
            evt.BookingId, evt.SpotNumber, evt.StartTime, evt.Hours);
        // TODO: Send real email using SendGrid/SMTP
        return Task.CompletedTask;
    }
}

// Listens for booking cancelled events
public class BookingCancelledConsumer : IConsumer<BookingCancelledEvent>
{
    private readonly ILogger<BookingCancelledConsumer> _logger;

    public BookingCancelledConsumer(ILogger<BookingCancelledConsumer> logger) => _logger = logger;

    public Task Consume(ConsumeContext<BookingCancelledEvent> context)
    {
        var evt = context.Message;
        _logger.LogWarning(
            "📧 EMAIL SENT: Booking {Id} cancelled. Reason: {Reason}",
            evt.BookingId, evt.Reason);
        return Task.CompletedTask;
    }
}
```

### `src/NotificationService/SmartPark.NotificationService/Program.cs`

```csharp
using MassTransit;
using SmartPark.NotificationService.Consumers;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<BookingConfirmedConsumer>();
    x.AddConsumer<BookingCancelledConsumer>();

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"] ?? "localhost");
        cfg.ConfigureEndpoints(context);
    });
});

var host = builder.Build();
host.Run();
```

---

## OCELOT API GATEWAY

### `src/Gateway/SmartPark.Gateway/ocelot.json`

```json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/auth/{everything}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [{ "Host": "auth-service", "Port": 80 }],
      "UpstreamPathTemplate": "/api/auth/{everything}",
      "UpstreamHttpMethod": [ "POST", "GET" ],
      "RateLimitOptions": {
        "EnableRateLimiting": true,
        "Period": "1m",
        "Limit": 20
      }
    },
    {
      "DownstreamPathTemplate": "/api/spots/{everything}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [{ "Host": "parking-service", "Port": 80 }],
      "UpstreamPathTemplate": "/api/spots/{everything}",
      "UpstreamHttpMethod": [ "GET", "POST" ],
      "AuthenticationOptions": { "AuthenticationProviderKey": "Bearer" },
      "RateLimitOptions": { "EnableRateLimiting": true, "Period": "1m", "Limit": 100 }
    },
    {
      "DownstreamPathTemplate": "/api/spots",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [{ "Host": "parking-service", "Port": 80 }],
      "UpstreamPathTemplate": "/api/spots",
      "UpstreamHttpMethod": [ "GET", "POST" ]
    },
    {
      "DownstreamPathTemplate": "/api/bookings/{everything}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [{ "Host": "parking-service", "Port": 80 }],
      "UpstreamPathTemplate": "/api/bookings/{everything}",
      "UpstreamHttpMethod": [ "GET", "POST" ],
      "AuthenticationOptions": { "AuthenticationProviderKey": "Bearer" },
      "RateLimitOptions": { "EnableRateLimiting": true, "Period": "1m", "Limit": 50 }
    },
    {
      "DownstreamPathTemplate": "/api/bookings",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [{ "Host": "parking-service", "Port": 80 }],
      "UpstreamPathTemplate": "/api/bookings",
      "UpstreamHttpMethod": [ "GET", "POST" ],
      "AuthenticationOptions": { "AuthenticationProviderKey": "Bearer" },
      "RateLimitOptions": { "EnableRateLimiting": true, "Period": "1m", "Limit": 50 }
    },
    {
      "DownstreamPathTemplate": "/api/payments/{everything}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [{ "Host": "payment-service", "Port": 80 }],
      "UpstreamPathTemplate": "/api/payments/{everything}",
      "UpstreamHttpMethod": [ "GET" ],
      "AuthenticationOptions": { "AuthenticationProviderKey": "Bearer" },
      "RateLimitOptions": { "EnableRateLimiting": true, "Period": "1m", "Limit": 50 }
    },
    {
      "DownstreamPathTemplate": "/api/payments",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [{ "Host": "payment-service", "Port": 80 }],
      "UpstreamPathTemplate": "/api/payments",
      "UpstreamHttpMethod": [ "GET" ],
      "AuthenticationOptions": { "AuthenticationProviderKey": "Bearer" }
    }
  ],
  "GlobalConfiguration": {
    "BaseUrl": "http://localhost:5000",
    "RateLimitOptions": {
      "DisableRateLimitHeaders": false,
      "QuotaExceededMessage": "Too many requests! Please wait.",
      "HttpStatusCode": 429
    }
  }
}
```

### `src/Gateway/SmartPark.Gateway/Program.cs`

```csharp
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Load ocelot.json
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// JWT for validating tokens at the gateway level
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("Bearer", options =>
    {
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true, ValidateAudience = true,
            ValidateLifetime = true, ValidateIssuerSigningKey = true,
            ValidIssuer = "SmartPark",
            ValidAudience = "SmartParkUsers",
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("ThisIsASecretKeyForSmartPark12345!"))
        };
    });

builder.Services.AddOcelot();

// Allow React frontend
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins("http://localhost:3000", "http://localhost:5173")
     .AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseCors();
await app.UseOcelot();
app.Run();
```

---

## DOCKER COMPOSE

### `docker-compose.yml`

```yaml
version: '3.8'

services:
  # === DATABASES ===
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      SA_PASSWORD: "YourPassword123!"
      ACCEPT_EULA: "Y"
    ports: ["1433:1433"]

  postgres-parking:
    image: postgres:16-alpine
    environment: { POSTGRES_DB: SmartParkParking, POSTGRES_USER: postgres, POSTGRES_PASSWORD: postgres }
    ports: ["5432:5432"]

  postgres-payment:
    image: postgres:16-alpine
    environment: { POSTGRES_DB: SmartParkPayment, POSTGRES_USER: postgres, POSTGRES_PASSWORD: postgres }
    ports: ["5433:5432"]

  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports: ["5672:5672", "15672:15672"]

  # === SERVICES ===
  auth-service:
    build: { context: ., dockerfile: src/AuthService/SmartPark.AuthService/Dockerfile }
    environment:
      - ConnectionStrings__AuthDb=Server=sqlserver;Database=SmartParkAuth;User=sa;Password=YourPassword123!;TrustServerCertificate=True
      - Jwt__Key=ThisIsASecretKeyForSmartPark12345!
      - Jwt__Issuer=SmartPark
      - Jwt__Audience=SmartParkUsers
    depends_on: [sqlserver]

  parking-service:
    build: { context: ., dockerfile: src/ParkingService/SmartPark.ParkingService/Dockerfile }
    environment:
      - ConnectionStrings__ParkingDb=Host=postgres-parking;Database=SmartParkParking;Username=postgres;Password=postgres
      - RabbitMq__Host=rabbitmq
      - Jwt__Key=ThisIsASecretKeyForSmartPark12345!
      - Jwt__Issuer=SmartPark
      - Jwt__Audience=SmartParkUsers
    depends_on: [postgres-parking, rabbitmq]

  payment-service:
    build: { context: ., dockerfile: src/PaymentService/SmartPark.PaymentService/Dockerfile }
    environment:
      - ConnectionStrings__PaymentDb=Host=postgres-payment;Database=SmartParkPayment;Username=postgres;Password=postgres
      - RabbitMq__Host=rabbitmq
      - Jwt__Key=ThisIsASecretKeyForSmartPark12345!
      - Jwt__Issuer=SmartPark
      - Jwt__Audience=SmartParkUsers
    depends_on: [postgres-payment, rabbitmq]

  notification-service:
    build: { context: ., dockerfile: src/NotificationService/SmartPark.NotificationService/Dockerfile }
    environment:
      - RabbitMq__Host=rabbitmq
    depends_on: [rabbitmq]

  api-gateway:
    build: { context: ., dockerfile: src/Gateway/SmartPark.Gateway/Dockerfile }
    ports: ["5000:80"]
    depends_on: [auth-service, parking-service, payment-service]

  frontend:
    build: { context: ./frontend/smartpark-ui }
    ports: ["3000:80"]
    depends_on: [api-gateway]

  # === SONARQUBE ===
  sonarqube:
    image: sonarqube:community
    ports: ["9000:9000"]
    environment: { SONAR_ES_BOOTSTRAP_CHECKS_DISABLE: "true" }
```

### Run Everything

```bash
docker-compose up --build -d
```

---

## CI/CD: `.github/workflows/ci.yml`

```yaml
name: SmartPark CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with: { dotnet-version: '8.0.x' }
      - run: dotnet restore SmartPark.sln
      - run: dotnet build SmartPark.sln -c Release --no-restore
      - run: dotnet test SmartPark.sln -c Release --no-build

      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@v2
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}

  docker-push:
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [auth-service, parking-service, payment-service, notification-service, api-gateway]
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - uses: docker/build-push-action@v5
        with:
          context: .
          file: src/${{ matrix.service }}/Dockerfile
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/smartpark-${{ matrix.service }}:latest
```

### `sonar-project.properties`

```properties
sonar.projectKey=smartpark
sonar.projectName=SmartPark
sonar.sources=src/
sonar.tests=tests/
sonar.exclusions=**/Migrations/**,**/obj/**,**/bin/**
```
