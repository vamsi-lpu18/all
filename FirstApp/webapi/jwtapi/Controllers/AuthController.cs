using StudentHostelAPI.Services;
using Microsoft.AspNetCore.Mvc;
using StudentHostelAPI.DTO;

[ApiController]
[Route("api/[controller]")]

public class AuthController : ControllerBase
{
    private readonly JwtTokenService _tokenService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(JwtTokenService tokenService, ILogger<AuthController> logger)
    {
        _tokenService = tokenService;
        _logger = logger;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        _logger.LogInformation("Login attempt for user: {Username}", request.Username);
      
        var users = new[] {
            new { Username = "admin", Password = "123" },
            new { Username = "user1", Password = "abc" }
        };

        var user = users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);
        if (user != null)
        {
            _logger.LogInformation("Login successful for user: {Username}", request.Username);
            var token = _tokenService.GenerateToken(request.Username);
            return Ok(new LoginResponse { Token = token });
        }
        _logger.LogWarning("Login failed for user: {Username}", request.Username);
        return Unauthorized();
    }
}
