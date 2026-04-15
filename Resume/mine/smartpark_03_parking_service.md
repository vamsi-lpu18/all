# 🅿️ SmartPark — Code: Parking Service (Spots + Bookings + Saga)

---

## Models (Database Tables)

### `src/ParkingService/SmartPark.ParkingService/Models/ParkingSpot.cs`

```csharp
namespace SmartPark.ParkingService.Models;

// Each parking spot in the parking lot
public class ParkingSpot
{
    public Guid Id { get; set; } = Guid.NewGuid();          // Unique ID
    public string SpotNumber { get; set; } = string.Empty;   // Like "A-01", "B-05"
    public string Location { get; set; } = string.Empty;     // "Floor 1", "Zone A"
    public string Type { get; set; } = "Regular";            // Regular, VIP, Handicap
    public decimal PricePerHour { get; set; }                // Cost per hour
    public bool IsAvailable { get; set; } = true;            // Is the spot free?
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
```

### `src/ParkingService/SmartPark.ParkingService/Models/Booking.cs`

```csharp
namespace SmartPark.ParkingService.Models;

// When someone books a parking spot
public class Booking
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SpotId { get; set; }                         // Which spot
    public Guid UserId { get; set; }                         // Who booked
    public string VehicleNumber { get; set; } = string.Empty; // Car plate
    public DateTime StartTime { get; set; }                  // When parking starts
    public int Hours { get; set; }                           // For how many hours
    public decimal TotalAmount { get; set; }                 // Total price
    public string Status { get; set; } = "Pending";          // Pending, Confirmed, Cancelled
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property (EF will link this to ParkingSpot table)
    public ParkingSpot? Spot { get; set; }
}
```

---

## Database Context (EF Code-First)

### `src/ParkingService/SmartPark.ParkingService/Data/ParkingDbContext.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using SmartPark.ParkingService.Models;

namespace SmartPark.ParkingService.Data;

public class ParkingDbContext : DbContext
{
    public ParkingDbContext(DbContextOptions<ParkingDbContext> options) : base(options) { }

    // These become database tables
    public DbSet<ParkingSpot> ParkingSpots => Set<ParkingSpot>();
    public DbSet<Booking> Bookings => Set<Booking>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        // Configure ParkingSpot table
        builder.Entity<ParkingSpot>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.HasIndex(p => p.SpotNumber).IsUnique(); // Each spot number must be unique
            entity.Property(p => p.PricePerHour).HasPrecision(10, 2); // 10 digits, 2 decimals
        });

        // Configure Booking table
        builder.Entity<Booking>(entity =>
        {
            entity.HasKey(b => b.Id);
            entity.HasIndex(b => b.UserId);      // Fast search by user
            entity.HasIndex(b => b.Status);       // Fast search by status
            entity.Property(b => b.TotalAmount).HasPrecision(10, 2);

            // Relationship: each Booking belongs to one ParkingSpot
            entity.HasOne(b => b.Spot)
                  .WithMany()
                  .HasForeignKey(b => b.SpotId);
        });

        // Add some sample parking spots to start with
        builder.Entity<ParkingSpot>().HasData(
            new ParkingSpot { Id = Guid.Parse("11111111-1111-1111-1111-111111111111"), SpotNumber = "A-01", Location = "Floor 1", Type = "Regular", PricePerHour = 30 },
            new ParkingSpot { Id = Guid.Parse("22222222-2222-2222-2222-222222222222"), SpotNumber = "A-02", Location = "Floor 1", Type = "Regular", PricePerHour = 30 },
            new ParkingSpot { Id = Guid.Parse("33333333-3333-3333-3333-333333333333"), SpotNumber = "B-01", Location = "Floor 1", Type = "VIP", PricePerHour = 60 },
            new ParkingSpot { Id = Guid.Parse("44444444-4444-4444-4444-444444444444"), SpotNumber = "C-01", Location = "Floor 2", Type = "Handicap", PricePerHour = 20 }
        );
    }
}
```

---

## Controller (API Endpoints)

### `src/ParkingService/SmartPark.ParkingService/Controllers/SpotsController.cs`

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartPark.ParkingService.Data;
using SmartPark.ParkingService.Models;
using SmartPark.Shared.DTOs;

namespace SmartPark.ParkingService.Controllers;

[ApiController]
[Route("api/spots")]
public class SpotsController : ControllerBase
{
    private readonly ParkingDbContext _db;

    public SpotsController(ParkingDbContext db)
    {
        _db = db;
    }

    // GET /api/spots — Get all available spots (anyone can see)
    [HttpGet]
    public async Task<IActionResult> GetAllSpots([FromQuery] string? type)
    {
        var query = _db.ParkingSpots.AsQueryable();

        // Filter by type if provided (e.g., ?type=VIP)
        if (!string.IsNullOrEmpty(type))
            query = query.Where(s => s.Type == type);

        var spots = await query.OrderBy(s => s.SpotNumber).ToListAsync();
        return Ok(spots);
    }

    // GET /api/spots/available — Get only free spots
    [HttpGet("available")]
    public async Task<IActionResult> GetAvailableSpots()
    {
        var spots = await _db.ParkingSpots
            .Where(s => s.IsAvailable)
            .OrderBy(s => s.SpotNumber)
            .ToListAsync();
        return Ok(spots);
    }

    // POST /api/spots — Create a new spot (Admin only)
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateSpot([FromBody] CreateSpotDto dto)
    {
        // Check if spot number already exists
        if (await _db.ParkingSpots.AnyAsync(s => s.SpotNumber == dto.SpotNumber))
            return BadRequest(new { message = "Spot number already exists!" });

        var spot = new ParkingSpot
        {
            SpotNumber = dto.SpotNumber,
            Location = dto.Location,
            Type = dto.Type,
            PricePerHour = dto.PricePerHour
        };

        _db.ParkingSpots.Add(spot);
        await _db.SaveChangesAsync();

        return Ok(spot);
    }
}
```

