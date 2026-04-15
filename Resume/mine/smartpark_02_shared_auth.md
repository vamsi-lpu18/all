# 🅿️ SmartPark — Code: Shared Library + Auth Service

> Every line has comments so you can understand exactly what's happening!

---

## SHARED LIBRARY (Used by all services)

### `src/Shared/SmartPark.Shared/Events/BookingCreatedEvent.cs`

```csharp
namespace SmartPark.Shared.Events;

// This event is sent to RabbitMQ when someone books a parking spot
// The Payment Service will listen for this and create a payment
public class BookingCreatedEvent
{
    public Guid BookingId { get; set; }      // Which booking
    public Guid UserId { get; set; }         // Who booked it
    public Guid SpotId { get; set; }         // Which parking spot
    public decimal Amount { get; set; }      // How much to pay
    public int Hours { get; set; }           // For how many hours
    public DateTime CreatedAt { get; set; }  // When it was booked
}
```

### `src/Shared/SmartPark.Shared/Events/PaymentCompletedEvent.cs`

```csharp
namespace SmartPark.Shared.Events;

// Sent when payment is successful
// Parking Service listens for this to confirm the booking
public class PaymentCompletedEvent
{
    public Guid BookingId { get; set; }
    public Guid PaymentId { get; set; }
    public decimal Amount { get; set; }
    public DateTime PaidAt { get; set; }
}
```

### `src/Shared/SmartPark.Shared/Events/PaymentFailedEvent.cs`

```csharp
namespace SmartPark.Shared.Events;

// Sent when payment fails
// Parking Service listens for this to CANCEL the booking (Saga Compensation!)
public class PaymentFailedEvent
{
    public Guid BookingId { get; set; }
    public string Reason { get; set; } = string.Empty;  // Why it failed
}
```

### `src/Shared/SmartPark.Shared/Events/BookingConfirmedEvent.cs`

```csharp
namespace SmartPark.Shared.Events;

// Sent when booking is confirmed after payment
// Notification Service listens for this to alert the user
public class BookingConfirmedEvent
{
    public Guid BookingId { get; set; }
    public Guid UserId { get; set; }
    public string SpotNumber { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public int Hours { get; set; }
}
```

### `src/Shared/SmartPark.Shared/Events/BookingCancelledEvent.cs`

```csharp
namespace SmartPark.Shared.Events;

// Sent when booking is cancelled (payment failed)
// Notification Service listens to alert the user
public class BookingCancelledEvent
{
    public Guid BookingId { get; set; }
    public Guid UserId { get; set; }
    public string Reason { get; set; } = string.Empty;
}
```

### `src/Shared/SmartPark.Shared/DTOs/AuthDtos.cs`

```csharp
namespace SmartPark.Shared.DTOs;

// What the user sends when registering
public class RegisterDto
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
}

// What the user sends when logging in
public class LoginDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

// What we send back after login/register
public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;     // JWT token
    public string UserId { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
```

### `src/Shared/SmartPark.Shared/DTOs/ParkingDtos.cs`

```csharp
namespace SmartPark.Shared.DTOs;

// For creating a new parking spot (Admin only)
public class CreateSpotDto
{
    public string SpotNumber { get; set; } = string.Empty;  // Like "A-01"
    public string Location { get; set; } = string.Empty;    // "Floor 1" or "Zone A"
    public string Type { get; set; } = "Regular";           // Regular, VIP, Handicap
    public decimal PricePerHour { get; set; }               // Cost per hour
}

// For booking a spot
public class CreateBookingDto
{
    public Guid SpotId { get; set; }             // Which spot to book
    public DateTime StartTime { get; set; }      // When to start
    public int Hours { get; set; }               // For how long
    public string VehicleNumber { get; set; } = string.Empty;  // Car plate number
}
```

---

## AUTH SERVICE (Login + Register + JWT)

### `src/AuthService/SmartPark.AuthService/Models/AppUser.cs`

```csharp
using Microsoft.AspNetCore.Identity;

namespace SmartPark.AuthService.Models;

// This class represents a user in our system
// It extends IdentityUser which already has: Id, Email, PasswordHash, etc.
public class AppUser : IdentityUser
{
    public string FullName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
```

### `src/AuthService/SmartPark.AuthService/Data/AuthDbContext.cs`

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SmartPark.AuthService.Models;

namespace SmartPark.AuthService.Data;

// This is our database context (EF Code-First approach)
// IdentityDbContext already creates tables for: Users, Roles, UserRoles, etc.
public class AuthDbContext : IdentityDbContext<AppUser>
{
    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Seed some default roles into the database
        builder.Entity<IdentityRole>().HasData(
            new IdentityRole { Id = "1", Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole { Id = "2", Name = "User", NormalizedName = "USER" }
        );
    }
}
```

### `src/AuthService/SmartPark.AuthService/Controllers/AuthController.cs`

```csharp
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SmartPark.AuthService.Models;
using SmartPark.Shared.DTOs;

