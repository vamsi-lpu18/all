using Microsoft.AspNetCore.Mvc;

namespace add3numbers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetSum([FromQuery] int num1, [FromQuery] int num2, [FromQuery] int num3)
        {
            int sum = num1 + num2 + num3;
            return Ok(new {num1,num2,num3, sum });
        }
    }
}
