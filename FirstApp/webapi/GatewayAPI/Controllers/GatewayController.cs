// Controllers/MathController.cs
using Microsoft.AspNetCore.Mvc;

namespace GatewayAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MathController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public MathController(IHttpClientFactory factory)
        {
            _httpClient = factory.CreateClient();
        }

        [HttpGet("square")]
        public async Task<IActionResult> GetSquare(int number)
        {
            string url = $"http://localhost:5275/square?number={number}";

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return StatusCode(500, "Error calling Square API");

            var result = await response.Content.ReadAsStringAsync();

            return Content(result, "application/json");
        }
    }
}