namespace SmartPark.AuthService.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    // UserManager handles user operations (create, find, check password)
    private readonly UserManager<AppUser> _userManager;

    // IConfiguration lets us read settings from appsettings.json
    private readonly IConfiguration _config;

    public AuthController(UserManager<AppUser> userManager, IConfiguration config)
    {
        _userManager = userManager;
        _config = config;
    }

    // ──────────────── REGISTER ────────────────
    // POST /api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        // Step 1: Check if email is already taken
        var existingUser = await _userManager.FindByEmailAsync(dto.Email);
        if (existingUser != null)
            return BadRequest(new { message = "Email already registered!" });

        // Step 2: Create the user object
        var user = new AppUser
        {
            UserName = dto.Email,       // Username = email
            Email = dto.Email,
            FullName = dto.FullName,
            PhoneNumber = dto.PhoneNumber
        };

        // Step 3: Save user to database (password is auto-hashed)
        var result = await _userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
        {
            // Return the error messages
            var errors = result.Errors.Select(e => e.Description);
            return BadRequest(new { message = "Registration failed", errors });
        }

        // Step 4: Assign the "User" role
        await _userManager.AddToRoleAsync(user, "User");

        // Step 5: Generate JWT token and return
        var token = GenerateToken(user, "User");

        return Ok(new AuthResponseDto
        {
            Token = token,
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email!,
            Role = "User"
        });
    }

    // ──────────────── LOGIN ────────────────
    // POST /api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        // Step 1: Find user by email
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null)
            return Unauthorized(new { message = "Invalid email or password" });

        // Step 2: Check if password is correct
        var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!isPasswordCorrect)
            return Unauthorized(new { message = "Invalid email or password" });

        // Step 3: Get user's role
        var roles = await _userManager.GetRolesAsync(user);
        var role = roles.FirstOrDefault() ?? "User";

        // Step 4: Generate JWT token
        var token = GenerateToken(user, role);

        return Ok(new AuthResponseDto
        {
            Token = token,
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email!,
            Role = role
        });
    }

    // ──────────────── GET MY PROFILE ────────────────
    // GET /api/auth/me
    // [Authorize] means only logged-in users can access this
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        // Get user ID from the JWT token
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = await _userManager.FindByIdAsync(userId!);

        if (user == null)
            return NotFound(new { message = "User not found" });

        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new
        {
            user.Id,
            user.FullName,
            user.Email,
            user.PhoneNumber,
            Role = roles.FirstOrDefault()
        });
    }

    // ──────────────── HELPER: Generate JWT Token ────────────────
    private string GenerateToken(AppUser user, string role)
    {
        // Claims = pieces of info stored inside the token
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(ClaimTypes.Name, user.FullName),
            new Claim(ClaimTypes.Role, role)
        };

        // Create the signing key from our secret
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Create the token
        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],       // Who created this token
            audience: _config["Jwt:Audience"],   // Who can use this token
            claims: claims,                       // Data inside the token
            expires: DateTime.UtcNow.AddHours(8), // Token valid for 8 hours
            signingCredentials: credentials
        );

        // Return the token as a string
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

### `src/AuthService/SmartPark.AuthService/Program.cs`

```csharp
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SmartPark.AuthService.Data;
using SmartPark.AuthService.Models;

var builder = WebApplication.CreateBuilder(args);

// ──── 1. DATABASE SETUP (EF Code-First) ────
// This connects to SQL Server and will auto-create tables
builder.Services.AddDbContext<AuthDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AuthDb")));

// ──── 2. IDENTITY SETUP (handles users, passwords, roles) ────
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    // Simple password rules for development
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 6;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
})
.AddEntityFrameworkStores<AuthDbContext>()  // Store users in our database
.AddDefaultTokenProviders();

// ──── 3. JWT AUTHENTICATION SETUP ────
// This tells ASP.NET how to validate JWT tokens
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,        // Check if token is expired
        ValidateIssuerSigningKey = true, // Check if token was tampered
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();  // Swagger for testing APIs

var app = builder.Build();

// ──── AUTO-CREATE DATABASE ON STARTUP ────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AuthDbContext>();
    db.Database.Migrate();  // This runs EF migrations automatically
}

// ──── MIDDLEWARE PIPELINE ────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();     // Enable Swagger in development
    app.UseSwaggerUI();
}

app.UseAuthentication();  // Check JWT tokens
app.UseAuthorization();   // Check user roles
app.MapControllers();     // Map controller routes

app.Run();
```

### `src/AuthService/SmartPark.AuthService/appsettings.json`

```json
{
  "ConnectionStrings": {
    "AuthDb": "Server=localhost,1433;Database=SmartParkAuth;User=sa;Password=YourPassword123!;TrustServerCertificate=True"
  },
  "Jwt": {
    "Key": "ThisIsASecretKeyForSmartPark12345!",
    "Issuer": "SmartPark",
    "Audience": "SmartParkUsers"
  }
}
```

### How to Test Auth Service

```powershell
# 1. Run EF migration first
cd src/AuthService/SmartPark.AuthService
dotnet ef migrations add FirstMigration
dotnet ef database update

# 2. Run the service
dotnet run

# 3. Open browser: https://localhost:5001/swagger
# 4. Try POST /api/auth/register with this JSON:
# {
#   "fullName": "John",
#   "email": "john@test.com",
#   "password": "Test123",
#   "phoneNumber": "9876543210"
# }
# 5. Copy the token from response
# 6. Try GET /api/auth/me with the token in Authorization header
```