### `src/ParkingService/SmartPark.ParkingService/Controllers/BookingsController.cs`

```csharp
using System.Security.Claims;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartPark.ParkingService.Data;
using SmartPark.ParkingService.Models;
using SmartPark.Shared.DTOs;
using SmartPark.Shared.Events;

namespace SmartPark.ParkingService.Controllers;

[ApiController]
[Route("api/bookings")]
[Authorize]  // Must be logged in
public class BookingsController : ControllerBase
{
    private readonly ParkingDbContext _db;
    private readonly IPublishEndpoint _bus;  // For sending messages to RabbitMQ

    public BookingsController(ParkingDbContext db, IPublishEndpoint bus)
    {
        _db = db;
        _bus = bus;
    }

    // GET /api/bookings — Get my bookings
    [HttpGet]
    public async Task<IActionResult> GetMyBookings()
    {
        // Get the logged-in user's ID from the JWT token
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var bookings = await _db.Bookings
            .Include(b => b.Spot)              // Also load the spot details
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();

        return Ok(bookings);
    }

    // POST /api/bookings — Book a parking spot
    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto dto)
    {
        // Step 1: Check if the spot exists and is available
        var spot = await _db.ParkingSpots.FindAsync(dto.SpotId);
        if (spot == null)
            return NotFound(new { message = "Parking spot not found!" });
        if (!spot.IsAvailable)
            return BadRequest(new { message = "This spot is already taken!" });

        // Step 2: Get the logged-in user's ID
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        // Step 3: Calculate total amount
        var totalAmount = spot.PricePerHour * dto.Hours;

        // Step 4: Create the booking with "Pending" status
        var booking = new Booking
        {
            SpotId = dto.SpotId,
            UserId = userId,
            VehicleNumber = dto.VehicleNumber,
            StartTime = dto.StartTime,
            Hours = dto.Hours,
            TotalAmount = totalAmount,
            Status = "Pending"  // Will become "Confirmed" after payment
        };

        // Step 5: Mark the spot as taken
        spot.IsAvailable = false;

        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();

        // Step 6: PUBLISH EVENT TO RABBITMQ
        // This tells the Payment Service: "Hey, create a payment for this booking!"
        await _bus.Publish(new BookingCreatedEvent
        {
            BookingId = booking.Id,
            UserId = userId,
            SpotId = spot.Id,
            Amount = totalAmount,
            Hours = dto.Hours,
            CreatedAt = DateTime.UtcNow
        });

        return Ok(new
        {
            message = "Booking created! Payment is being processed...",
            booking
        });
    }

    // GET /api/bookings/all — Admin: see all bookings
    [HttpGet("all")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllBookings()
    {
        var bookings = await _db.Bookings
            .Include(b => b.Spot)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
        return Ok(bookings);
    }
}
```

---

## RabbitMQ Consumers (SAGA PATTERN!)

> [!IMPORTANT]
> This is the **Saga compensation** pattern. When Payment Service sends an event,
> the Parking Service reacts:
> - ✅ PaymentCompleted → Confirm the booking
> - ❌ PaymentFailed → Cancel the booking and free the spot

### `src/ParkingService/SmartPark.ParkingService/Consumers/PaymentCompletedConsumer.cs`

