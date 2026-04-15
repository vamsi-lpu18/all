using Microsoft.AspNetCore.Mvc;

namespace SquareAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SquareController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetSquare(int number)
        {
            int result = number * number;
            return Ok(new { result });
        }
    }
}
