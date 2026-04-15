using Microsoft.AspNetCore.Mvc;

namespace consoleapidemo.Controllers
{
    [ApiController]
    [Route("api/students")]
    public class StudentController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetStudents()
        {
            var students = new List<string>
            {
                "Arun",
                "Kumar",
                "Divya"
            };

            return Ok(students);
        }
    }
}