```csharp
using MassTransit;
using Microsoft.EntityFrameworkCore;
using SmartPark.ParkingService.Data;
using SmartPark.Shared.Events;

namespace SmartPark.ParkingService.Consumers;

// This runs when Payment Service says "payment was successful"
public class PaymentCompletedConsumer : IConsumer<PaymentCompletedEvent>
{
    private readonly ParkingDbContext _db;
    private readonly IPublishEndpoint _bus;
    private readonly ILogger<PaymentCompletedConsumer> _logger;

    public PaymentCompletedConsumer(ParkingDbContext db, IPublishEndpoint bus,
        ILogger<PaymentCompletedConsumer> logger)
    {
        _db = db;
        _bus = bus;
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<PaymentCompletedEvent> context)
    {
        var bookingId = context.Message.BookingId;

        // Find the booking
        var booking = await _db.Bookings
            .Include(b => b.Spot)
            .FirstOrDefaultAsync(b => b.Id == bookingId);

        if (booking == null) return;

        // ✅ CONFIRM the booking!
        booking.Status = "Confirmed";
        await _db.SaveChangesAsync();

        _logger.LogInformation("✅ Booking {Id} CONFIRMED!", bookingId);

        // Notify the user
        await _bus.Publish(new BookingConfirmedEvent
        {
            BookingId = booking.Id,
            UserId = booking.UserId,
            SpotNumber = booking.Spot?.SpotNumber ?? "",
            StartTime = booking.StartTime,
            Hours = booking.Hours
        });
    }
}
```

### `src/ParkingService/SmartPark.ParkingService/Consumers/PaymentFailedConsumer.cs`

```csharp
using MassTransit;
using Microsoft.EntityFrameworkCore;
using SmartPark.ParkingService.Data;
using SmartPark.Shared.Events;

namespace SmartPark.ParkingService.Consumers;

// This runs when Payment Service says "payment failed"
// This is the COMPENSATION part of the Saga pattern!
public class PaymentFailedConsumer : IConsumer<PaymentFailedEvent>
{
    private readonly ParkingDbContext _db;
    private readonly IPublishEndpoint _bus;
    private readonly ILogger<PaymentFailedConsumer> _logger;

    public PaymentFailedConsumer(ParkingDbContext db, IPublishEndpoint bus,
        ILogger<PaymentFailedConsumer> logger)
    {
        _db = db;
        _bus = bus;
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<PaymentFailedEvent> context)
    {
        var bookingId = context.Message.BookingId;

        var booking = await _db.Bookings
            .Include(b => b.Spot)
            .FirstOrDefaultAsync(b => b.Id == bookingId);

        if (booking == null) return;

        // ❌ CANCEL the booking (SAGA COMPENSATION)
        booking.Status = "Cancelled";

        // Free up the parking spot again
        if (booking.Spot != null)
            booking.Spot.IsAvailable = true;

        await _db.SaveChangesAsync();

        _logger.LogWarning("❌ Booking {Id} CANCELLED. Reason: {Reason}",
            bookingId, context.Message.Reason);

        // Notify the user about cancellation
        await _bus.Publish(new BookingCancelledEvent
        {
            BookingId = booking.Id,
            UserId = booking.UserId,
            Reason = context.Message.Reason
        });
    }
}
```

---

## Program.cs

### `src/ParkingService/SmartPark.ParkingService/Program.cs`

```csharp
using System.Text;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartPark.ParkingService.Consumers;
using SmartPark.ParkingService.Data;

var builder = WebApplication.CreateBuilder(args);

// ──── DATABASE (PostgreSQL) ────
builder.Services.AddDbContext<ParkingDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("ParkingDb")));

// ──── JWT AUTH (same key as Auth Service) ────
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();

// ──── RABBITMQ + MASSTRANSIT ────
builder.Services.AddMassTransit(x =>
{
    // Register our consumers (they listen for events)
    x.AddConsumer<PaymentCompletedConsumer>();
    x.AddConsumer<PaymentFailedConsumer>();

    // Connect to RabbitMQ
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"] ?? "localhost", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });

        cfg.ConfigureEndpoints(context);  // Auto-create queues
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Auto-migrate database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ParkingDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
```

### `src/ParkingService/SmartPark.ParkingService/appsettings.json`

```json
{
  "ConnectionStrings": {
    "ParkingDb": "Host=localhost;Port=5432;Database=SmartParkParking;Username=postgres;Password=postgres"
  },
  "Jwt": {
    "Key": "ThisIsASecretKeyForSmartPark12345!",
    "Issuer": "SmartPark",
    "Audience": "SmartParkUsers"
  },
  "RabbitMq": {
    "Host": "localhost"
  }
}
```
